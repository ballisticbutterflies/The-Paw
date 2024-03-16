from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)


    businesses = db.relationship('Business',
                               back_populates='owner',
                               cascade='all, delete-orphan')
    images = db.relationship('Image',
                               back_populates='uploader',
                               cascade='all, delete-orphan')
    reviews = db.relationship('Review',
                               back_populates='user',
                               cascade='all, delete-orphan')
    images = db.relationship('Image',
                                primaryjoin="and_(Image.imageable_type=='user', foreign(Image.imageable_id)==User.id)",
                                lazy="dynamic",
                                cascade='all, delete-orphan')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'city': self.city,
            'state': self.state,
            'email': self.email
        }
