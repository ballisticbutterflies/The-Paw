from flask.cli import AppGroup
from .aa_users import seed_users, undo_users
from .businesses import seed_businesses, undo_businesses
from .reviews import seed_reviews, undo_reviews
from .images import seed_images, undo_images


from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_images()
        undo_reviews()
        undo_businesses()
        undo_users()
    print('######### users 1')
    seed_users()
    print('######### businesses 2')
    seed_businesses()
    print('######### reviews 3')
    seed_reviews()
    print('######### images 4')
    seed_images()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_images()
    undo_reviews()
    undo_businesses()
    undo_users()
    # Add other undo functions here
