import axios from "axios";
import {loginFailed, loginStart, loginSuccess} from "./slice/authSlice.js";
import {getAllUserFailed, getAllUserStart, getAllUserSuccess} from "./slice/userSlide.js";

export const loginUser = async (user,dispatch,navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post('http://localhost:7012/login', user);
        dispatch(loginSuccess(res.data));
        console.log('aaaa')
        navigate("/");
    }catch(err) {
        dispatch(loginFailed());
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
