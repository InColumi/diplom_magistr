import { Map } from 'immutable'

export const TestState = (state: RootStateInterface): Map<string, any> => state.testList

export const isFetchingS = (state: RootStateInterface): any => TestState(state).get('isFetching')

export const testListS = (state: RootStateInterface): any => TestState(state).get('testList')