from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String

Base = declarative_base()


business_attributes = Table(
    'business_attributes',
    Base.metadata,
    Column('business_id', ForeignKey('businesses.id'), primary_key=True),
    Column('attribute_id', ForeignKey('attributes.id'), primary_key=True)
)

class Business(db.Model):
    __tablename__ = 'businesses'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    address = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    zip_code = db.Column(db.String(5), nullable=False)
    name = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    website = db.Column(db.String(255), nullable=True)
    email = db.Column(db.String(255), nullable=True)
    phone = db.Column(db.String(10), nullable=True)
    price = db.Column(db.String(4), nullable=True)


    owner = db.relationship('User',
                            back_populates='businesses')
    category = db.relationship('Category',
                              back_populates='businesses')
    subcategories = db.relationship('Subcategory',
                              back_populates='business')
    reviews = db.relationship('Review',
                              back_populates='business',
                              cascade='all, delete-orphan')
    images = db.relationship('Image',
                              back_populates='business',
                              cascade='all, delete-orphan')
    attributes = db.relationship('Attribute',
                                 secondary='business_attributes',
                                 back_populates='businesses')
    hours = db.relationship('Hour',
                            back_populates='business',
                            cascade='all, delete-orphan')


class Attribute(db.Model):
    __tablename__ = 'attributes'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

    businesses = db.relationship('Business',
                                 secondary='business_attributes',
                                 back_populates='attributes')
