import {createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            error: null,
        }
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.login.currentUser = action.payload
            state.login.error = null
        },
        loginFailed: (state) => {
            state.login.error = true

        },
        logoutUser: (state) => {
            state.login.currentUser = null
            state.login.error = null
        },
        loginAgain: (state, action) => {
            state.login.currentUser.data.accessToken = action.payload
        },
    }
})

export const {loginFailed, loginSuccess,logoutUser,loginAgain} = authSlice.actions

export default authSlice.reducer