import { takeEvery, call, put } from 'redux-saga/effects'
import { ActionType } from 'typesafe-actions'
import { SagaIterator } from 'redux-saga'
import { loginA, getUserA } from './actions'
import axios from 'axios'
import api from '../../helpers/api'

async function getLogin(payload: any) {
    const response = await axios.post(
        'http://26.107.170.245:8000/sign_in',
        payload
    )

    return response.data
}

async function getUser() {
    const response = await api.get('http://26.107.170.245:8000/user/me')

    return response.data
}

function* getUserS(action: ActionType<typeof getUserA.request>): SagaIterator {
    try {
        const payload = yield call(getUser)
        console.log(payload)
        const { username } = payload
        yield put(getUserA.success(username))
    } catch (error) {
        yield put(getUserA.failure(error as Error))
    }
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

function* loginS(action: ActionType<typeof loginA.request>): SagaIterator {
    try {
        const payload = yield call(getLogin, action.payload)
        yield put(loginA.success())
        // const { access_token, refresh_token, user } = payload
        yield call(setToStorage, payload)
        // yield call(action.payload.callback)
    } catch (error) {
        yield put(loginA.failure(error as Error))
    }
}

export default function* loginSagaWatcher(): SagaIterator {
    yield takeEvery(loginA.request, loginS)
    yield takeEvery(getUserA.request, getUserS)
}
