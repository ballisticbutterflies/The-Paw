from flask import Blueprint, jsonify, request
from app.models import Business, Review, Image, Category
from sqlalchemy import func, desc, or_, and_
from flask_sqlalchemy import Pagination

search_route = Blueprint('search', __name__)

def generate_substrings(search_term, min_length=5):
    """Generate substrings with a minimum length for more flexible matching."""
    substrings = {search_term}
    for i in range(min_length, len(search_term)):
        substrings.add(search_term[:i])
    return substrings

def map_rating_condition(query, rating):
    # if rating == 5:
    #     query = query.having(func.avg(Review.stars) >= 4.75)
    # elif rating == 4:
    #     query = query.having(and_(func.avg(Review.stars) >= 3.6, func.avg(Review.stars) < 4.74))
    # elif rating == 3:
    #     query = query.having(and_(func.avg(Review.stars) >= 2.6, func.avg(Review.stars) < 3.5))
    # elif rating == 2:
    #     query = query.having(and_(func.avg(Review.stars) >= 1.6, func.avg(Review.stars) < 2.5))
    # elif rating == 1:
    #     query = query.having(func.avg(Review.stars) < 1.75)
    # return query

    if rating == 5:
        query = query.having(func.avg(Review.stars) >= 4.5)
    elif rating == 4:
        query = query.having(func.avg(Review.stars) >= 4)
    elif rating == 3:
        query = query.having(func.avg(Review.stars) >= 3)
    elif rating == 2:
        query = query.having(func.avg(Review.stars) >= 2)
    elif rating == 1:
        query = query.having(func.avg(Review.stars) >= 1)
    return query

# def map_rating(avg_stars):
    # if avg_stars is None:
    #     return None
    # if avg_stars >= 4.75:
    #     return 5
    # elif avg_stars >= 3.6 and avg_stars <= 4:
    #     return 4
    # elif avg_stars >= 2.6 and avg_stars <= 3:
    #     return 3
    # elif avg_stars >= 1.6 and avg_stars <= 2:
    #     return 2
    # elif avg_stars >= 1 and avg_stars <= 1.74:
    #     return 1
    # else:
    #     return avg_stars

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
    query = query.join(Review).group_by(Business.id)
    query = map_rating_condition(query, int(rating))

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


  restaurants_category_id = 1
  vets_category_id = 2
  services_category_id = 3
  shopping_category_id = 4
  travel_category_id = 5
  activities_category_id = 6

  if search_query and search_query.lower() == "things to do" or search_query and search_query.lower() == "parks" or search_query and search_query.lower() == "park":
    query = query.filter(Business.category_id == activities_category_id)
  elif search_query and search_query.lower() == "restaurant":
    query = query.filter(Business.category_id == restaurants_category_id)
  elif search_query and search_query.lower() == "vets" or search_query and search_query.lower() == "doctor":
    query = query.filter(Business.category_id == vets_category_id)
  elif search_query and search_query.lower() == "services":
    query = query.filter(Business.category_id == services_category_id)
  elif search_query and search_query.lower() == "shops" or search_query and search_query.lower() == "boutique":
    query = query.filter(Business.category_id == shopping_category_id)
  elif search_query and search_query.lower() == "inn" or search_query and search_query.lower() == "motel":
    query = query.filter(Business.category_id == travel_category_id)
  elif search_query:
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
    num_reviews = len(reviews)
    total_stars = sum(review.stars for review in reviews)

    # Calculate average stars and map to the desired rating
    avg_stars = total_stars / num_reviews if num_reviews > 0 else None
    mapped_rating = avg_stars
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
    business_dict['avg_stars'] = mapped_rating
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


@search_route.route('/location_search')
def location_search():
    """
    Query for matching cities and states based on partial input for dropdown.
    """
    location_query = request.args.get('query', '').lower()

    if not location_query:
        return jsonify({'locations': []})

    # Query for cities/states matching the input
    locations = Business.query.filter(
        or_(
            Business.city.ilike(f'%{location_query}%'),
            Business.state.ilike(f'%{location_query}%')
        )
    ).with_entities(Business.city, Business.state).distinct().limit(5).all()

    # Format the results for the dropdown
    location_data = [{"city": city, "state": state} for city, state in locations]

    return jsonify({'locations': location_data})
