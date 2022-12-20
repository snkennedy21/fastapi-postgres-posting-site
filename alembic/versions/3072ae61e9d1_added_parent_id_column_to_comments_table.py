"""added parent_id column to comments table

Revision ID: 3072ae61e9d1
Revises: 98212441d29f
Create Date: 2022-12-19 12:32:15.353262

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3072ae61e9d1'
down_revision = '98212441d29f'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('comments', sa.Column('parent_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'comments', 'comments', ['parent_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'comments', type_='foreignkey')
    op.drop_column('comments', 'parent_id')
    # ### end Alembic commands ###