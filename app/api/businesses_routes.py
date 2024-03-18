from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Business, Review, Image, db;
from app.forms import CreateBusinessForm

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

    avg_stars = total_stars / num_reviews

    business_dict = business.to_dict()
    print(review_images)
    business_dict['reviews'] = {
        'num_reviews': num_reviews,
        'avg_stars': avg_stars,
    }
    business_dict['review_images'] = review_image_urls
    business_dict['business_images'] = business_image_urls


    business_data.append(business_dict)
    return { 'business': business_data }


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
            owner_id = current_user['id'],
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
        get_business(business.id)
        return business.to_dict()
    return form.errors, 401
