import { spawn } from 'redux-saga/effects'
import testSaga from '../store/test/sagas'
import loginSaga from '../containers/Auth/sagas'

export default function* rootSagas() {
    yield spawn(testSaga)
    yield spawn(loginSaga)
}
