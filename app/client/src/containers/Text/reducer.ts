import { ActionType, getType } from 'typesafe-actions'
import { Map } from 'immutable'
import { getTextA } from './actions'

type BookState = any

const INITIAL_STATE = Map<BookState>({
    isFetching: false,
    error: null,
    text: null,
})

export function reducer(
    state = INITIAL_STATE,
    action: ActionType<typeof getTextA>
): typeof INITIAL_STATE {
    switch (action.type) {
        case getType(getTextA.request): {
            return state.set('isFetching', true)
        }
        case getType(getTextA.success): {
            return state.set('text', action.payload).set('isFetching', false)
        }
        case getType(getTextA.failure): {
            return state.set('error', true)
        }
        default:
            return state
    }
}

export default reducer
