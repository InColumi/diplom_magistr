"""Create table cluster

Revision ID: 2407bfb62663
Revises: b3bfdaf286e7
Create Date: 2023-05-01 09:37:37.816423

"""
from alembic import op
from sqlalchemy import Column, Uuid, Text, Integer

# revision identifiers, used by Alembic.
revision = '2407bfb62663'
down_revision = 'b3bfdaf286e7'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table('cluster',
                    Column(name='id', type_=Uuid, primary_key=True),
                    Column(name='id_int', type_=Integer, nullable=False),
                    Column(name='word', type_=Text, nullable=False),
                    Column(name='centroid', type_=Text, nullable=False),
                    Column(name='size', type_=Integer, nullable=False))


def downgrade() -> None:
    op.drop_table('cluster')
