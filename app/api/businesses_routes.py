from flask import Blueprint;
from app.models import Business, Review, Image;

businesses_route = Blueprint('businesses', __name__)

@businesses_route.route('/<int:id>')
def get_business(id):
    """
    Query for a business by id and returns that business in a dictionary
    """
    business_data = []
    review_images = {}

    business = Business.query.get(id)
    reviews = Review.query.filter(Review.business_id == id).all()
    business_images = Image.query.filter(Image.imageable_id == id and Image.imageable_type == 'business').all()
    business_image_urls = [{'id': image.id, 'image_url': image.url} for image in business_images]

    total_stars = 0
    num_reviews = len(reviews)

    for review in reviews:
        total_stars += review.stars
        review_images = Image.query.filter(Image.imageable_id == review.id).all()
        review_image_urls = [{'id': image.id, 'image_url': image.url} for image in review_images]

    business_dict = business.to_dict()
    print(review_images)
    business_dict['reviews'] = {
        'num_reviews': num_reviews,
        'avg_stars': None,
    }

    if num_reviews > 0:
        avg_stars = total_stars / num_reviews
        business_dict['reviews']['avg_stars'] = avg_stars
        business_dict['review_images'] = review_image_urls
    
    business_dict['business_images'] = business_image_urls
    
    
    business_data.append(business_dict)
    return { 'business': business_data }
