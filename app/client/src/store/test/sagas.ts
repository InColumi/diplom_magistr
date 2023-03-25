/* eslint-disable import/no-anonymous-default-export */
import { takeEvery, call, put } from 'redux-saga/effects';
import { ActionType } from 'typesafe-actions';
import { SagaIterator } from 'redux-saga';
import axios from "axios";
import {
    testA
} from './actions'

function fetchData() {
    return axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/users"
    });
  }

function* testS(action: ActionType<typeof testA.request>): SagaIterator {
  try {
    const payload = yield call(fetchData)
    console.log(payload.data);
    yield put(testA.success(payload.data))
  } catch (error) {
    yield put(testA.failure(error as Error))
  }
}

export default function* (): SagaIterator {
  yield takeEvery(testA.request, testS)
}