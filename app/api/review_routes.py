from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Business, Review, Image, User, db;
from .user_routes import user_routes, user
from app.forms import CreateReviewForm

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
   

@reviews_route.route('/<int:id>/edit', methods=["PUT"])
@login_required
def update_review(id):
    """
    Updates an exisiting review if it is owned by user logged in
    """
    review = Review.query.get(id)

    if review is None:
        return {'message': 'Review couldn\'t be found' }, 404

    if review.user_id != current_user.id:
        return {'message': 'Unauthorized user'}, 401

    form = CreateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review.review = form.data['review']
        review.stars = form.data['stars']

        try:
            db.session.commit()
            return review.to_dict()
        except Exception as e:
            # Handle database errors
            db.session.rollback()
            return {'message': 'An error occurred while updating the review.'}, 500

    return form.errors, 401


@reviews_route.route('<int:review_id>/delete', methods=["DELETE"])
@login_required
def delete_review(review_id):
    """
    Deletes existing review by id as long as current user is author of review
    """
    review = Review.query.get(review_id)

    if review is None:
        return {'message': 'Business couldn\'t be found' }, 404
    elif review.user_id != current_user.id:
        return {'errors': {'message': 'Forbidden' }}, 403
    else: 
        try: 
            db.session.delete(review)
            db.session.commit()
            return {'message': 'Review successfully deleted'}, 200
        except Exception as e:
            db.session.rollback()
            return {'message': 'An unknown error occured while attempting to delete the business. Please refresh the page and try again.'}, 500
