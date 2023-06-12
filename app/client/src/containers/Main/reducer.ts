import { ActionType, getType } from 'typesafe-actions'
import { Map } from 'immutable'
import { getRecomendationsA, getTopAuthorsA, getLastReadedA } from './actions'

type MainState = any

const INITIAL_STATE = Map<MainState>({
    isFetching: false,
    error: null,
    topAuthors: [],
    recomendations: [],
    lastBook: {
        current_page: '1',
        current_second: '',
        total_pages: '',
        int_id: '',
    },
    lastBookText: '',
})

export function reducer(
    state = INITIAL_STATE,
    action: ActionType<
        | typeof getRecomendationsA
        | typeof getTopAuthorsA
        | typeof getLastReadedA
    >
): typeof INITIAL_STATE {
    switch (action.type) {
        case getType(getRecomendationsA.request): {
            return state.set('isFetching', true)
        }
        case getType(getRecomendationsA.success): {
            return state
                .set('recomendations', action.payload)
                .set('isFetching', false)
        }
        case getType(getRecomendationsA.failure): {
            return state.set('error', true).set('isFetching', false)
        }
        case getType(getTopAuthorsA.request): {
            return state.set('isFetching', true)
        }
        case getType(getTopAuthorsA.success): {
            return state
                .set('isFetching', false)
                .set('topAuthors', action.payload)
        }
        case getType(getTopAuthorsA.failure): {
            return state.set('error', true).set('isFetching', false)
        }
        case getType(getLastReadedA.request): {
            return state.set('isFetching', true)
        }
        case getType(getLastReadedA.success): {
            return state
                .set('isFetching', false)
                .set('lastBook', action.payload.rest)
                .set('lastBookText', JSON.stringify(action.payload.text))
        }
        case getType(getLastReadedA.failure): {
            return state.set('error', true).set('isFetching', false)
        }
        default:
            return state
    }
}

export default reducer
