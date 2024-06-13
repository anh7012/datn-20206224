import axios from "axios";
import {APIConfig} from "./APIConfig.js";

let token;

if (typeof window !== 'undefined') {
    // Chạy trên client-side
    const storedToken = window.localStorage.getItem('access_token');
    token = storedToken ? JSON.parse(storedToken) : null;
} else {
    // Chạy trên server-side
    token = 'ssr';
}

export const api = axios.create({
    baseURL: APIConfig.base,
    headers: {
        'x-access-token': token || 'ssr',
        'Authorization': token
    }
})

api.interceptors.request.use(
    (config) => {
        // Thêm token vào headers nếu cần thiết

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Các thao tác khác trước khi gửi request
        return config;
    },
    (error) => {
        // Xử lý lỗi trước khi request được gửi đi
        return Promise.reject(error);
    }
);
// api.interceptors.response.use(function (response) {
//     return response.data
// }, function (error) {
//     const status = error?.response?.status
//     switch (status) {
//         case config.httpCode.TOKEN_EXPIRED:
//             logout()
//             break
//         default:
//             break
//     }
//     return Promise.reject(error)
// })