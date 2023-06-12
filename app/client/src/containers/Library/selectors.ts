import { Map } from 'immutable'

export const BooksState = (state: RootStateInterface): Map<string, any> =>
    state.books

export const isFetchingS = (state: RootStateInterface): any =>
    BooksState(state).get('isFetching')

export const booksS = (state: RootStateInterface): any =>
    BooksState(state).get('books')

export const totalPagesS = (state: RootStateInterface): any =>
    BooksState(state).get('totalPages')
