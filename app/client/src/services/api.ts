import axios from 'axios'
import axiosApiInstance from '../helpers/axiosApiInstance'

const baseURL = 'http://26.107.170.245:8000'

export async function getLogin(payload: any) {
    const response = await axios.post(`${baseURL}/sign_in`, payload)

    return response.data
}

export async function getRegister(payload: any) {
    const response = await axios.put(`${baseURL}/sign_up`, payload)

    return response.data
}

export async function getUser() {
    const response = await axiosApiInstance.get(`${baseURL}/user/me`)

    return response.data
}

export async function getRecomendations(payload: any) {
    const response = await axiosApiInstance.post(
        `${baseURL}/get_recommendation?limit=10`,
        payload
    )

    return response.data
}

export async function getTopAuthors(payload: any) {
    const response = await axiosApiInstance.post(
        `${baseURL}/get_top_authors?count=10`,
        payload
    )

    return response.data
}

export async function getBooks(payload: any) {
    const is_favorites = payload?.is_favorites ? payload?.is_favorites : false
    const response = await axiosApiInstance.post(
        `${baseURL}/books?page=${payload.id}&size=${payload.size}&is_favorites=${is_favorites}`,
        payload
    )

    return response.data
}

export async function getText(payload: any) {
    const response = await axiosApiInstance.post(`${baseURL}/get_text`, payload)

    return response.data
}

export async function getLastReaded() {
    const response = await axiosApiInstance.get(`${baseURL}/last_reading`)

    return response.data
}

export async function addToFavourite(payload: any) {
    const response = await axiosApiInstance.post(
        `${baseURL}/change_status_favorite_book`,
        payload
    )

    return response.data
}

export async function saveProgress(payload: any) {
    const response = await axiosApiInstance.post(
        `${baseURL}/save_progress_book`,
        payload
    )

    return response.data
}
