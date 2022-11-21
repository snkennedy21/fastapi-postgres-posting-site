"""add content column to post table

Revision ID: 49637fda4676
Revises: d29267b9918e
Create Date: 2022-11-21 13:08:02.344842

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '49637fda4676'
down_revision = 'd29267b9918e'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column("posts", sa.Column("content", sa.String(), nullable=False))


def downgrade() -> None:
    op.drop_column("posts", "content")
