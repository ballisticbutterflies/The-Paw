from flask import Blueprint, request;
from flask_login import login_required, current_user
from app.models import Business, Review, Image, User, Category, db;
from app.forms import CreateBusinessForm

businesses_route = Blueprint('businesses', __name__)

@businesses_route.route('/<int:id>')
def get_business(id):
    """
    Query for a business by id and returns that business in a dictionary
    """
    business = Business.query.get(id)

    business_data = []
    business_dict = business.to_dict()
    review_images = {}

    if (business == None):
        return {'message': 'Buiness couldn\'t be found' }, 404

    reviews = Review.query.filter(Review.business_id == id).all()
    review_ids = [review.id for review in reviews]
    review_images = Image.query.filter((Image.imageable_type == 'review'), Image.imageable_id.in_(review_ids)).all()

    total_stars = 0
    num_reviews = len(reviews)

    for review in reviews:
        total_stars += review.stars

        review_image_data = [{
            'id': image.id,
            'url': image.url,
            'uploader_id': image.uploader_id,
            } for image in review_images]

    business_dict['reviews'] = {
        'num_reviews': num_reviews,
        'avg_stars': None,
    }

    if num_reviews > 0:
        avg_stars = total_stars / num_reviews
        business_dict['reviews']['avg_stars'] = avg_stars
        business_dict['review_images'] = review_image_data

    business_images = Image.query.filter(Image.imageable_id == id and Image.imageable_type == 'business').all()
    business_image_urls = [{'id': image.id, 'image_url': image.url, 'uploader_id': image.uploader_id} for image in business_images]

    business_dict['business_images'] = business_image_urls

    categories = Category.query.filter(Category.id == business.category_id);
    category_dict = { category.id: {
        'id': category.id,
        'name': category.name
        } for category in categories }
    category_data = category_dict.get(business.category_id)

    business_dict['category'] = category_data

    business_data.append(business_dict)
    return { 'business': business_data }


@businesses_route.route('/<int:id>/reviews')
def get_reviews_by_business_id(id):
    business = Business.query.get(id)

    if (business == None):
        return {"message": "Business couldn\'t be found"}, 404

    reviews = Review.query.filter(Review.business_id == id).all()

    user_ids = [review.user_id for review in reviews]
    users = User.query.filter(User.id.in_(user_ids)).all()
    review_ids = [review.id for review in reviews]
    review_images = Image.query.filter(Image.imageable_id.in_(review_ids)).all()

    users_dict = { user.id: {
        'id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name
        } for user in users }

    reviews_list = []

    for review in reviews:
        user_data = users_dict.get(review.user_id)
        review_image_data =  [{
                    'id': image.id,
                    'url': image.url,
                    'uploader_id': image.uploader_id
                    } for image in review_images if image.uploader_id == review.user_id]

        if len(review_image_data) == 0:
            review_image_data = "No review images found"

        review_data = {
                'id': review.id,
                'user_id': review.user_id,
                'business_id': review.business_id,
                'review': review.review,
                'stars': review.stars,
                'user': user_data,
                'review_images': review_image_data
        }

        reviews_list.append(review_data)

    if len(reviews_list) == 0:
        return { "reviews": "No reviews found" }
    else:
        return { 'reviews': reviews_list }


@businesses_route.route('/', methods=['POST'])
@login_required
def create_business():
    '''
    Creates a new biz and adds it to db redirects to its biz page?
    '''
    form = CreateBusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        business = Business(
            owner_id = current_user.id,
            category_id = form.data['category'],
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            zip_code=form.data['zip_code'],
            name=form.data['name'],
            description=form.data['description'],
            website=form.data['website'],
            email=form.data['email'],
            phone=form.data['phone'],
            price=form.data['price']
        )
        db.session.add(business)
        db.session.commit()

        return business.to_dict()
    return form.errors, 401
