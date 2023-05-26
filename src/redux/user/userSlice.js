import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase/firebase.utils";
import { useAuthState } from "react-firebase-hooks/auth";

const initialState = {
    currentUser: null,
    isLoading: false,
    error: null

}
export const isloading = (state) => state.user.loading
export const selectCurrentUser = (state) => state.user.currentUser
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: {
            reducer(state, action) {
            state.currentUser = action.payload;
            state.isLoading = false;
            state.error = null;
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
            state.currentUser = null;
            state.isLoading = false;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
        }

    },

)

export const { setCurrentUser, login, logout, setLoading, setError } = userSlice.actions
export default userSlice.reducer