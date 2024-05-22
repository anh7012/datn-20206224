import {createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: null,
        }
    },
    reducers: {
        loginStart: state => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.currentUser = action.payload
            state.login.error = null
        },
        loginFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true

        },
        logoutUser: (state) => {
            state.login.currentUser = null
            state.login.error = null
        },
    }
})

export const {loginFailed, loginStart, loginSuccess,logoutUser} = authSlice.actions

export default authSlice.reducer