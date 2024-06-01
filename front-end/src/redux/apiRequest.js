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
export const logout = async (accessToken, dispatch, navigator, axiosInstance) => {
    try {
        await axiosInstance.post('http://localhost:7012/logout', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch(logoutUser());
        navigator('/dangnhap');
    } catch (e) {
        console.log('>>', e);
    }
}
export const updateUser = async (data, id, accessToken) => {
    try {
        await axios.put(`http://localhost:7012/users/${id}/updateUser`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

    } catch (e) {
        console.log(e)
    }
}
export const createUser = async (data, accessToken) => {
    try {
     const res =  await axios.post(`http://localhost:7012/users/createUser`, data, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
    if (!res.data.user) {
        eventEmitter.emit('errorCreateUser', res.data.message)
    } else eventEmitter.emit('successcreateUser')

    } catch (e) {
        console.log(e)
    }
}
export const getUserInfo = async (id, accessToken, dispatch) => {
    try {
        const res = await axios.get(`http://localhost:7012/users/${id}/getUser`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        dispatch(loginSuccess(res.data))
    } catch (error) {
        console.log(error)
    }
}
export const listUser = async (accessToken) => {
    try {
      const res =  await axios.get('http://localhost:7012/users/listUser', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    }
    catch (e) {
        console.log(e)
    }
}
export const deleteUser = async (accessToken,idUser) => {
    try {
      const res =  await axios.delete(`http://localhost:7012/users/${idUser}/deleteUser`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        console.log(res)
        if (res.data.code === 1000) {
            eventEmitter.emit('successDelete',res.data.data.message)
        } else {
            eventEmitter.emit('errorDelete', res.data.data.message)
        }
    }
    catch (e) {
        console.log(e)
    }
}
export const getUser= async (id, accessToken) => {
    try {
     const res= await axios.get(`http://localhost:7012/users/${id}/getUserAll`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return  res.data.data.user
    } catch (error) {
        console.log(error)
    }
}
