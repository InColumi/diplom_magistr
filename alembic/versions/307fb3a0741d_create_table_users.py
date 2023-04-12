"""Create table users

Revision ID: 307fb3a0741d
Revises:
Create Date: 2023-04-08 16:50:51.577803

"""
from alembic import op
from sqlalchemy import Column, Uuid, Text, Boolean
import uuid


# revision identifiers, used by Alembic.
revision = '933c2eea50fb'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table('users',
                    Column(name='id', type_=Uuid, primary_key=True, default=uuid.uuid4()),
                    Column(name='email', type_=Text, unique=True, ),
                    Column(name='username', type_=Text, unique=True),
                    Column(name='hashed_password', type_=Text, nullable=False),
                    Column(name='is_deleted', type_=Boolean, nullable=False, default=False))

    op.create_check_constraint(constraint_name='check_not_null_username_and_email', table_name='users', condition='username is not null or email is not null')


def downgrade() -> None:
    op.drop_table('users')
    pass
