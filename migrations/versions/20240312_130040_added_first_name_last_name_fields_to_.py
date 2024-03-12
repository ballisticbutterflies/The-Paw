"""Added first_name, last_name, fields to user model, removed username

Revision ID: 8da042020b37
Revises: ffdc0a98111c
Create Date: 2024-03-12 13:00:40.806710

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8da042020b37'
down_revision = 'ffdc0a98111c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('first_name', sa.String(length=255), server_default="true", nullable=False))
        batch_op.add_column(sa.Column('last_name', sa.String(length=255), server_default="true", nullable=False))
        batch_op.drop_column('username')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('username', sa.VARCHAR(length=40), nullable=False))
        batch_op.drop_column('last_name')
        batch_op.drop_column('first_name')

    # ### end Alembic commands ###