import { Map } from 'immutable'

export const ProgressState = (state: RootStateInterface): Map<string, any> =>
    state.progress

export const isFetchingS = (state: RootStateInterface): any =>
    ProgressState(state).get('isFetching')
