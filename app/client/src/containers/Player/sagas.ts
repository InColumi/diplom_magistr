import { takeEvery, call, put } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import { SagaIterator } from 'redux-saga'
import { saveProgressA } from './actions'
import { saveProgress } from '../../services/api'

function* saveProgressS(
    action: ActionType<typeof saveProgressA.request>
): SagaIterator {
    try {
        yield call(saveProgress, action.payload.data)
        yield call(action.payload.callback)
        yield put(saveProgressA.success())
    } catch (error) {
        yield put(saveProgressA.failure(error as Error))
    }
}

export default function* loginSagaWatcher(): SagaIterator {
    yield takeEvery(saveProgressA.request, saveProgressS)
}
