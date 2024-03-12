from .db import db, environment, SCHEMA, add_prefix_for_prod


class Image(db.Model):
    __tablename__ = 'images'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    imageable_id = db.Column(db.Integer, nullable=False)
    imageable_type = db.Column(db.String('business', 'review', 'user'), nullable=False)
    url = db.Column(db.String, nullable=False)

  
    def to_dict(self):
        return {
        "id": self.id,
        "url": self.url,
        "imageable_id": self.imageable_id,
        "imageable_type": self.imageable_type,
        }


    user = db.relationship('User',
                            back_populates='profile_image')
    business = db.relationship('Business',
                              back_populates='images')
    review = db.relationship('Review',
                              back_populates='images')
