"""Initial migration - Books and Categories tables

Revision ID: 1f13338def4e
Revises: 
Create Date: 2024-11-16 14:10:52.147719

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1f13338def4e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('books',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('isOffer', sa.Boolean(), nullable=True),
    sa.Column('stock', sa.Integer(), nullable=False),
    sa.Column('imageUrl', sa.String(length=255), nullable=True),
    sa.Column('isNew', sa.Boolean(), nullable=True),
    sa.Column('author', sa.String(length=255), nullable=False),
    sa.Column('categoryId', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['categoryId'], ['categories.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('books')
    op.drop_table('categories')
    # ### end Alembic commands ###
