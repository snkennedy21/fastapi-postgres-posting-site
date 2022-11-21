"""create posts table

Revision ID: d29267b9918e
Revises: 
Create Date: 2022-11-21 12:59:22.198304

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd29267b9918e'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table("posts", sa.Column('id', sa.Integer(), nullable=False, primary_key=True),
    sa.Column("title", sa.String(), nullable=False))

def downgrade() -> None:
    op.drop_table("posts")
