"""add created_at and updated_at on image table

Revision ID: 35f36968f56f
Revises: 0a4a99c585d5
Create Date: 2024-03-21 11:15:57.008712

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '35f36968f56f'
down_revision = '0a4a99c585d5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('images', schema=None) as batch_op:
        batch_op.add_column(sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('(CURRENT_TIMESTAMP)'), nullable=True))
        batch_op.add_column(sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('images', schema=None) as batch_op:
        batch_op.drop_column('updated_at')
        batch_op.drop_column('created_at')

    # ### end Alembic commands ###
