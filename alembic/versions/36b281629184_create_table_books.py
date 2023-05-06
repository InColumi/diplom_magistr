"""Create table books

Revision ID: 36b281629184
Revises: 933c2eea50fb
Create Date: 2023-04-23 19:31:52.451344

"""
from alembic import op
from sqlalchemy import Column, Uuid, Integer, Date


# revision identifiers, used by Alembic.
revision = '36b281629184'
down_revision = '933c2eea50fb'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table('books',
                    Column(name='id', type_=Uuid, primary_key=True),
                    Column(name='int_id', type_=Integer, nullable=False),
                    Column(name='dateissued', type_=Date, nullable=False))


def downgrade() -> None:
    op.drop_table('books')
    pass
