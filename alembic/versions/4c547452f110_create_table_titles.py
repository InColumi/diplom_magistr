"""Create table titles

Revision ID: 4c547452f110
Revises: ec82a4bea17a
Create Date: 2023-05-01 13:03:01.562927

"""
from alembic import op
from sqlalchemy import Column, Uuid, Integer, Text
import uuid

# revision identifiers, used by Alembic.
revision = '4c547452f110'
down_revision = 'ec82a4bea17a'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table('titles',
                    Column(name='id', type_=Uuid, primary_key=True, default=uuid.uuid4()),
                    Column(name='name', type_=Text, nullable=False),
                    Column(name='int_id', type_=Integer, nullable=False))


def downgrade() -> None:
    op.drop_table('titles')
