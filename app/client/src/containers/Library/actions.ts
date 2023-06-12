import { createAsyncAction } from 'typesafe-actions'
import * as types from './types'

export const getBooksListA = createAsyncAction(
    types.GET_BOOKS_LIST_REQUEST,
    types.GET_BOOKS_LIST_SUCCESS,
    types.GET_BOOKS_LIST_ERROR
)<any, any, Error>()

export const addToFavouriteA = createAsyncAction(
    types.ADD_TO_FAVOURITE_REQUEST,
    types.ADD_TO_FAVOURITE_SUCCESS,
    types.ADD_TO_FAVOURITE_ERROR
)<any, undefined, Error>()
