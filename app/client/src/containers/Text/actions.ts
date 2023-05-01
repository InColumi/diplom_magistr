import { createAsyncAction } from 'typesafe-actions'
import * as types from './types'

export const getTextA = createAsyncAction(
    types.GET_BOOK_REQUEST,
    types.GET_BOOK_SUCCESS,
    types.GET_BOOK_ERROR
)<any, any, Error>()
