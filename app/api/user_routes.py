from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Image, Review
from sqlalchemy import func 


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
def user(id):
    """
    Query for a user by id and returns that user in a dictionary with the user data, user's pfp, and users aggregates for reviews and uploaded images
    """
    user = User.query.get(id)
    dict_user = user.to_dict()
    # add the query for user profile image
    user_image = Image.query.filter(Image.imageable_type == 'user' and Image.imageable_id == id).first()
    user_pfp = {'id': user_image.id, 'image_url': user_image.url}
    dict_user['user_pfp'] = user_pfp
    # add the aggregate  query for the number of reviews with the user_id matching the current user
    review_count = Review.query.filter(Review.user_id == id).count()
    dict_user['num_reviews'] = review_count
    # add the aggregate query for the number of photos with the uploader_id matching the current user
    image_count = Image.query.filter(Image.uploader_id == id).filter(Image.imageable_type != 'user').count()
    dict_user['num_images'] = image_count    
    # return modified dictionary
    return dict_user
