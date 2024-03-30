from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Image, Review, Business
from .businesses_routes import businesses_route, get_business
# from .review_routes import reviews_route, get_review
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

@user_routes.route("/<int:id>/images/all")
def user_images_all(id):
    """
    Query to fetch all images uploaded by a specific user, this will not include their profile image. It will include the business name with the fetch as well for the transparent label on the image.
    """
    # response_dict = { } # initializing response dictionary to append to

    user_images_all = Image.query.filter(Image.uploader_id == id).filter(Image.imageable_type != 'user').all() # fetching all images uploaded by user and all associated data

    user_images_all_list = []  # initializing what will become the 

    for user_image in user_images_all: #  begin to structure and refine data collected from db query
        user_image_dict = {}
        user_image_dict['id'] = user_image.id
        user_image_dict['image_url'] = user_image.url
        user_image_dict['type'] = user_image.imageable_type
        user_image_dict['type_id'] = user_image.imageable_id 

        business_id: int # initialize business id to be defined dynamically based on imageable type

        # assign business_id when imageable type is business
        if user_image_dict['type'] == 'business':
            business_id = user_image_dict['business_id']
            user_image_dict['biz_images_count'] = Image.query.filter(Image.imageable_type == 'business').filter(Image.imageable_id == business_id).count()
            
        # assign business_id when imageable type is review
        # ! refactor to use get review by id request instead
        if user_image_dict['type'] == 'review':
            get_review_res = Review.query.filter(Review.id == user_image_dict['type_id']).first()
            business_id = get_review_res.business_id
            user_image_dict['business_id'] = business_id
            user_image_dict['biz_images_count'] = 'not applicable'

        # regardless of imageable type, now that we have the appropriate business_id, fetch the business name
        get_business_res =  get_business(business_id)
        business_name = get_business_res['business'][0]['name']
        user_image_dict['business_name'] = business_name
            
        # append the created image dict to the response list
        user_images_all_list.append(user_image_dict)

        
    # response_dict['user_images'] = user_images_all_list #retaining in case we want to reformat the response body to be within a dict

    return user_images_all_list

@user_routes.route('/<int:id>/reviews')
def user_reviews(id):
    """
    Query to fetch all reviews written by a specific user and returns them in a list of dictionaries
    """
    from .review_routes import reviews_route, get_review # importing here to resolve circular import error
    user_reviews = Review.query.filter(Review.user_id == id).all()
    # all_user_reviews = {'reviews': []} # create dict to hold list of all reviews

    def format_reviews(review):
        review_id = review.to_dict()['id'] # extract review id
        review_dict_indiv = get_review(review_id) # use get review by id route to simplify this route
        business = get_business(review_dict_indiv['business_id'])
        review_dict_indiv['business'] = business 
        del review_dict_indiv['business_id']

        return { review_id: review_dict_indiv } # create a final dict to hold each review with the key as the id for easier routing


    all_reviews_dict = [format_reviews(user_review) for user_review in user_reviews] # structure final response dict by calling the above helper function to 
    return all_reviews_dict

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
