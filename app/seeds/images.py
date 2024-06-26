import random
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
        imageable_id=6,
        imageable_type='review',
        url='https://s3-media0.fl.yelpcdn.com/bphoto/aj7a9TE15nvEiKXWfO-UJg/o.jpg',
        uploader_id=3
    )

    petagogy_review2 = Image(
        imageable_id=6,
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
        imageable_id=6,
        imageable_type='review',
        url='https://s3-media0.fl.yelpcdn.com/bphoto/6iIqAfuC81vz0RSUpmGunQ/1000s.jpg',
        uploader_id=3
    )

    leo_j_ryan_biz1 = Image(
        imageable_id=3,
        imageable_type='business',
        url='https://birding.sequoia-audubon.org/photos/FosterCity-RyanPark.jpg',
        uploader_id=3
    )

    leo_j_ryan_biz2 = Image(
        imageable_id=3,
        imageable_type='business',
        url='https://www.fostercity.org/sites/default/files/styles/full_node_primary_extra_wide/public/imageattachments/parksrec/page/6881/leo_ryan_aug_25_008.jpg',
        uploader_id=4
    )

    leo_j_ryan_review1 = Image(
        imageable_id=2,
        imageable_type='review',
        url='https://s3-media0.fl.yelpcdn.com/bphoto/XfLKnWDFN2_YKcNEdjmQjA/o.jpg',
        uploader_id=2
    )

    leo_j_ryan_review2 = Image(
        imageable_id=2,
        imageable_type='review',
        url='https://s3-media0.fl.yelpcdn.com/bphoto/ygIKD2VohfJHnpA_SRVYXA/o.jpg',
        uploader_id=2
    )

    dumpling_home_biz = Image(
        imageable_id=4,
        imageable_type='business',
        url='https://s3-media0.fl.yelpcdn.com/bphoto/Utdv29yFK-sfp9D1Tg-Bwg/o.jpg',
        uploader_id=3
    )

    bakery_biz = Image(
        imageable_id=5,
        imageable_type="business",
        url="https://static.wixstatic.com/media/ced99c_f14b2a7d079f4c2ab0f7e59b6cdca807~mv2_d_3024_4032_s_4_2.jpg/v1/fill/w_288,h_384,fp_0.50_0.50,q_90,enc_auto/ced99c_f14b2a7d079f4c2ab0f7e59b6cdca807~mv2_d_3024_4032_s_4_2.jpg",
        uploader_id=1
    )

    bakery_rev = Image(
        imageable_id=7,
        imageable_type="review",
        url="https://s3-media0.fl.yelpcdn.com/bphoto/gXHsRuUjx7tlen565_I6SQ/o.jpg",
        uploader_id=3
    )

    photog_biz = Image(
        imageable_id=6,
        imageable_type="business",
        url="https://live.staticflickr.com/7629/16941122432_0fad613854_h.jpg",
        uploader_id=4
    )

    vet_biz = Image(
        imageable_id=7,
        imageable_type="business",
        url="https://cdcssl.ibsrv.net/ibimg/smb/1000x550_80/webmgr/1x/o/q/646790d9b6a4a_building.jpg",
        uploader_id=5
    )

    perch_biz1 = Image(
        imageable_id=8,
        imageable_type="business",
        url="https://s3-media0.fl.yelpcdn.com/bphoto/xPZYGIOhMeYEvPsT9RPofA/o.jpg",
        uploader_id=1
    )

    perch_biz2 = Image(
        imageable_id=8,
        imageable_type="business",
        url="https://s3-media0.fl.yelpcdn.com/bphoto/FNEMMG8W4Ul8ITdAVuUEYA/o.jpg",
        uploader_id=1
    )

    salondog_biz = Image(
        imageable_id=9,
        imageable_type="business",
        url="https://thepawimages.s3.us-west-2.amazonaws.com/salon_dog.jpg",
        uploader_id=5
    )

    for i in range(10, 93):
        new_image = Image(
            imageable_id=i,
            imageable_type='business',
            url=f'https://thepawimages.s3.us-west-2.amazonaws.com/{i}.jpeg',
            uploader_id=random.randint(1, 50)
        )
        db.session.add(new_image)

    for i in range(93, 212):
        new_image = Image(
            imageable_id=i,
            imageable_type='business',
            url=f'https://thepawimages.s3.us-west-2.amazonaws.com/biz-images/{i}.jpg',
            uploader_id=random.randint(1, 50)
        )
        db.session.add(new_image)

    for i in range(212, 252):
        new_image = Image(
            imageable_id=i,
            imageable_type='business',
            url=f'https://thepawimages.s3.us-west-2.amazonaws.com/{i}.jpeg',
            uploader_id=random.randint(1, 50)
        )
        db.session.add(new_image)

    for i in range(252, 260):
        new_image = Image(
            imageable_id=i,
            imageable_type='business',
            url=f'https://thepawimages.s3.us-west-2.amazonaws.com/{i}.jpeg',
            uploader_id=random.randint(1, 50)
        )
        db.session.add(new_image)

    db.session.add(petagogy_biz)
    db.session.add(petagogy_review1)
    db.session.add(petagogy_review2)
    db.session.add(marnie)
    db.session.add(mishka_biz)
    db.session.add(petagogy_review3)
    db.session.add(leo_j_ryan_biz1)
    db.session.add(leo_j_ryan_biz2)
    db.session.add(leo_j_ryan_review1)
    db.session.add(leo_j_ryan_review2)
    db.session.add(dumpling_home_biz)
    db.session.add(bakery_biz)
    db.session.add(bakery_rev)
    db.session.add(photog_biz)
    db.session.add(vet_biz)
    db.session.add(perch_biz1)
    db.session.add(perch_biz2)
    db.session.add(salondog_biz)
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
