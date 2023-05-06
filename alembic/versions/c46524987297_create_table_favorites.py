"""Create table favorites

Revision ID: c46524987297
Revises: 36b281629184
Create Date: 2023-04-23 19:31:58.130758

"""
from alembic import op
from sqlalchemy import Column, Uuid


# revision identifiers, used by Alembic.
revision = 'c46524987297'
down_revision = '36b281629184'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table('favorites',
                    Column(name='ref_users', type_=Uuid, nullable=False),
                    Column(name='ref_books', type_=Uuid, nullable=False))

    op.create_foreign_key('fk_favorites_users', source_table='favorites', referent_table='users', local_cols=['ref_users'], remote_cols=['id'])

    op.create_foreign_key(constraint_name='fk_favorites_books', source_table='favorites', referent_table='books', local_cols=['ref_books'], remote_cols=['id'])

    op.create_unique_constraint(constraint_name='uq_ref_users_ref_books', table_name='favorites', columns=['ref_users', 'ref_books'])


def downgrade() -> None:
    op.drop_table('favorites')
