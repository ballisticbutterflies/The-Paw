from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class CreateReviewForm(FlaskForm):
    review = StringField('review', validators=[DataRequired()])
    stars = IntegerField('stars', validators=[DataRequired()])
    submit = SubmitField('submit')
