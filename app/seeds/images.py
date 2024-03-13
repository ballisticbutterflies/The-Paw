from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    petagogy_biz = Image(
        imageable_id=1,
        imageable_type='business',
        url='https://imgur.com/9bEZuYg'
    )

    petagogy_review1 = Image(
        imageable_id=2,
        imageable_type='review',
        url='https://s3-media0.fl.yelpcdn.com/bphoto/aj7a9TE15nvEiKXWfO-UJg/o.jpg'
    )

    petagogy_review2 = Image(
        imageable_id=2,
        imageable_type='review',
        url='https://www.smallbusinessbrain.com/wp-content/uploads/2020/04/opening-a-pet-store.jpg'
    )

    marnie = Image(
        imageable_id=2,
        imageable_type='user',
        url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq-hTj5hlzHRRhpw_Icd3QjBcQD0ADo3AbTg&usqp=CAU'
    )



    db.session.add(petagogy_biz)
    db.session.add(petagogy_review1)
    db.session.add(petagogy_review2)
    db.session.add(marnie)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
