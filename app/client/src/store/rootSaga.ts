import { spawn } from 'redux-saga/effects'
import loginSaga from '../containers/Auth/sagas'
import textSaga from '../containers/Text/sagas'

export default function* rootSagas() {
    yield spawn(loginSaga)
    yield spawn(textSaga)
}
