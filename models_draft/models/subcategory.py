from .db import db, environment, SCHEMA, add_prefix_for_prod


class Subcategory(db.Model):
    __tablename__ = 'subcategories'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=True)
    name = db.Column(db.String(30), nullable=False)


    category = db.relationship('Category',
                                    back_populates='subcategories')
    business = db.relationship('Business',
                                    back_populates='subcategories')
