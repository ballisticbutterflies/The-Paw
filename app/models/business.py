from .db import db, environment, SCHEMA, add_prefix_for_prod
# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String

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
    owner_id = Column(Integer, ForeignKey('users.id'))
    # category_id = Column(Integer, ForeignKey('categories.id'))
    address = Column(String(255), nullable=False)
    city = Column(String(255), nullable=False)
    state = Column(String(2), nullable=False)
    zip_code = Column(String(5), nullable=False)
    name = Column(String(30), nullable=False)
    description = Column(String(255), nullable=False)
    website = Column(String(255), nullable=True)
    email = Column(String(255), nullable=True)
    phone = Column(String(10), nullable=True)
    price = Column(String(4), nullable=True)


    owner = relationship('User',
                            back_populates='businesses')
    # category = relationship('Category',
    #                           back_populates='businesses')
    # subcategories = relationship('Subcategory',
    #                           back_populates='business')
    # reviews = relationship('Review',
    #                           back_populates='business',
    #                           cascade='all, delete-orphan')
    # images = relationship('Image',
    #                           back_populates='business',
    #                           cascade='all, delete-orphan')
    # attributes = relationship('Attribute',
    #                              secondary=business_attributes,
    #                              back_populates='businesses')
    # hours = relationship('Hour',
    #                         back_populates='business',
    #                         cascade='all, delete-orphan')


# class Attribute(db.Model):
#     __tablename__ = 'attributes'

#     if environment == 'production':
#         __table_args__ = {'schema': SCHEMA}

#     id = Column(Integer, primary_key=True)
#     name = Column(String(100), nullable=False)

#     businesses = relationship('Business',
#                                  secondary=business_attributes,
#                                  back_populates='attributes')