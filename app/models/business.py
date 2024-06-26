from .db import db, environment, SCHEMA, add_prefix_for_prod
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String, Boolean
from sqlalchemy.sql import func
from sqlalchemy.types import DateTime

# Base = declarative_base()


# business_attributes = Table(
#     'business_attributes',
#     Base.metadata,
#     Column('business_id', Integer, ForeignKey('businesses.id'), primary_key=True),
#     Column('attribute_id', Integer, ForeignKey('attributes.id'), primary_key=True)
# )

class Business(db.Model):
    __tablename__ = 'businesses'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    owner_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')))
    category_id = Column(Integer, ForeignKey(add_prefix_for_prod('categories.id')))
    address = Column(String(255), nullable=True)
    city = Column(String(255), nullable=False)
    state = Column(String(2), nullable=False)
    zip_code = Column(String(5), nullable=False)
    name = Column(String(100), nullable=False)
    description = Column(String(255), nullable=False)
    website = Column(String(255), nullable=True)
    email = Column(String(255), nullable=True)
    phone = Column(String(10), nullable=True)
    price = Column(String(4), nullable=True)
    set_hours = Column(String(3), nullable=True)
    mon_open = Column(String(4), nullable=True)
    mon_close = Column(String(4), nullable=True)
    tue_open = Column(String(4), nullable=True)
    tue_close = Column(String(4), nullable=True)
    wed_open = Column(String(4), nullable=True)
    wed_close = Column(String(4), nullable=True)
    thu_open = Column(String(4), nullable=True)
    thu_close = Column(String(4), nullable=True)
    fri_open = Column(String(4), nullable=True)
    fri_close = Column(String(4), nullable=True)
    sat_open = Column(String(4), nullable=True)
    sat_close = Column(String(4), nullable=True)
    sun_open = Column(String(4), nullable=True)
    sun_close = Column(String(4), nullable=True)
    created_at = db.Column(DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(DateTime(timezone=True), onupdate=func.now())

    owner = relationship('User',
                            back_populates='businesses')
    category = relationship('Category',
                              back_populates='businesses')
    # # subcategories = relationship('Subcategory',
    # #                           back_populates='business')
    reviews = relationship('Review',
                              back_populates='business',
                              cascade='all, delete-orphan')
    images = db.relationship('Image',
                                primaryjoin="and_(Image.imageable_type=='business', foreign(Image.imageable_id)==Business.id)",
                                overlaps="images",
                                lazy="dynamic",
                                cascade='all, delete-orphan')

    # attributes = relationship('Attribute',
    #                              secondary=business_attributes,
    #                              back_populates='businesses')
    # hours = relationship('Hour',
    #                         back_populates='business',
    #                         cascade='all, delete-orphan')
    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'category_id': self.category_id,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zip_code': self.zip_code,
            'name': self.name,
            'description': self.description,
            'website': self.website,
            'email': self.email,
            'phone': self.phone,
            'price': self.price,
            'set_hours': self.set_hours,
            'hours': {
            'mon_open': self.mon_open,
            'mon_close': self.mon_close,
            'tue_open': self.tue_open,
            'tue_close': self.tue_close,
            'wed_open': self.wed_open,
            'wed_close': self.wed_close,
            'thu_open': self.thu_open,
            'thu_close': self.thu_close,
            'fri_open': self.fri_open,
            'fri_close': self.fri_close,
            'sat_open': self.sat_open,
            'sat_close': self.sat_close,
            'sun_open': self.sun_open,
            'sun_close': self.sun_close,
            }
        }

# class Attribute(db.Model):
#     __tablename__ = 'attributes'

#     if environment == 'production':
#         __table_args__ = {'schema': SCHEMA}

#     id = Column(Integer, primary_key=True)
#     name = Column(String(100), nullable=False)

#     businesses = relationship('Business',
#                                  secondary=business_attributes,
#                                  back_populates='attributes')
