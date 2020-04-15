"""empty message

Revision ID: 789ebb85e69d
Revises: 75563831cc3a
Create Date: 2020-04-14 10:34:29.950109

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '789ebb85e69d'
down_revision = '75563831cc3a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('actors', sa.Column('image_link', sa.String(length=500), nullable=False))
    op.add_column('movies', sa.Column('image_link', sa.String(length=500), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('movies', 'image_link')
    op.drop_column('actors', 'image_link')
    # ### end Alembic commands ###