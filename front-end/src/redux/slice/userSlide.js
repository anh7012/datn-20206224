import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            allUser: null,
            isFetching: false,
            error: false,
        }
    },
    reducers: {
        getAllUserStart: state => {
            state.user.isFetching = true
        },
        getAllUserSuccess: (state, action) => {
            state.user.isFetching = false
            state.user.allUser = action.payload
        },
        getAllUserFailed: state => {
            state.user.isFetching = false
            state.user.error = true
        }
    }
})

export const {getAllUserFailed,getAllUserStart,getAllUserSuccess} = userSlice.actions

export default userSlice.reducer