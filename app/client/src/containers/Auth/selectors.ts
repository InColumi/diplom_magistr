import { Map } from 'immutable'

export const AuthState = (state: RootStateInterface): Map<string, any> =>
    state.login

export const isFetchingS = (state: RootStateInterface): any =>
    AuthState(state).get('isFetching')

export const isAuthS = (state: RootStateInterface): any =>
    AuthState(state).get('isAuth')

export const userS = (state: RootStateInterface): any =>
    AuthState(state).get('user')
