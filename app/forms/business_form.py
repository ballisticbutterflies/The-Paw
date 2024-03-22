from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired

categories = [(1,1), (2,2),
              (3,3), (4,4),
              (5,5), (6,6),
              (7,7), (8,8)]

states = [('-','-'),('AL','AL'),('AK','AK'),('AZ','AZ'),('AR','AR'),
          ('CA','CA'),('CO','CO'),('CT','CT'),('DE','DE'),('DC','DC'),
          ('FL','FL'),('GA','GA'),('HI','HI'),('ID','ID'),('IL','IL'),
          ('IN','IN'),('IA','IA'),('KS','KS'),('KY','KY'),('LA','LA'),
          ('ME','ME'),('MD','MD'),('MA','MA'),('MI','MI'),('MN','MN'),
          ('MS','MS'),('MO','MO'),('MT','MT'),('NE','NE'),('NV','NV'),
          ('NH','NH'),('NJ','NJ'),('NM','NM'),('NY','NY'),('NC','NC'),
          ('ND','ND'),('OH','OH'),('OK','OK'),('OR','OR'),('PA','PA'),
          ('RI','RI'),('SC','SC'),('SD','SD'),('TN','TN'),('TX','TX'),
          ('UT','UT'),('VT','VT'),('VI','VI'),('VA','VA'),('WA','WA'),
          ('WV','WV'),('WI','WI'),('WY','WY')]

class CreateBusinessForm(FlaskForm):
  address = StringField('street address', validators=[DataRequired()])
  city = StringField('city', validators=[DataRequired()])
  state = SelectField('state', choices=states, validators=[DataRequired()])
  zip_code = StringField('zipcode', validators=[DataRequired()])
  name = StringField('name', validators=[DataRequired()])
  description = StringField('description', validators=[DataRequired()])
  category_id = SelectField('category', choices=categories, validators=[DataRequired()])
  website = StringField('website')
  email = StringField('email')
  phone = StringField('phone')
  price = StringField('price')
