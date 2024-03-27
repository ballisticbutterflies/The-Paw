"""added hour cols to biz

Revision ID: a9081588034a
Revises: bd8e0e4a4e76
Create Date: 2024-03-25 23:37:32.726298

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a9081588034a'
down_revision = 'bd8e0e4a4e76'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('businesses', schema=None) as batch_op:
        batch_op.add_column(sa.Column('set_hours', sa.String(length=3), nullable=False, server_default='True'))
        batch_op.add_column(sa.Column('mon_open', sa.String(length=4), nullable=True))
        batch_op.add_column(sa.Column('mon_close', sa.String(length=4), nullable=True))
        batch_op.add_column(sa.Column('tue_open', sa.String(length=4), nullable=True))
        batch_op.add_column(sa.Column('tue_close', sa.String(length=4), nullable=True))
        batch_op.add_column(sa.Column('wed_open', sa.String(length=4), nullable=True))
        batch_op.add_column(sa.Column('wed_close', sa.String(length=4), nullable=True))
        batch_op.add_column(sa.Column('thu_open', sa.String(length=4), nullable=True))
        batch_op.add_column(sa.Column('thu_close', sa.String(length=4), nullable=True))
        batch_op.add_column(sa.Column('fri_open', sa.String(length=4), nullable=True))
        batch_op.add_column(sa.Column('fri_close', sa.String(length=4), nullable=True))
        batch_op.add_column(sa.Column('sat_open', sa.String(length=4), nullable=True))
        batch_op.add_column(sa.Column('sat_close', sa.String(length=4), nullable=True))
        batch_op.add_column(sa.Column('sun_open', sa.String(length=4), nullable=True))
        batch_op.add_column(sa.Column('sun_close', sa.String(length=4), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('businesses', schema=None) as batch_op:
        batch_op.drop_column('sun_close')
        batch_op.drop_column('sun_open')
        batch_op.drop_column('sat_close')
        batch_op.drop_column('sat_open')
        batch_op.drop_column('fri_close')
        batch_op.drop_column('fri_open')
        batch_op.drop_column('thu_close')
        batch_op.drop_column('thu_open')
        batch_op.drop_column('wed_close')
        batch_op.drop_column('wed_open')
        batch_op.drop_column('tue_close')
        batch_op.drop_column('tue_open')
        batch_op.drop_column('mon_close')
        batch_op.drop_column('mon_open')
        batch_op.drop_column('set_hours')

    # ### end Alembic commands ###
