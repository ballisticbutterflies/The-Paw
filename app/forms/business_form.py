from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, BooleanField
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

hours = [('-','-'),('0000','0000'),('0100','0100'),('0200','0200'),('0300','0300'),('0400','0400'),('0500','0500'),('0600','0600'),('0700','0700'),('0800','0800'),('0900','0900'),('1000','1000'),('1100','1100'),('1200','1200'),('1300','1300'),('1400','1400'),('1500','1500'),('1600','1600'),('1700','1700'),('1800','1800'),('1900','1900'),('2000','2000'),('2100','2100'),('2200','2200'),('2300','2300'),('2400','2400')]

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
  set_hours = BooleanField('set_hours', validators=[DataRequired()])
  mon_open = SelectField('mon_open', choices=hours)
  mon_close = SelectField('mon_close', choices=hours)
  tue_open = SelectField('tue_open', choices=hours)
  tue_close = SelectField('tue_close', choices=hours)
  wed_open = SelectField('wed_open', choices=hours)
  wed_close = SelectField('wed_close', choices=hours)
  thu_open = SelectField('thu_open', choices=hours)
  thu_close = SelectField('thu_close', choices=hours)
  fri_open = SelectField('fri_open', choices=hours)
  fri_close = SelectField('fri_close', choices=hours)
  sat_open = SelectField('sat_open', choices=hours)
  sat_close = SelectField('sat_close', choices=hours)
  sun_open = SelectField('sun_open', choices=hours)
  sun_close = SelectField('sun_close', choices=hours)
