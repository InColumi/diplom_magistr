import { createAsyncAction } from 'typesafe-actions'
import * as types from './types'

export const saveProgressA = createAsyncAction(
    types.SAVE_PROGRESS_REQUEST,
    types.SAVE_PROGRESS_SUCCESS,
    types.SAVE_PROGRESS_ERROR
)<any, undefined, Error>()
