from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, ValidationError
# from app.models import Business
from app.forms import states


class CreateBusinessForm(FlaskForm):
  
  address = StringField('street address', validators=[DataRequired()])
  city = StringField('city', validators=[DataRequired()])
  state = SelectField('state', choices=states, validators=[DataRequired()])
  zip_code = StringField('zipcode', validators=[DataRequired()])
  name = StringField('name', validators=[DataRequired()])
  description = StringField('description', validators=[DataRequired()])
  website = StringField('website', validators=[DataRequired()])
  email = StringField('email', validators=[DataRequired()])
  phone = StringField('phone', validators=[DataRequired()])
  price = StringField('price')
