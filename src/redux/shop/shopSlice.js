import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { app, convertCollectionsSnapshotToMap, db } from '../../firebase/firebase.utils'
import { collection, getDocs, query, where, getFirestore, addDoc } from "firebase/firestore";

const initialState = {
    collections: null,
    isFetching: false,
    errorMessage: undefined
  }

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        fetchCollectionsStart(state, action) {
            state.isFetching = true
        },
        fetchCollectionsSuccess(state, action) {
            state.isFetching = false
            state.collections = action.payload
        },
        fetchCollectionsFailure(state, action) {
            state.isFetching = false
            state.errorMessage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCollectionsStartAsync.pending, (state, action) => {
            state.isFetching = true
        })
        builder.addCase(fetchCollectionsStartAsync.fulfilled, (state, action) => {
            state.isFetching = false
            state.collections = action.payload
        })
        builder.addCase(fetchCollectionsStartAsync.rejected, (state, action) => {
            state.isFetching = false
            state.errorMessage = action.payload
        })

    }
})

export const fetchCollectionsStartAsync = createAsyncThunk(
    'shop/fetchCollectionsStartAsync',
    async (payload, thunkAPI) => {
        const collectionRef = collection(db, "collections");
        try {
            const snapshot = await getDocs(collectionRef)
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            return collectionsMap
        } catch (error) {
           return thunkAPI.rejectWithValue(error.message)
        }
    }

)

export const selectCollection = (state) => state.shop.collections

export const { fetchCollectionsStart, fetchCollectionsSuccess, fetchCollectionsFailure } = shopSlice.actions

export default shopSlice.reducer
