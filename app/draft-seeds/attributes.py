from app.models import db, Attribute, environment, SCHEMA
from sqlalchemy.sql import text


def seed_attributes():
    free_wifi = Attribute(
        name='Free Wifi'
        )
    pet_waste = Attribute(
        name='Pet Waste Station'
        )
    pet_water = Attribute(
        name='Pet Water Fountain'
        )
    outside_dining = Attribute(
        name='Outside Dining'
        )
    street_parking = Attribute(
        name='Street Parking'
    )
    live_music = Attribute(
        name='Live Music'
    )
    tap_to_pay = Attribute(
        name='Tap to Pay'
    )
    wheelchair = Attribute(
        name='Wheelchair Accessible'
    )


    db.session.add(free_wifi)
    db.session.add(pet_waste)
    db.session.add(pet_water)
    db.session.add(outside_dining)
    db.session.add(street_parking)
    db.session.add(live_music)
    db.session.add(tap_to_pay)
    db.session.add(wheelchair)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_attributes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.attributes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM attributes"))
        
    db.session.commit()
