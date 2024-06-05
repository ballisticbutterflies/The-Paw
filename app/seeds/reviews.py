from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
import random
from lorem_text import lorem

def generate_review(user_id, business_id, review, stars):
    return Review(
        user_id=user_id,
        business_id=business_id,
        review=review,
        stars=stars
    )

def seed_reviews():
    demo_leo = Review(
        # id 1
        user_id=1,
        business_id=3,
        review='Ugh, people suck. They need to learn how to pick up after their dogs here :/ Otherwise, the park is beautiful.',
        stars=2
    )

    marnie_leo = Review(
        # id 2
        user_id=2,
        business_id=3,
        review='This was so-so. I wish they had bowls out for the dogs. Some of the dog owners were kind enough to share their bowls though.',
        stars=3
    )

    misty_leo = Review(
        # id 3
        user_id=4,
        business_id=3,
        review='Amazing! Such a beautiful view and my doggo loves coming out here. She\'s made so many doggo-friends!',
        stars=5
    )

    misty_dumpling = Review(
        # id 4
        user_id=4,
        business_id=4,
        review='This place was superb! The workers were so friendly to my pup, Ellie. Can\'t wait to go back!',
        stars=5
    )

    marnie = Review(
        # id 5
        user_id=2,
        business_id=1,
        review='This store was amazing! They were so friendly to my dog, Lily.',
        stars=5
    )

    bobbie = Review(
        # id 6
        user_id=3,
        business_id=1,
        review='Odin hated this place! There were no good toys for him, or good times had.',
        stars=1
    )

    bakery_review = Review(
        # id 7
        user_id=3,
        business_id=5,
        review="We got a pup-kin bar and a frozen bone marrow treat. She loved it so much! Thank you to the kind worker!",
        stars=4
    )

    db.session.add(demo_leo)
    db.session.add(marnie_leo)
    db.session.add(misty_leo)
    db.session.add(misty_dumpling)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(bakery_review)

    for _ in range(6508):
        user_id=random.randint(51, 150)
        business_id=random.randint(1, 259)
        review=lorem.sentence()[:200]
        stars=random.randint(1, 5)
        random_review=generate_review(user_id, business_id, review, stars)
        db.session.add(random_review)

    # for _ in range(3781):
    #     user_id=random.randint(51, 150)
    #     business_id=random.randint(1, 251)
    #     review=lorem.sentence()[:200]
    #     stars=random.randint(4, 5)
    #     random_review=generate_review(user_id, business_id, review, stars)
    #     db.session.add(random_review)

    for _ in range(4781):
        user_id=random.randint(51, 150)
        business_id=random.randint(1, 259)
        review=lorem.sentence()[:200]
        stars=random.randint(4, 5)
        random_review=generate_review(user_id, business_id, review, stars)
        db.session.add(random_review)

    for _ in range(1041):
        user_id=random.randint(51, 150)
        business_id=random.randint(1, 259)
        review=lorem.sentence()[:200]
        stars=random.randint(1, 5)
        random_review=generate_review(user_id, business_id, review, stars)
        db.session.add(random_review)

    # for _ in range(1041):
    #     user_id=random.randint(51, 150)
    #     business_id=random.randint(74, 251)
    #     review=lorem.sentence()[:200]
    #     stars=random.randint(4, 5)
    #     random_review=generate_review(user_id, business_id, review, stars)
    #     db.session.add(random_review)

    for _ in range(3541):
        user_id=random.randint(51, 150)
        business_id=random.randint(51, 102)
        review=lorem.sentence()[:200]
        stars=random.randint(1, 2)
        random_review=generate_review(user_id, business_id, review, stars)
        db.session.add(random_review)

    for _ in range(4441):
        user_id=random.randint(51, 150)
        business_id=random.randint(25, 74)
        review=lorem.sentence()[:200]
        stars=5
        random_review=generate_review(user_id, business_id, review, stars)
        db.session.add(random_review)

    db.session.commit()

    for _ in range(3541):
        user_id=random.randint(51, 150)
        business_id=random.randint(98, 115)
        review=lorem.sentence()[:200]
        stars=random.randint(1, 2)
        random_review=generate_review(user_id, business_id, review, stars)
        db.session.add(random_review)

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
