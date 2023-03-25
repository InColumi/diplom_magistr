import { createAsyncAction } from "typesafe-actions";
import {
    TEST_REQUEST,
    TEST_SUCCESS,
    TEST_ERROR,
} from './types'

export const testA = createAsyncAction(
    TEST_REQUEST,
    TEST_SUCCESS,
    TEST_ERROR,
)<undefined, any, Error>()