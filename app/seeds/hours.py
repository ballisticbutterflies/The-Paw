from app.models import db, Hour, environment, SCHEMA
from sqlalchemy.sql import text

def seed_hours():
    petagogy_hours = Hour(
        business_id=1,
        m_open='1000',
        m_close='2000',
        tu_open='1000',
        tu_close='2000',
        w_open='1000',
        w_close='2000',
        th_open='1000',
        th_close='2000',
        f_open='1000',
        f_close='2000',
        sa_open='1000',
        sa_close='2000',
        su_open='1100',
        su_close='1600',
    )

    db.session.add(petagogy_hours)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_hours():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.hours RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM hours"))
        
    db.session.commit()
