from .db import db, environment, SCHEMA, add_prefix_for_prod


class Hour(db.Model):
    __tablename__ = 'hours'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))
    m_open = db.Column(db.String(4), nullable=True)
    m_close = db.Column(db.String(4), nullable=True)
    tu_open = db.Column(db.String(4), nullable=True)
    tu_close = db.Column(db.String(4), nullable=True)
    w_open = db.Column(db.String(4), nullable=True)
    w_close = db.Column(db.String(4), nullable=True)
    th_open = db.Column(db.String(4), nullable=True)
    th_close = db.Column(db.String(4), nullable=True)
    f_open = db.Column(db.String(4), nullable=True)
    f_close = db.Column(db.String(4), nullable=True)
    sa_open = db.Column(db.String(4), nullable=True)
    sa_close = db.Column(db.String(4), nullable=True)
    su_open = db.Column(db.String(4), nullable=True)
    su_close = db.Column(db.String(4), nullable=True)


    business = db.relationship('Business',
                                 back_populates='hours')
