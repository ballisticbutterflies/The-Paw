from flask import Blueprint, jsonify
from app.models import Business

search_route = Blueprint('search', __name__)


@search_route.route('/')
def search():
  """
  Query for all businesses and returns them in a list of business dictionaries
  """
  businesses = Business.query.all()
  return {'businesses': [business.to_dict() for business in businesses]}
