import { combineReducers } from 'redux'

import { default as login } from '../containers/Auth/reducer'
import { default as text } from '../containers/Text/reducer'
import { default as books } from '../containers/Library/reducer'
import { default as main } from '../containers/Main/reducer'
import { default as progress } from '../containers/Player/reducer'

export const appReducer = combineReducers({
    login,
    text,
    books,
    main,
    progress,
})
