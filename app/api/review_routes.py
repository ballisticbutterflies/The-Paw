from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Business, Review, Image, User, db;
from .user_routes import user_routes, user

reviews_route = Blueprint('reviews', __name__)

@reviews_route.route('/<int:id>')
def get_review(id):
    """
    Query for a review by id and returns that review in a dictionary
    """
    # review = Review.query.filter(Review.id == id).first()
    review = Review.query.get(id)
    print('#########################################')
    print(review)
    review_dict = review.to_dict()

    #add the query for the images
    review_images = Image.query.filter(Image.imageable_type == 'review').filter(Image.imageable_id != id).all() # fetching all images associated to the review
    review_dict['images'] = review_images # add the images to the review dictionary

    # add the query for necessary user data
    user_data = user(review.user_id)
    review_dict['author'] = user_data

    return review_dict

# @reviews_route.route('/', methods=['POST'])
# @login_required
# def create_review():
#     '''
#     Creates a new biz and adds it to db redirects to its biz page?
#     '''
#     form = CreatereviewForm()
#     form['csrf_token'].data = request.cookies['csrf_token']

#     if form.validate_on_submit():
#         review = review(
#             owner_id = current_user.id,
#             address=form.data['address'],
#             city=form.data['city'],
#             state=form.data['state'],
#             zip_code=form.data['zip_code'],
#             name=form.data['name'],
#             description=form.data['description'],
#             website=form.data['website'],
#             email=form.data['email'],
#             phone=form.data['phone'],
#             price=form.data['price']
#         )
#         db.session.add(review)
#         db.session.commit()
        
#         return review.to_dict()
#     return form.errors, 401
