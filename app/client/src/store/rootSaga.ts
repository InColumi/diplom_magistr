import { spawn } from 'redux-saga/effects';
import testSaga from '../store/test/sagas';

export default function* rootSagas() {
  yield spawn(testSaga)
}