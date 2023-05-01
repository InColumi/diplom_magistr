import { ActionType, getType } from 'typesafe-actions'
import { Map } from 'immutable'
import { loginA, getUserA, registerUserA, loguotA } from './actions'

type LoginState = any

const INITIAL_STATE = Map<LoginState>({
    isFetching: false,
    isAuth: false,
    error: null,
    user: null,
})

export function reducer(
    state = INITIAL_STATE,
    action: ActionType<
        typeof loginA | typeof getUserA | typeof registerUserA | typeof loguotA
    >
): typeof INITIAL_STATE {
    switch (action.type) {
        case getType(loguotA): {
            localStorage.clear()
            return state.set('isAuth', false)
        }
        case getType(loginA.request): {
            return state.set('isFetching', true)
        }
        case getType(loginA.success): {
            return state.set('isAuth', true).set('isFetching', false)
        }
        case getType(loginA.failure): {
            return state.set('error', true)
        }
        case getType(getUserA.request): {
            return state.set('isFetching', true)
        }
        case getType(getUserA.success): {
            return state.set('user', action.payload).set('isFetching', false)
        }
        case getType(getUserA.failure): {
            return state.set('error', true)
        }
        case getType(registerUserA.request): {
            return state.set('isFetching', true)
        }
        case getType(registerUserA.success): {
            return state.set('isFetching', false)
        }
        case getType(registerUserA.failure): {
            return state.set('error', true)
        }
        default:
            return state
    }
}

export default reducer
