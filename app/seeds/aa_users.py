from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        id=1,
        first_name='Demo',
        last_name='User',
        city='San Francisco',
        state='CA',
        email='demo@aa.io',
        password='password')
    marnie = User(
        id=2,
        first_name='marnie',
        last_name='barnie',
        city='Pittsburg',
        state='PA',
        email='marnie@aa.io',
        password='password')
    bobbie = User(
        id=3,
        first_name='bobbie',
        last_name='robbie',
        city='New York',
        state='NY',
        email='bobbie@aa.io',
        password='password')
    
    misty = User(
        id=4,
        first_name='Misty',
        last_name='Waterflower',
        city='San Mateo',
        state='CA',
        email='misty@aa.io',
        password='password')
    
    simon = User(
        id=5,
        first_name='Simon',
        last_name='Krawa',
        city='Uniontown',
        state='PA',
        email='bssammel@gmail.com',
        password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(misty)
    db.session.add(simon)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
