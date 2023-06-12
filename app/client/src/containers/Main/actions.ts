import { createAsyncAction } from 'typesafe-actions'
import * as types from './types'

export const getRecomendationsA = createAsyncAction(
    types.GET_RECOMENDATIONS_REQUEST,
    types.GET_RECOMENDATIONS_SUCCESS,
    types.GET_RECOMENDATIONS_ERROR
)<any, any, Error>()

export const getTopAuthorsA = createAsyncAction(
    types.GET_TOP_AUTHORS_REQUEST,
    types.GET_TOP_AUTHORS_SUCCESS,
    types.GET_TOP_AUTHORS_ERROR
)<any, any, Error>()

export const getLastReadedA = createAsyncAction(
    types.GET_LAST_READED_BOOK_REQUEST,
    types.GET_LAST_READED_BOOK_SUCCESS,
    types.GET_LAST_READED_BOOK_ERROR
)<undefined, any, Error>()
