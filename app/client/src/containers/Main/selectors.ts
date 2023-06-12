import { Map } from 'immutable'

export const MainState = (state: RootStateInterface): Map<string, any> =>
    state.main

export const isFetchingS = (state: RootStateInterface): any =>
    MainState(state).get('isFetching')

export const topAuthorsS = (state: RootStateInterface): any =>
    MainState(state).get('topAuthors')

export const recomendationsS = (state: RootStateInterface): any =>
    MainState(state).get('recomendations')

export const lastBookS = (state: RootStateInterface): any =>
    MainState(state).get('lastBook')

export const lastBookTextS = (state: RootStateInterface): any =>
    MainState(state).get('lastBookText')
