"""Create table context

Revision ID: b3bfdaf286e7
Revises: c46524987297
Create Date: 2023-05-01 09:33:40.161570

"""
from alembic import op
from sqlalchemy import Column, Uuid, Text, Integer

# revision identifiers, used by Alembic.
revision = 'b3bfdaf286e7'
down_revision = 'c46524987297'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table('context',
                    Column(name='id', type_=Uuid, primary_key=True),
                    Column(name='id_int', type_=Integer, nullable=False),
                    Column(name='context', type_=Text, nullable=False),
                    Column(name='start', type_=Integer, nullable=False),
                    Column(name='end', type_=Integer, nullable=False))


def downgrade() -> None:
    op.drop_table('context')
