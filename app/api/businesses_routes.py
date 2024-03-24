from flask import Blueprint, request;
from flask_login import login_required, current_user
from app.models import Business, Review, Image, User, Category, db;
from app.forms import CreateBusinessForm, CreateReviewForm

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


    business_images = Image.query.filter((Image.imageable_type == 'business'), Image.imageable_id == id).all()

    business_image_urls = [{'id': image.id, 'image_url': image.url, 'uploader_id': image.uploader_id} for image in business_images]

    business_dict['business_images'] = business_image_urls

    categories = Category.query.filter(Category.id == business.category_id)
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

    reviews = Review.query.filter(Review.business_id == id).order_by(Review.created_at.desc()).all()


    user_ids = [review.user_id for review in reviews]
    users = User.query.filter(User.id.in_(user_ids)).all()
    review_ids = [review.id for review in reviews]
    review_images = Image.query.filter((Image.imageable_type == 'review'), Image.imageable_id.in_(review_ids)).all()

    user_images = Image.query.filter(Image.imageable_type == 'user').filter(User.id.in_(user_ids)).all()

    user_image_dict = {image.imageable_id: image.url for image in user_images}

    all_reviews = Review.query.all()

    user_num_reviews = {}

    for review in all_reviews:
        user_id = review.user_id
        if user_id in user_num_reviews:
            user_num_reviews[user_id] += 1
        else:
            user_num_reviews[user_id] = 1

    all_business_review_images = Image.query.filter(Image.imageable_type != 'user').all()

    user_num_images = {}

    for image in all_business_review_images:
        user_id = image.uploader_id
        if user_id in user_num_images:
            user_num_images[user_id] += 1
        else:
            user_num_images[user_id] = 1

    users_dict = { user.id: {
        'id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        'city': user.city,
        'state': user.state,
        'user_image_url': user_image_dict.get(user.id),
        'user_num_reviews': user_num_reviews.get(user.id, 0),
        'user_num_images': user_num_images.get(user.id, 0)
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
                'created_at': review.created_at,
                'updated_at': review.updated_at,
                'user': user_data,
                'review_images': review_image_data
        }

        reviews_list.append(review_data)

    if len(reviews_list) == 0:
        return { "reviews": "No reviews found" }
    else:
        return { 'reviews': reviews_list }

@businesses_route.route('/<int:business_id>/reviews', methods=['POST'])
@login_required
def create_review(business_id):
    """
    Creates a new review and adds to db based on business id and returns the new review
    """
    form = CreateReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']


    business_owner_id = get_business(business_id)['business'][0]['owner_id']
    current_user_id = current_user.id
    print("######################, business owner id: ", business_owner_id, " current user id: ", current_user_id)


    forbidden_res = {'errors': {'message': 'Forbidden' }}, 403

    def forbidden_res_func():
        print("its aliiiiiive")
        return {'errors': {'message': 'Forbidden' }}, 403

    existing_review = Review.query.filter(Review.user_id == current_user_id, Review.business_id== business_id).first()
    if existing_review:
        return forbidden_res_func()

    if current_user_id == business_owner_id:
        return forbidden_res_func()

    print("hello howdy")

    if not existing_review:
        if form.validate_on_submit():
            review = Review(
                user_id = current_user_id,
                business_id = business_id,
                review = form.data['review'],
                stars = form.data['stars']
            )
            db.session.add(review)
            db.session.commit()

            return review.to_dict()
    return form.errors, 401

@businesses_route.route('/', methods=['POST'])
@login_required
def create_business():
    '''
    Creates a new biz and adds it to db redirects to its biz page
    '''
    form = CreateBusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        business = Business(
            owner_id = current_user.id,
            category_id = form.data['category_id'],
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



@businesses_route.route('/<int:id>/images')
def get_images_by_business_id(id):
    business = Business.query.get(id)

    if (business == None):
        return {"message": "Business couldn't be found" }, 404
    
    reviews = Review.query.filter(Review.business_id == id).all()
    review_ids = [review.id for review in reviews]
    review_images = Image.query.filter((Image.imageable_type == 'review'), Image.imageable_id.in_(review_ids)).all()

    images_dict = {}

    user_ids = [review.user_id for review in reviews]
    users = User.query.filter(User.id.in_(user_ids)).all()

    users_dict = { user.id: {
        'id': user.id,
        'first_name': user.first_name,
        'last_name': user.last_name,
        } for user in users }
    
    for review in reviews:
        user_data = users_dict.get(review.user_id)

        review_images_data = [{
            'id': image.id,
            'url': image.url,
            'uploader_id': image.uploader_id,
            'user': user_data,
            'imageable_id': image.imageable_id,
            'imageable_type': image.imageable_type,
            'created_at': image.created_at,
            'updated_at': image.updated_at
            } for image in review_images]
        
        images_dict['review_images'] = review_images_data
    
    business_images = Image.query.filter((Image.imageable_type == 'business'), Image.imageable_id == id).all()

    business_image_data = [{
        'id': image.id,
        'url': image.url,
        'uploader_id': image.uploader_id,           
        'imageable_id': image.imageable_id,
        'imageable_type': image.imageable_type,
        'created_at': image.created_at,
        'updated_at': image.updated_at
        } for image in business_images]
    
    images_dict['business_id'] = id
    images_dict['business_images'] = business_image_data

    return { 'images': images_dict }

@businesses_route.route('/<int:id>', methods=["PUT"])
@login_required
def update_business(id):
    """
    Updates an existing business based on business id
    """
    business = Business.query.get(id)

    if business is None:
        return {'message': 'Business couldn\'t be found' }, 404

    if business.owner_id != current_user.id:
        return {'message': 'YOU DONT OWN THIS BUSINESS! GET OUTTA HERE!'}, 401

    form = CreateBusinessForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        business.category_id = form.data['category_id']
        business.address = form.data['address']
        business.city = form.data['city']
        business.state = form.data['state']
        business.zip_code = form.data['zip_code']
        business.name = form.data['name']
        business.description = form.data['description']
        business.website = form.data['website']
        business.email = form.data['email']
        business.phone = form.data['phone']
        business.price = form.data['price']

        db.session.commit()
        return business.to_dict()

    return {"errors": form.errors}, 400
