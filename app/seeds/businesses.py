from app.models import db, Business, environment, SCHEMA
from sqlalchemy.sql import text

def seed_businesses():
    petagogy = Business(
        # id 1
        owner_id=1,
        category_id=4,
        address='5880 Ellsworth Ave',
        city='Pittsburgh',
        state='PA',
        zip_code='15232',
        name='Petagogy',
        description='Offering a great selection of premium and natural pet foods and supplies in the Pittsburgh area, Fido is welcome to come and sniff out deals on offer here. As well as food, Fido will also find collars, leashes, toys and more.',
        website='https://www.petagogy.com/',
        email='info@petagogy.com',
        phone='4123627387',
        price='$$$',
        set_hours=True,
        mon_open='1000',
        mon_close='2000',
        tue_open='1000',
        tue_close='2000',
        wed_open='1000',
        wed_close='2000',
        thu_open='1000',
        thu_close='2000',
        fri_open='1000',
        fri_close='2000',
        sat_open='1000',
        sat_close='2000',
        sun_open='1100',
        sun_close='1600',
    )

    mishka = Business(
        # id 2
        owner_id=2,
        category_id=4,
        address='2124 Union St Ste A',
        city='San Francisco',
        state='CA',
        zip_code='94123',
        name='Mishka Dog Boutique',
        description='Mishka dog cakes made with no artificial colors, no preservatives! You can also find our full line of hand crafted, luxury dog clothing and accessories.',
        website='https://mishkacakes.com/',
        phone='6289000923',
        price='$$$$',
        set_hours=True,
        mon_open='1100',
        mon_close='1700',
        tue_open='1100',
        tue_close='1800',
        wed_open='1100',
        wed_close='1800',
        thu_open='1100',
        thu_close='1800',
        fri_open='1100',
        fri_close='1800',
        sat_open='1000',
        sat_close='1800',
        sun_open='1000',
        sun_close='1800',
    )

    leo_j_ryan = Business(
        # id 3
        owner_id=3,
        category_id=6,
        address='650 Shell Blvd',
        city='Foster City',
        state='CA',
        zip_code='94404',
        name='Leo J Ryan Memorial Park',
        description='Leo J. Ryan Memorial Park is a dog-friendly park that offers 20 acres of lawn areas, lagoon access, a gazebo on the lagoon, and restroom facilities.',
        website='https://www.fostercity.org/parksrec/page/leo-j-ryan-park',
        phone='6502863380',
        set_hours=False
    )

    dumpling_home = Business(
        # id 4
        owner_id=3,
        category_id=1,
        address='298 Gough St',
        city='San Francisco',
        state='CA',
        zip_code='94102',
        name='Dumpling Home',
        description='Casual, colorful eatery dishing up fried, steamed, or boiled dumplings, plus noodles and small plates, with a dog-friendly patio!',
        website='https://www.dumplinghome.com/',
        phone='4155031666',
	    price='$$',
        set_hours=True,
        mon_open='1130',
        mon_close='2015',
        tue_open='1130',
        tue_close='2015',
        wed_open='1130',
        wed_close='2015',
        thu_open='1130',
        thu_close='2015',
        fri_open='1130',
        fri_close='2015',
        sat_open='1130',
        sat_close='2015'
    )

    bakery = Business(
        # id 5
        owner_id=1,
        category_id=1,
        address= "2402 Rice Blvd",
        city= "Houston",
        state= "TX",
        zip_code= "77005",
        name= "Three Dog Bakery Houston",
        description= "Three Dog Bakery is an unforgettable experience for dogs (and their two-legged parents). You will find a selection of treats that can only be found at Three Dog bakeries.",
        website= "https://www.threedogbakeryhtx.com/",
        email= "baker@threedogbakeryhtx.com",
        phone= "7135339933",
        price= "$$",
        set_hours=True,
        wed_open='1000',
        wed_close='2000',
        thu_open='1000',
        thu_close='2000',
        fri_open='0900',
        fri_close='2000',
        sat_open='0900',
        sat_close='2000',
        sun_open='1000',
        sun_close='1900',
    )

    caroline = Business(
    # id 6
        owner_id= 4,
        category_id=8,
        address='3301 NE 1st Ave',
        city='Miami',
        state='FL',
        zip_code='33137',
        name='Caroline Twohill Photography',
        description='Caroline longs and strides to discovering and telling your dog’s unique story with beautiful, natural fine art images just begging to be displayed in your home and shared with family, friends and loved ones.',
        website='https://www.carolinetwohillphotography.com/',
        phone='6094252118',
        price='$$',
        set_hours=False
    )

    exotic_vet = Business(
    # id 7
        owner_id= 5,
        category_id=2,
        address='10501 Aurora Ave North',
        city='Seattle',
        state='WA',
        zip_code='98133',
        name='Bird and Exotic Clinic of Seattle',
        description='Established in 1997 Bird & Exotic Clinic of Seattle is a full-service specialty exotic animal hospital and welcomes patients in need of routine and advanced medical, surgical, and dental care.',
        website='https://www.birdandexotic.com/',
        email= "birdandexoticclinicofseattle@gmail.com",
        phone='2067834538',
        price='$$',
        set_hours="yes",
        mon_open='0900',
        mon_close='1700',
        tue_open='0800',
        tue_close='2015',
        wed_open='1800',
        wed_close='2015',
        thu_open='1800',
        thu_close='2015',
        fri_open='1800',
        fri_close='2015',
        sat_open='0900',
        sat_close='1600'
    )

    perch= Business(
    # id 8
        owner_id=1,
        category_id=4,
        address='1932 W Division',
        city='Chicago',
        state='IL',
        zip_code='60622',
        name='The Perch',
        description='The Perch Kitchen and Tap is a partnership between 4 STAR Restaurant Group and Finch Beer Co. - Wicker Park\'s newest full service restaurant + bar with an onsite brewery.',
        website='https://theperchchicago.com',
        price='$$$',
        set_hours="yes",
        mon_open='1100',
        mon_close='2100',
        tue_open='0100',
        tue_close='2100',
        wed_open='1100',
        wed_close='2100',
        thu_open='1100',
        thu_close='2100',
        fri_open='1100',
        fri_close='2200',
        sat_open='0900',
        sat_close='2100',
        sun_open='0900',
        sun_close='2100'
    )

    salondog= Business(
    # id 9
        owner_id=3,
        category_id=3,
        address='2542 W Fullerton Ave',
        city='Chicago',
        state='IL',
        zip_code='60647',
        name='Salon Dog',
        description='Salon Dog is a team of experienced and caring pet groomers dedicated to providing top-quality grooming services for your beloved pets.',
        website='https://salondog.net/',
        set_hours=True,
        mon_open='0900',
        mon_close='1800',
        wed_open='0900',
        wed_close='1800',
        thu_open='0900',
        thu_close='1800',
        fri_open='0900',
        fri_close='1800',
        sat_open='1000',
        sat_close='1800',
        sun_open='1000',
        sun_close='1800'
    )

    db.session.add(petagogy)
    db.session.add(mishka)
    db.session.add(leo_j_ryan)
    db.session.add(dumpling_home)
    db.session.add(bakery)
    db.session.add(caroline)
    db.session.add(exotic_vet)
    db.session.add(perch)
    db.session.add(salondog)
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
