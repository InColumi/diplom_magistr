import axios from 'axios'
import axiosApiInstance from '../helpers/axiosApiInstance'

export async function getLogin(payload: any) {
    const response = await axios.post(
        'http://26.107.170.245:8000/sign_in',
        payload
    )

    return response.data
}

export async function getRegister(payload: any) {
    const response = await axios.put(
        'http://26.107.170.245:8000/sign_up',
        payload
    )

    return response.data
}

export async function getUser() {
    const response = await axiosApiInstance.get(
        'http://26.107.170.245:8000/user/me'
    )

    return response.data
}

export async function getBook(payload: any) {
    const response = await axiosApiInstance.post(
        'http://26.107.170.245:8000/books',
        payload
    )

    return response.data
}
