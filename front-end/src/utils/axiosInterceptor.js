import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {loginAgain} from "../redux/slice/authSlice.js";

export const refreshToken = async () => {
    try {
        const res = await axios.post('http://localhost:7012/refresh',  {
            withCredentials: true,
        });
        console.log(res.data)
        return res.data
    } catch (e) {
        console.log(e)
    }
}

export const createAxios = (user,dispatch)=>{
    const newInstance = axios.create()
    newInstance.interceptors.response.use(async (config) => {
            const decodedToken = jwtDecode(user?.accessToken);
            if (decodedToken.exp < Date.now() / 1000) {
                console.log('het hạn',decodedToken)
                const data = await refreshToken()
                console.log(data)
                dispatch(loginAgain(data.accessToken))
                config.headers['token'] = 'Bearer' + data.accessToken
            }else console.log('chưa hét hoặc giai sai')
            return config
        },
        (err)=>{
            return Promise.reject(err)
        }
    )
    return newInstance
}
