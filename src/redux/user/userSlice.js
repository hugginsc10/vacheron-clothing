import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase/firebase.utils";


const initialState = {
    currentUser: null
}

export const selectCurrentUser = (state) => state.user.currentUser
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: {
            reducer(state, action) {
            console.log(state)
            state.currentUser = action.payload
            },
            prepare(user) {
                return {
                    payload: user,
                    }
                }
            }
        }

    },

)

export const { setCurrentUser } = userSlice.actions
export default userSlice.reducer