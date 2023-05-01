"""Added field 'rating' to books

Revision ID: c771b9d55449
Revises: 4c547452f110
Create Date: 2023-05-01 13:59:27.059094

"""
from alembic import op
from sqlalchemy import Integer, Column


# revision identifiers, used by Alembic.
revision = 'c771b9d55449'
down_revision = '4c547452f110'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(table_name='books',
                  column=Column(name='rating', type_=Integer, nullable=False, server_default=str(0)))


def downgrade() -> None:
    op.drop_column(table_name='books', column_name='rating')
