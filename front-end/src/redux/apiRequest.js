import axios from "axios";
import {loginFailed, loginSuccess, logoutUser} from "./slice/authSlice.js";
import eventEmitter from "../utils/eventEmitter.js";


export const loginUser = async (user, dispatch, navigate) => {
    try {
        const res = await axios.post('http://localhost:7012/login', user);
        if (res.data.code === 1000) {
            dispatch(loginSuccess(res.data));
            eventEmitter.emit('success')
            navigate("/home");
        } else {
            dispatch(loginFailed(res.data));
            eventEmitter.emit('error', res.data.data.message)
        }
    } catch (error) {
        dispatch(loginFailed(error));
        eventEmitter.emit('error', error)
    }
};
export const logout = async (accessToken, dispatch, navigator) => {
    try {
        await axios.post('http://localhost:7012/logout', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch(logoutUser())
        navigator('/dangnhap')
    } catch (e) {
        console.log(e)
    }
}


export const updateUser = async (data, id, accessToken) => {
    try {
        await axios.put(`http://localhost:7012/users/${id}`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

    } catch (e) {
        console.log(e)
    }
}
export const getUserInfo = async (id, accessToken, dispatch) => {
    try {
        const res = await axios.get(`http://localhost:7012/users/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        dispatch(loginSuccess(res.data))
    } catch (error) {
        console.log(error)
    }
}
