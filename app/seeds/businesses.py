from app.models import db, Business, environment, SCHEMA
from sqlalchemy.sql import text

def seed_businesses():
    petagogy = Business(
        owner_id=1,
        # category_id=4,
        address='5880 Ellsworth Ave',
        city='Pittsburgh',
        state='PA',
        zip_code='15232',
        name='Petagogy',
        description='Offering a great selection of premium and natural pet foods and supplies in the Pittsburgh area, Fido is welcome to come and sniff out deals on offer here. As well as food, Fido will also find collars, leashes, toys and more.',
        website='https://www.petagogy.com/',
        email='info@petagogy.com',
        phone='4123627387',
        price='$$$'
    )

    mishka = Business(
        owner_id=2,
        # category_id=4,
        address='2124 Union St Ste A',
        city='San Francisco',
        state='CA',
        zip_code='94123',
        name='Mishka Dog Boutique',
        description='Mishka dog cakes made with no artificial colors, no preservatives! You can also find our full line of hand crafted, luxury dog clothing and accessories.',
        website='https://mishkacakes.com/',
        phone='6289000923',
        price='$$$$'
    )

    db.session.add(petagogy)
    db.session.add(mishka)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM businesses"))

    db.session.commit()
