from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.dialects.postgresql import ENUM
from sqlalchemy.sql import func
from sqlalchemy.types import DateTime

class Image(db.Model):
    __tablename__ = 'images'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    uploader_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    imageable_id = db.Column(db.Integer, nullable=False)
    imageable_type = db.Column(ENUM('business', 'review', 'user', name='imageable_types'), nullable=False)
    url = db.Column(db.String, nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())


    def parent(self):
      if self.imageable_type == 'business':
        return self.post.to_dict()
      elif self.imageable_type == 'review':
        return self.comment.to_dict()
      elif self.imageable_type == 'user':
        return self.comment.to_dict()
      else:
        return "No matching imageable type"

    def to_dict(self):
        return {
        "id": self.id,
        "uploader_id": self.uploader_id,
        "url": self.url,
        "imageable_id": self.imageable_id,
        "imageable_type": self.imageable_type,
        "parent": self.parent()
        }

    uploader = db.relationship('User',
                            back_populates='images')
    user = db.relationship('User',
                          primaryjoin="and_(Image.imageable_type=='user', foreign(Image.imageable_id)==User.id)",
                          overlaps="images,images",
                          uselist=False)
    business = db.relationship('Business',
                              primaryjoin="and_(Image.imageable_type=='business', foreign(Image.imageable_id)==Business.id)",
                              overlaps="images,images,user",
                              uselist=False)
    review = db.relationship('Review',
                              primaryjoin="and_(Image.imageable_type=='review', foreign(Image.imageable_id)==Review.id)",
                              overlaps="business,images,images,user",
                              uselist=False)
