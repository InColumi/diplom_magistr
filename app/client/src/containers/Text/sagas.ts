import { takeEvery, call, put } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import { SagaIterator } from 'redux-saga'
import { getTextA } from './actions'
import { getBook } from '../../services/api'

function* getTextS(action: ActionType<typeof getTextA.request>): SagaIterator {
    try {
        const payload = yield call(getBook, action.payload)
        // const { text } = payload
        yield put(getTextA.success(JSON.stringify(payload)))
    } catch (error) {
        yield put(getTextA.failure(error as Error))
    }
}

export default function* loginSagaWatcher(): SagaIterator {
    yield takeEvery(getTextA.request, getTextS)
}
