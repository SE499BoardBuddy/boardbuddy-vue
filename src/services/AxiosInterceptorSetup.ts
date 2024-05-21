import apiClient from "@/services/AxiosClient";

apiClient.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem('access_token')
        // console.log('token', token)
        if (token) {
            request.headers['x-access-token'] = token
            // console.log(request)
        }
        return request
    },
    (error) => {
        return Promise.reject(error)
    }
)