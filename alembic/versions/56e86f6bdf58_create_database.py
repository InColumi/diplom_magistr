"""Create Database

Revision ID: 56e86f6bdf58
Revises: 6cb1b5445131
Create Date: 2023-05-13 16:52:45.531366

"""
from alembic import op
import uuid
from sqlalchemy import Column, Uuid, Integer, Date, Numeric,\
                        Text, Boolean
from datetime import datetime


# revision identifiers, used by Alembic.
revision = '56e86f6bdf58'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table('books',
                    Column(name='id', type_=Uuid, primary_key=True),
                    Column(name='int_id', type_=Integer, nullable=False),
                    Column(name='dateissued', type_=Date, nullable=False),
                    Column(name='bookshelves_id', type_=Integer, nullable=False),
                    Column(name='rating_avg', type_=Numeric, nullable=False),
                    Column(name='total_pages', type_=Integer, nullable=False),
                    Column(name='rating_quantity', type_=Integer, nullable=False))

    op.create_table('users',
                    Column(name='id', type_=Uuid, primary_key=True, default=uuid.uuid4()),
                    Column(name='email', type_=Text, unique=True, nullable=False),
                    Column(name='username', type_=Text, unique=True, nullable=False),
                    Column(name='hashed_password', type_=Text, nullable=False),
                    Column(name='is_deleted', type_=Boolean, nullable=False, default=False))

    op.create_check_constraint(constraint_name='check_not_null_username_and_email', table_name='users', condition='username is not null or email is not null')

    op.create_table('favorites',
                    Column(name='ref_users', type_=Uuid, nullable=False),
                    Column(name='ref_books', type_=Uuid, nullable=False))

    op.create_foreign_key('fk_favorites_users', source_table='favorites', referent_table='users', local_cols=['ref_users'], remote_cols=['id'])
    op.create_foreign_key(constraint_name='fk_favorites_books', source_table='favorites', referent_table='books', local_cols=['ref_books'], remote_cols=['id'])
    op.create_unique_constraint(constraint_name='uq_ref_users_ref_books', table_name='favorites', columns=['ref_users', 'ref_books'])

    op.create_table('titles',
                    Column(name='id', type_=Uuid, primary_key=True, default=uuid.uuid4()),
                    Column(name='name', type_=Text, nullable=False),
                    Column(name='int_id', type_=Integer, nullable=False))

    op.create_table('authors',
                    Column(name='id', type_=Uuid, primary_key=True, default=uuid.uuid4()),
                    Column(name='name', type_=Text, nullable=False),
                    Column(name='int_id', type_=Integer, nullable=False))

    op.create_table('book_authors',
                    Column(name='ref_book_id', type_=Uuid, nullable=False),
                    Column(name='ref_authors_id', type_=Uuid, nullable=False))

    op.create_foreign_key('fk_book_authors_book', source_table='book_authors', referent_table='books', local_cols=['ref_book_id'], remote_cols=['id'])
    op.create_foreign_key(constraint_name='fk_book_authors_authorsk', source_table='book_authors', referent_table='authors', local_cols=['ref_authors_id'], remote_cols=['id'])
    op.create_unique_constraint(constraint_name='uq_ref_book_id_ref_authors_id', table_name='book_authors', columns=['ref_book_id', 'ref_authors_id'])

    op.create_table('book_users',
                    Column(name='ref_books', type_=Uuid, nullable=False, primary_key=True),
                    Column(name='ref_users', type_=Uuid, nullable=False, primary_key=True),
                    Column(name='current_page', type_=Integer, nullable=False),
                    Column(name='evaluation', type_=Integer, nullable=True),
                    Column(name='data_edit', type_=Date, nullable=False, default=datetime.now()),
                    Column(name='current_second', type_=Integer, nullable=False))

    op.create_foreign_key('fk_book_users_books', source_table='book_users', referent_table='books', local_cols=['ref_books'], remote_cols=['id'])
    op.create_foreign_key(constraint_name='fk_book_users_users', source_table='book_users', referent_table='users', local_cols=['ref_users'], remote_cols=['id'])


def downgrade() -> None:
    op.drop_table('book_users')
    op.drop_table('favorites')
    op.drop_table('book_authors')
    op.drop_table('titles')
    op.drop_table('users')
    op.drop_table('books')
    op.drop_table('authors')
