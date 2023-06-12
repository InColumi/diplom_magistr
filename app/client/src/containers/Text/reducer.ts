import { ActionType, getType } from 'typesafe-actions'
import { Map } from 'immutable'
import { getTextA } from './actions'

type TextState = any

const INITIAL_STATE = Map<TextState>({
    isFetching: false,
    error: null,
    text: null,
    textInfo: {
        authors: [],
        current_page: 0,
        title: '*****',
        total_pages: 0,
    },
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
            return state
                .set('text', action.payload.text)
                .set('textInfo', action.payload.rest)
                .set('isFetching', false)
        }
        case getType(getTextA.failure): {
            return state.set('error', true)
        }
        default:
            return state
    }
}

export default reducer
