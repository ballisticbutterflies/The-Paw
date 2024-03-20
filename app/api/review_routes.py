from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Business, Review, Image, User;
from .user_routes import user_routes, user

reviews_route = Blueprint('reviews', __name__)

@reviews_route.route('/<int:id>')
def get_review(id):
    """
    Query for a review by id and returns that review in a dictionary
    """
    review = Review.query.get(id)
    # review = Review.query.filter(Review.id == id)
    # print('#########################################')
    review_dict = review.to_dict()


    user_images_all = Image.query.filter(Image.uploader_id == id).filter(Image.imageable_type != 'user').all() # fetching all images uploaded by user and all associated data

    user_images_all_list = []  # initializing what will become the 

    for user_image in user_images_all: #  begin to structure and refine data collected from db query
        user_image_dict = {}
        user_image_dict['id'] = user_image.id
        user_image_dict['image_url'] = user_image.url
        user_image_dict['type'] = user_image.imageable_type
        user_image_dict['type_id'] = user_image.imageable_id 

    #add the query for the images
    review_images = Image.query.filter(Image.imageable_type == 'review').filter(Image.imageable_id != id).all() # fetching all images associated to the review
    review_dict['images'] = review_images # add the images to the review dictionary

    # add the query for necessary user data
    user_data = user(review.user_id)
    review_dict['author'] = user_data

    return review_dict
