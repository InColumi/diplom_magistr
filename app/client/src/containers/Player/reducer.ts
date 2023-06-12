import { ActionType, getType } from 'typesafe-actions'
import { Map } from 'immutable'
import { saveProgressA } from './actions'

type ProgressState = any

const INITIAL_STATE = Map<ProgressState>({
    isFetching: false,
    error: null,
})

export function reducer(
    state = INITIAL_STATE,
    action: ActionType<typeof saveProgressA>
): typeof INITIAL_STATE {
    switch (action.type) {
        case getType(saveProgressA.request): {
            return state.set('isFetching', true).set('error', false)
        }
        case getType(saveProgressA.success): {
            return state.set('isFetching', false).set('error', false)
        }
        case getType(saveProgressA.failure): {
            return state.set('error', true).set('isFetching', false)
        }
        default:
            return state
    }
}

export default reducer
