import { createAsyncAction, createAction } from 'typesafe-actions'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_ERROR,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
} from './types'

export const loguotA = createAction(LOGOUT)<undefined>()

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

export const registerUserA = createAsyncAction(
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR
)<any, undefined, Error>()
