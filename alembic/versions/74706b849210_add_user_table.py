"""add user table

Revision ID: 74706b849210
Revises: 49637fda4676
Create Date: 2022-11-21 13:22:25.811137

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '74706b849210'
down_revision = '49637fda4676'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table("users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("password", sa.String(), nullable=False),
        sa.Column("created_at", sa.TIMESTAMP(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint("email")
    )


def downgrade() -> None:
    op.drop_table("users")
