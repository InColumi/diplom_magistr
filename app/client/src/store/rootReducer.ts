import { combineReducers } from 'redux'

import { default as testList } from '../store/test/reducers'
import { default as login } from '../containers/Auth/reducer'

export const appReducer = combineReducers({
    testList,
    login,
})
