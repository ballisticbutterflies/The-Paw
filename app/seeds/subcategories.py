from app.models import db, Subcategory, environment, SCHEMA
from sqlalchemy.sql import text


def seed_subcategories():
    bakeries_cafes = Subcategory(
        category_id=1,
        name='Bakeries & Cafes'
        )
    bars_pubs = Subcategory(
        category_id=1,
        name='Bars & Pubs'
        )
    casual_dining = Subcategory(
        category_id=1,
        name='Casual Dining'
        )
    fine_dining = Subcategory(
        category_id=1,
        name='Fine Dining'
        )
    fast_food = Subcategory(
        category_id=1,
        name='Fast Food'
        )
    desserts = Subcategory(
        category_id=1,
        name='Desserts'
        )
    general = Subcategory(
        category_id=2,
        name='General'
        )
    exotic = Subcategory(
        category_id=2,
        name='Exotic'
        )
    emergency = Subcategory(
        category_id=2,
        name='Emergency'
        )
    pet_walking = Subcategory(
        category_id=3,
        name='Pet Walking'
        )
    pet_sitting = Subcategory(
        category_id=3,
        name='Pet Sitting'
        )
    pet_daycare = Subcategory(
        category_id=3,
        name='Pet Daycare'
        )
    boarding = Subcategory(
        category_id=3,     
        name='Boarding'
    )
    grooming = Subcategory(
        category_id=3,     
        name='Grooming'
    )
    home_improvement = Subcategory(
         category_id=4,       
        name='Home Improvement'
        )
    pet_stores = Subcategory(
         category_id=4,       
        name='Pet Stores'
        )
    department_stores = Subcategory(
         category_id=4,       
        name='Department Stores'
        )
    accommodations = Subcategory(
        category_id=5,     
        name='Accommodations'
    )
    airlines = Subcategory(
        category_id=5,     
        name='Airlines'
    )
    trains = Subcategory(
        category_id=5,     
        name='Trains'
    )
    dog_parks = Subcategory(
        category_id=6,     
        name='Dog Parks'
    )
    hiking_trails = Subcategory(
        category_id=6,     
        name='Hiking Trails'
    )
    tours = Subcategory(
        category_id=6,     
        name='Tours'
    )
    shelters = Subcategory(
        category_id=7, 
        name='Local Animal Shelters'
    )
    senior_adoption = Subcategory(
        category_id=7, 
        name='Senior Adoption'
    )
    reputable_breeders = Subcategory(
        category_id=7, 
        name='Reputable Breeders'
    )
    burial_cremation = Subcategory(
        category_id=8, 
        name='Burial & Cremation'
    )
    photographers = Subcategory(
        category_id=8, 
        name='Pet Photographers'
    )
    insurance = Subcategory(
        category_id=8, 
        name='Pet Insurance'
    )


    db.session.add(bakeries_cafes)
    db.session.add(bars_pubs)
    db.session.add(casual_dining)
    db.session.add(fine_dining)
    db.session.add(fast_food)
    db.session.add(desserts)
    db.session.add(general)
    db.session.add(exotic)
    db.session.add(emergency)
    db.session.add(pet_walking)
    db.session.add(pet_sitting)
    db.session.add(pet_daycare)
    db.session.add(boarding)
    db.session.add(grooming)
    db.session.add(home_improvement)
    db.session.add(pet_stores)
    db.session.add(department_stores)
    db.session.add(accommodations)
    db.session.add(airlines)
    db.session.add(trains)
    db.session.add(dog_parks)
    db.session.add(hiking_trails)
    db.session.add(tours)
    db.session.add(shelters)
    db.session.add(senior_adoption)
    db.session.add(reputable_breeders)
    db.session.add(burial_cremation)
    db.session.add(photographers)
    db.session.add(insurance)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_subcategories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.subcategories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM subcategories"))
        
    db.session.commit()
