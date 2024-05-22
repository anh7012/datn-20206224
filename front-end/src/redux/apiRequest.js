import axios from "axios";
import {loginFailed, loginStart, loginSuccess, logoutUser} from "./slice/authSlice.js";
import {getAllUserFailed, getAllUserStart, getAllUserSuccess} from "./slice/userSlide.js";
import eventEmitter from "../utils/eventEmitter.js";

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://localhost:7012/login', user);
        if (res.data.code === 1000) {
            dispatch(loginSuccess(res.data));
            eventEmitter.emit('success')
            navigate("/home");
        } else {
            dispatch(loginFailed(res.data));
            eventEmitter.emit('error',res.data.data.message)
        }

    } catch (error) {
        dispatch(loginFailed(error));
        eventEmitter.emit('error',error)
    }
};
export const logout = async (accessToken,dispatch,navigator)=>{
    try {
        const res = await axios.post('http://localhost:7012/logout', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        dispatch(logoutUser())
        navigator('/dangnhap')
        console.log('logout',res)
    }
    catch (e){
        console.log(e)
    }
}


export const getAllUser = async (accessToken,dispatch)=>{
    dispatch(getAllUserStart())
    try {
        const res = await axios.get('http://localhost:8000/user',{
            headers:{
                token:`Bearer ${accessToken}`
            }
        })
        dispatch(getAllUserSuccess(res.data))
    }
    catch (e){
        dispatch(getAllUserFailed())
    }

}


export const updateUser = async (data,id,accessToken)=>{
    try {
        const res = await axios.put(`http://localhost:7012/users/${id}`,{}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

    }catch (e){
        console.log(e)
    }
}
export const loginAgain = async (user, dispatch)=>{
    try {
        const res = await axios.post('http://localhost:7012/login', user);
        if (res.data.code === 1000) {
            dispatch(loginSuccess(res.data));
        } else {
            // dispatch(loginFailed(res.data));
        }

    } catch (error) {
        // dispatch(loginFailed(error));
        // eventEmitter.emit('error',error)
    }
}
