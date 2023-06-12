import { takeEvery, call, put } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import { SagaIterator } from 'redux-saga'
import { loginA, getUserA, registerUserA } from './actions'
import { getUser, getLogin, getRegister } from '../../services/api'

function* getUserS(action: ActionType<typeof getUserA.request>): SagaIterator {
    try {
        const payload = yield call(getUser)
        const { username } = payload
        yield put(getUserA.success(username))
    } catch (error) {
        yield put(getUserA.failure(error as Error))
    }
}

function* loginS(action: ActionType<typeof loginA.request>): SagaIterator {
    try {
        const payload = yield call(getLogin, action.payload.data)
        yield call(setToStorage, payload)
        yield put(loginA.success())
    } catch (error) {
        yield put(loginA.failure(error as Error))
    }
}

function* registerS(
    action: ActionType<typeof registerUserA.request>
): SagaIterator {
    try {
        yield call(getRegister, action.payload.data)
        yield put(registerUserA.success())
        yield call(action.payload.callback)
    } catch (error) {
        yield put(registerUserA.failure(error as Error))
    }
}

export default function* loginSagaWatcher(): SagaIterator {
    yield takeEvery(loginA.request, loginS)
    yield takeEvery(registerUserA.request, registerS)
    yield takeEvery(getUserA.request, getUserS)
}

function setToStorage(payload: {
    access_token: string
    refresh_token: string
    user: string
}) {
    localStorage.setItem('access_token', payload.access_token)
    localStorage.setItem('refresh_token', payload.refresh_token)
    localStorage.setItem('user', payload.user)
}
