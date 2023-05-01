import { combineReducers } from 'redux'

import { default as login } from '../containers/Auth/reducer'
import { default as text } from '../containers/Text/reducer'

export const appReducer = combineReducers({
    login,
    text,
})
