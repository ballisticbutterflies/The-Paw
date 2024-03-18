from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

def seed_images():
    petagogy_biz = Image(
        imageable_id=1,
        imageable_type='business',
        url='https://i.imgur.com/9bEZuYg.png',
        uploader_id=1
    )

    petagogy_review1 = Image(
        imageable_id=2,
        imageable_type='review',
        url='https://s3-media0.fl.yelpcdn.com/bphoto/aj7a9TE15nvEiKXWfO-UJg/o.jpg',
        uploader_id=3
    )

    petagogy_review2 = Image(
        imageable_id=2,
        imageable_type='review',
        url='https://www.smallbusinessbrain.com/wp-content/uploads/2020/04/opening-a-pet-store.jpg',
        uploader_id=3
    )

    marnie = Image(
        imageable_id=2,
        imageable_type='user',
        url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq-hTj5hlzHRRhpw_Icd3QjBcQD0ADo3AbTg&usqp=CAU',
        uploader_id=2
    )
    mishka_biz = Image(
        imageable_id=2,
        imageable_type='business',
        url='https://s3-media0.fl.yelpcdn.com/bphoto/ZBSvPCaQ9XQALkYU8MXQjA/o.jpg',
        uploader_id=2
    )
    petagogy_review3 = Image(
        imageable_id=1,
        imageable_type='review',
        url='https://s3-media0.fl.yelpcdn.com/bphoto/6iIqAfuC81vz0RSUpmGunQ/1000s.jpg',
        uploader_id=3
    )



    db.session.add(petagogy_biz)
    db.session.add(petagogy_review1)
    db.session.add(petagogy_review2)
    db.session.add(marnie)
    db.session.add(mishka_biz)
    db.session.add(petagogy_review3)
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
