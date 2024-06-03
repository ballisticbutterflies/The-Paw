from flask import Blueprint, jsonify, request
from app.models import Business, Review, Image, Category
from sqlalchemy import func, desc, or_, and_
from flask_sqlalchemy import Pagination

search_route = Blueprint('search', __name__)

def generate_substrings(search_term):
    """Generate substrings for more flexible matching."""
    substrings = {search_term}
    for i in range(1, len(search_term)):
        substrings.add(search_term[:i])
    return substrings

@search_route.route('/')
def search():
  """
  Query for all businesses with optional filters and return them
  in a list of business dictionaries
  """
 # Fetch filter params from request
  rating = request.args.get('rating')
  price_string = request.args.get('price')
  prices = price_string.split(',') if price_string else []
  city_state = request.args.get('location')
  category = request.args.get('category')
  search_query = request.args.get('search_query')
  page = request.args.get('page', 1, type=int)
  per_page = request.args.get('per_page', 10, type=int)

#base query to fetch businesses
  query = Business.query

#apply filters to the query
  if rating:
    query = query.join(Review).group_by(Business.id).having(func.avg(Review.stars) >= float(rating))

  if prices:
    query = query.filter(Business.price.in_(prices))

  if city_state:
    try:
        city, state = city_state.split(', ')
        query = query.filter(Business.city == city, Business.state == state)
    except ValueError:
        query = None
        return {'errors': {'message': "Invalid format for city_state. Please provide a string in the format 'city, state'."}}, 403


  if category:
      query = query.filter(Business.category_id == category)

  if search_query:
        search_terms = search_query.split()
        all_filters = []
        for term in search_terms:
            substrings = generate_substrings(term)
            term_filters = [
                Business.name.ilike(f'%{substring}%') |
                Business.category.has(Category.name.ilike(f'%{substring}%')) |
                Business.reviews.any(Review.review.ilike(f'%{substring}%')) |
                Business.description.ilike(f'%{substring}%')
                for substring in substrings
            ]
            all_filters.append(or_(*term_filters))
        query = query.filter(and_(*all_filters))

  # Apply pagination to the query
  try:
        # Apply pagination to the query
        paginated_query = query.paginate(page=page, per_page=per_page, error_out=False)
  except Exception as e:
        return {'errors': {'message': str(e)}}, 500

  businesses = paginated_query.items


  business_data = []
  for business in businesses:
    #pull all reviews for biz
    reviews = Review.query.filter_by(business_id=business.id).all()
    num_reviews = Review.query.filter_by(business_id=business.id).count()
    #if reviews exists
    total_stars = 0

    if reviews:
      for review in reviews:
        total_stars += review.stars
    else:
       avg_stars = None
    if num_reviews > 0:
        avg_stars = total_stars / num_reviews

    #and num reviews
    #and bring over review text too
    recent_review = Review.query.filter_by(business_id=business.id).order_by(desc(Review.id)).first()
    recent_review_text = recent_review.review if recent_review else None
    #and image

    images = Image.query.filter_by(imageable_id=business.id, imageable_type='business').all()
    image_urls = [image.url for image in images]

    categories = Category.query.filter(Category.id == business.category_id)
    category_dict = { category.id: {
        'id': category.id,
        'name': category.name
        } for category in categories }
    category_data = category_dict.get(business.category_id)


    business_dict = business.to_dict()
    business_dict['avg_stars'] = avg_stars
    business_dict['num_reviews'] = num_reviews
    business_dict['recent_review_text'] = recent_review_text
    business_dict['images'] = image_urls
    business_dict['category'] = category_data

    business_data.append(business_dict)
  return jsonify({
        'businesses': business_data,
        'total': paginated_query.total,
        'pages': paginated_query.pages,
        'current_page': paginated_query.page,
        'next_page': paginated_query.next_num,
        'prev_page': paginated_query.prev_num,
        'per_page': paginated_query.per_page
    })
