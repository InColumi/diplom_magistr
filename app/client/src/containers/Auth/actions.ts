import { createAsyncAction } from 'typesafe-actions'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
} from './types'

export const loginA = createAsyncAction(
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
)<any, undefined, Error>()

export const getUserA = createAsyncAction(
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR
)<undefined, any, Error>()
