from flask import Blueprint, jsonify
from app.models import Business, Review, Image
from sqlalchemy import func, desc

search_route = Blueprint('search', __name__)


@search_route.route('/')
def search():
  """
  Query for all businesses and returns them in a list of business dictionaries
  """
  businesses = Business.query.all()

  business_data = []
  for business in businesses:
    #calculate avg stars
    avg_stars = Review.query.filter_by(business_id=business.id).with_entities(func.avg(Review.stars)).scalar()
    #and num reviews
    num_reviews = Review.query.filter_by(business_id=business.id).count()
    num_reviews_null = num_reviews if num_reviews >= 1 else None
    #and bring over review text too
    recent_review = Review.query.filter_by(business_id=business.id).order_by(desc(Review.id)).first()
    recent_review_text = recent_review.review if recent_review else None
    #and image

    images = Image.query.filter_by(imageable_id=business.id, imageable_type='business').all()
    image_urls = [image.url for image in images]

    business_dict = business.to_dict()
    business_dict['avg_stars'] = avg_stars
    business_dict['num_reviews'] = num_reviews_null
    business_dict['recent_review_text'] = recent_review_text
    business_dict['images'] = image_urls

    business_data.append(business_dict)

  return { 'businesses': business_data }
