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
    
    review_dict = review.to_dict()

    #add the query for the images
    review_images = Image.query.filter(Image.imageable_type == 'review').filter(Image.imageable_id == id).all() # fetching all images associated to the review
    review_dict['images'] = [] # creating list within dict to append images to
    
    for review_image in review_images: #  begin to structure and refine data collected from db query
        review_image_dict = {}
        review_image_dict['id'] = review_image.id
        review_image_dict['image_url'] = review_image.url
        review_image_dict['type'] = review_image.imageable_type
        review_image_dict['type_id'] = review_image.imageable_id 
            
        # append the created image dict to the response list
        review_dict['images'].append(review_image_dict)

    # add the query for necessary user data
    user_data = user(review.user_id)
    review_dict['author'] = user_data

    return review_dict


@reviews_route.route('/all')
def get_all_reviews():
    """
    Query for a review by id and returns that review in a dictionary
    """
    reviews = Review.query.all()

    all_reviews_dict = { 'reviews': [] } # create dict to hold list of all reviews

    def format_reviews(review):
        review_id = review.to_dict()['id'] # extract review id
        review_dict_indiv = get_review(review_id) # use get review by id route to simplify this route

        return { review_id: review_dict_indiv } # create a final dict to hold each review with the key as the id for easier routing


    all_reviews_dict = {'reviews': [format_reviews(review) for review in reviews]} # structure final response dict by calling the above helper function to 
    return all_reviews_dict
   
