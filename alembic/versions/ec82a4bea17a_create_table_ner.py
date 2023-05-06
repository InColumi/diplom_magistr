"""Create table ner

Revision ID: ec82a4bea17a
Revises: 2407bfb62663
Create Date: 2023-05-01 09:39:59.617291

"""
from alembic import op
from sqlalchemy import Column, Uuid, Integer

# revision identifiers, used by Alembic.
revision = 'ec82a4bea17a'
down_revision = '2407bfb62663'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table('ner',
                    Column(name='id', type_=Uuid, primary_key=True),
                    Column(name='id_int', type_=Integer, nullable=False),
                    Column(name='ref_context_id', type_=Uuid, nullable=False),
                    Column(name='start', type_=Integer, nullable=False),
                    Column(name='end', type_=Integer, nullable=False))


def downgrade() -> None:
    op.drop_table('ner')
