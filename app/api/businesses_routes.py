from flask import Blueprint;
from app.models import Business;

businesses_route = Blueprint('businesses', __name__)

@businesses_route.route('/<int:id>')
def get_business(id):
    """
    Query for a business by id and returns that business in a dictionary
    """
    business = Business.query.get(id)
    return business.to_dict()
