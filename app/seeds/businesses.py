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

    leo_j_ryan = Business(
        owner_id=3,
        # category_id=6,
        address='650 Shell Blvd',
        city='Foster City',
        state='CA',
        zip_code='94404',
        name='Leo J Ryan Memorial Park',
        description='Leo J. Ryan Memorial Park is a dog-friendly park that offers 20 acres of lawn areas, lagoon access, a gazebo on the lagoon, and restroom facilities.',
        website='https://www.fostercity.org/parksrec/page/leo-j-ryan-park',
        phone='6502863380',
    )

    dumpling_home = Business(
        owner_id=3,
        # category_id=1,
        address='298 Gough St',
        city='San Francisco',
        state='CA',
        zip_code='94102',
        name='Dumpling Home',
        description='Casual, colorful eatery dishing up fried, steamed, or boiled dumplings, plus noodles and small plates, with a dog-friendly patio!',
        website='https://www.dumplinghome.com/',
        phone='4155031666',
	    price='$$'
    )

    bakery = Business(
        owner_id=1,
        # category_id=1,
        address= "2402 Rice Blvd",
        city= "Houston",
        state= "TX",
        zip_code= "77005",
        name= "Three Dog Bakery Houston",
        description= "Three Dog Bakery is an unforgettable experience for dogs (and their two-legged parents). You will find a selection of treats that can only be found at Three Dog bakeries.",
        website= "https=//www.threedogbakeryhtx.com/",
        email= "baker@threedogbakeryhtx.com",
        phone= "7135339933",
        price= "$$"
    )

    caroline = Business(
        owner_id= 4,
        # category_id=8,
        address='3301 NE 1st Ave',
        city='Miami',
        state='FL',
        zip_code='33137',
        name='Caroline Twohill Photography',
        description='Caroline longs and strides to discovering and telling your dog’s unique story with beautiful, natural fine art images just begging to be displayed in your home and shared with family, friends and loved ones.',
        website='https://www.carolinetwohillphotography.com//',
        phone='6094252118',
        price='$$'
    )

    exotic_vet= Business(
        owner_id= 5,
        # category_id=2,
        address='10501 Aurora Ave North',
        city='Seattle',
        state='WA',
        zip_code='98133',
        name='Bird and Exotic Clinic of Seattle',
        description='Established in 1997 Bird & Exotic Clinic of Seattle is a full-service specialty exotic animal hospital and welcomes patients in need of routine and advanced medical, surgical, and dental care.',
        website='https://www.birdandexotic.com/',
        email= "birdandexoticclinicofseattle@gmail.com",
        phone='2067834538',
        price='$$'
    )

    db.session.add(petagogy)
    db.session.add(mishka)
    db.session.add(leo_j_ryan)
    db.session.add(dumpling_home)
    db.session.add(bakery)
    db.session.add(caroline)
    db.session.add(exotic_vet)
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
