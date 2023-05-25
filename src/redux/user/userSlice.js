import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase/firebase.utils";
import { useAuthState } from "react-firebase-hooks/auth";

const initialState = {
    currentUser: null,
    loading: true,

}
export const isloading = (state) => state.user.loading
export const selectCurrentUser = (state) => state.user.currentUser
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: {
            reducer(state, action) {
            console.log(action.payload)
            state.currentUser = action.payload
            },
            prepare(user) {
                return {
                    payload: user,
                    }
                }
            },
        login: (state, action) => {
            state.currentUser = action.payload
        },
        logout: (state) => {
            state.currentUser = null
        }
        }

    },

)

export const { setCurrentUser, login, logout } = userSlice.actions
export default userSlice.reducer