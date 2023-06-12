import { takeEvery, call, put, delay } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import { SagaIterator } from 'redux-saga'
import { getBooksListA, addToFavouriteA } from './actions'
import { getBooks, addToFavourite } from '../../services/api'

function* getBooksListS(
    action: ActionType<typeof getBooksListA.request>
): SagaIterator {
    try {
        const payload = yield call(getBooks, action.payload)
        yield delay(250)
        yield put(getBooksListA.success(payload))
    } catch (error) {
        yield put(getBooksListA.failure(error as Error))
    }
}

function* addToFavouriteS(
    action: ActionType<typeof addToFavouriteA.request>
): SagaIterator {
    try {
        yield call(addToFavourite, action.payload.data)
        yield put(addToFavouriteA.success())
        yield call(action.payload.callback)
    } catch (error) {
        yield put(addToFavouriteA.failure(error as Error))
    }
}

export default function* librarySagaWatcher(): SagaIterator {
    yield takeEvery(getBooksListA.request, getBooksListS)
    yield takeEvery(addToFavouriteA.request, addToFavouriteS)
}
