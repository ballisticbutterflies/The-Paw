from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy.types import DateTime


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('businesses.id')))
    review = db.Column(db.String(2000), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())


    user = db.relationship('User',
                            back_populates='reviews')
    business = db.relationship('Business',
                              back_populates='reviews')
    images = db.relationship('Image',
                                primaryjoin="and_(Image.imageable_type=='review', foreign(Image.imageable_id)==Review.id)",
                                lazy="dynamic",
                                overlaps="business,images,images,review,user",
                                cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'business_id': self.business_id,
            'review': self.review,
            'stars': self.stars
        }