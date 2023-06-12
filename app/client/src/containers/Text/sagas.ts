import { takeEvery, call, put } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import { SagaIterator } from 'redux-saga'
import { getTextA } from './actions'
import { getText } from '../../services/api'

function* getTextS(action: ActionType<typeof getTextA.request>): SagaIterator {
    try {
        const payload = yield call(getText, action.payload)
        const { pages, ...rest } = payload
        yield put(getTextA.success({ text: JSON.stringify(pages), rest }))
    } catch (error) {
        yield put(getTextA.failure(error as Error))
    }
}

export default function* loginSagaWatcher(): SagaIterator {
    yield takeEvery(getTextA.request, getTextS)
}
