import { takeEvery, call, put, delay } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import { SagaIterator } from 'redux-saga'
import { getRecomendationsA, getTopAuthorsA, getLastReadedA } from './actions'
import {
    getRecomendations,
    getTopAuthors,
    getLastReaded,
} from '../../services/api'

function* getRecomendationsS(
    action: ActionType<typeof getRecomendationsA.request>
): SagaIterator {
    try {
        const payload = yield call(getRecomendations, action.payload)
        yield delay(250)
        yield put(getRecomendationsA.success(payload))
    } catch (error) {
        yield put(getRecomendationsA.failure(error as Error))
    }
}

function* getTopAuthorsS(
    action: ActionType<typeof getTopAuthorsA.request>
): SagaIterator {
    try {
        const payload = yield call(getTopAuthors, action.payload)
        // yield delay(250)
        yield put(getTopAuthorsA.success(payload))
    } catch (error) {
        yield put(getTopAuthorsA.failure(error as Error))
    }
}

function* getLastReadedS(
    action: ActionType<typeof getLastReadedA.request>
): SagaIterator {
    try {
        const payload = yield call(getLastReaded)
        yield delay(250)
        const { text, ...rest } = payload
        yield put(getLastReadedA.success({ text, rest }))
    } catch (error) {
        yield put(getLastReadedA.failure(error as Error))
    }
}

export default function* loginSagaWatcher(): SagaIterator {
    yield takeEvery(getRecomendationsA.request, getRecomendationsS)
    yield takeEvery(getTopAuthorsA.request, getTopAuthorsS)
    yield takeEvery(getLastReadedA.request, getLastReadedS)
}
