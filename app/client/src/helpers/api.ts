import axios from 'axios'

const api = axios.create({
    baseURL: 'http://26.107.170.245:8000',
})

api.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem('access_token')

        config.headers.Authorization = `Bearer ${accessToken}`

        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            const refreshToken = localStorage.getItem('refresh_token')
            try {
                const { data } = await axios.post(
                    'http://26.107.170.245:8000/refresh_token',
                    {
                        refresh_token: refreshToken,
                    }
                )

                localStorage.setItem('access_token', data.access_token)

                return api(originalRequest)
            } catch (error) {
                localStorage.clear()
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    }
)

export default api
