import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice.js'
import userReducer from "./slice/userSlide.js";
export default configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer
    }
})