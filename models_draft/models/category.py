from .db import db, environment, SCHEMA, add_prefix_for_prod


class Category(db.Model):
    __tablename__ = 'categories'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)


    subcategories = db.relationship('Subcategory',
                                    back_populates='category')
    businesses = db.relationship('Business',
                               back_populates='category')
