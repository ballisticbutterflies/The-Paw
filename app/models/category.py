from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from sqlalchemy.types import DateTime


class Category(db.Model):
    __tablename__ = 'categories'


    if environment == 'production':
      __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())


    businesses = relationship('Business', back_populates='category')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }
