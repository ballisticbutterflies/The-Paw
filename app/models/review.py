from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))
    review = db.Column(db.String(2000), nullable=False)
    stars = db.Column(db.Integer, nullable=False)


    user = db.relationship('User',
                            back_populates='reviews')
    business = db.relationship('Business',
                              back_populates='reviews')
    # images = db.relationship('Image',
    #                           back_populates='review',
    #                           cascade='all, delete-orphan')
