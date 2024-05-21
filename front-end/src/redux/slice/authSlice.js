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

        },
        loginFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        }
    }
})

export const {loginFailed,loginStart,loginSuccess} = authSlice.actions

export default authSlice.reducer