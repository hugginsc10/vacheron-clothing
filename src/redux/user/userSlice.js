import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: {
            reducer(state, action) {
            state.currentUser = action.payload
            },
            prepare(user) {
                return {
                    payload: {
                        currentUser: user,
                    }
                }
            }
        }

    },

})

export const { setCurrentUser } = userSlice.actions
export default userSlice.reducer