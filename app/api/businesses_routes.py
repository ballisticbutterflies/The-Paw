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

    for business_image in business_images:
        business_image_url = business_image.url

    total_stars = 0
    num_reviews = len(reviews)

    for review in reviews:
        total_stars += review.stars
        review_images = Image.query.filter(Image.imageable_id == review.id).all()
        for image in review_images:
            image_id = image.id
            image_url = image.url
    
    avg_stars = total_stars / num_reviews

    business_dict = business.to_dict()
    print(review_images)
    business_dict['reviews'] = {
        'num_reviews': num_reviews,
        'avg_stars': avg_stars,
    }
    business_dict['review_images'] = {
        'image_id': image_id,
        'image_url': image_url
    }
    # review_images['review_images'] = image_url
    business_dict['business_images'] = business_image_url
    
    
    business_data.append(business_dict)
    return { 'business': business_data }
