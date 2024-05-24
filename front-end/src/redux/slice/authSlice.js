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
    }
})

export const {loginFailed, loginSuccess,logoutUser} = authSlice.actions

export default authSlice.reducer