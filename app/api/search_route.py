from flask import Blueprint, jsonify, request
from app.models import Business, Review, Image, Category
from sqlalchemy import func, desc, or_
from urllib.parse import unquote

search_route = Blueprint('search', __name__)


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

#base query to fetch businesses
  query = Business.query

#apply filters to the query
  if rating:
    query = query.join(Review).group_by(Business.id).having(func.avg(Review.stars) >= float(rating))

  if prices:
    query = query.filter(Business.price.in_(prices))

  if city_state:
    city, state = city_state.split(', ')
    query = query.filter(Business.city == city, Business.state == state)

  if category:
      query = query.filter(Business.category_id == category)

  if search_query:
    query = query.filter(or_(
      Business.name.ilike(f'%{search_query}%'),
      Business.category.has(Category.name.ilike(f'%{search_query}%')),
      Business.reviews.any(Review.review.ilike(f'%{search_query}%'))
    ))

  businesses = query.all()

  business_data = []
  for business in businesses:
    #calculate avg stars
    avg_stars = Review.query.filter_by(business_id=business.id).with_entities(func.avg(Review.stars)).scalar()
    #and num reviews
    num_reviews = Review.query.filter_by(business_id=business.id).count()
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

  return { 'businesses': business_data }
