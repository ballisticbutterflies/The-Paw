from flask import Blueprint;
from app.models import Category, db;


categories_route = Blueprint('categories', __name__)

@categories_route.route('')
def get_categories():
  """
  Query the db for all categories
  """
  categories = Category.query.all()
  category_list = [{'id': category.id, 'name': category.name } for category in categories]
  return {'categories': category_list}
