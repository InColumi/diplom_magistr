import { spawn } from 'redux-saga/effects'
import loginSaga from '../containers/Auth/sagas'
import textSaga from '../containers/Text/sagas'
import booksSaga from '../containers/Library/sagas'
import mainSaga from '../containers/Main/sagas'
import progressSaga from '../containers/Player/sagas'

export default function* rootSagas() {
    yield spawn(loginSaga)
    yield spawn(textSaga)
    yield spawn(booksSaga)
    yield spawn(mainSaga)
    yield spawn(progressSaga)
}
