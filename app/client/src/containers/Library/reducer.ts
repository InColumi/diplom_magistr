import { ActionType, getType } from 'typesafe-actions'
import { Map } from 'immutable'
import { getBooksListA, addToFavouriteA } from './actions'

type BooksState = any

const INITIAL_STATE = Map<BooksState>({
    isFetching: false,
    isFetchingLike: false,
    error: null,
    books: [],
    totalPages: 0,
})

export function reducer(
    state = INITIAL_STATE,
    action: ActionType<typeof getBooksListA | typeof addToFavouriteA>
): typeof INITIAL_STATE {
    switch (action.type) {
        case getType(getBooksListA.request): {
            return state.set('isFetching', true)
        }
        case getType(getBooksListA.success): {
            return state
                .set('books', action.payload.items)
                .set('totalPages', action.payload.pages)
                .set('isFetching', false)
        }
        case getType(getBooksListA.failure): {
            return state.set('error', true)
        }
        case getType(addToFavouriteA.request): {
            return state.set('isFetchingLike', true)
        }
        case getType(addToFavouriteA.success): {
            return state.set('isFetchingLike', false)
        }
        case getType(addToFavouriteA.failure): {
            return state.set('error', true)
        }
        default:
            return state
    }
}

export default reducer
