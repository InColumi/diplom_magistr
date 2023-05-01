import { Map } from 'immutable'

export const TextState = (state: RootStateInterface): Map<string, any> =>
    state.text

export const isFetchingS = (state: RootStateInterface): any =>
    TextState(state).get('isFetching')

export const textS = (state: RootStateInterface): any =>
    TextState(state).get('text')
