import { ActionType, getType } from 'typesafe-actions';
import { Map } from 'immutable';
import {
    testA
} from './actions'

type TestState = any

const INITIAL_STATE = Map<TestState>({
 isFetching: false,
 testList: [],
})

export function reducer (
  state = INITIAL_STATE,
  action: ActionType<
  typeof testA
  >): typeof INITIAL_STATE {
    switch (action.type) {
      case getType(testA.request): {
        return state
          .set('isFetching', true)
      }
      case getType(testA.success): {
        return state
          .set('testList', action.payload)
          .set('isFetching', false)
      }
      case getType(testA.failure): {
        return state
          .set('isFetching', false)
          .set('error', true)
      }
      default:
        return state
    }
  }

export default reducer