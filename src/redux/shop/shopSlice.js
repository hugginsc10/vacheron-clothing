import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import {  convertCollectionsSnapshotToMap, db } from '../../firebase/firebase.utils'
import { collection, getDocs } from "firebase/firestore";

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

export const selectIsFetching = (state) => state.shop.isFetching
export const selectCollections = (state) => state.shop.collections
export const selectCollection = (collectionUrlParam) => createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
)
export const selectCollectionsForPreview = () => createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)
export const { fetchCollectionsStart, fetchCollectionsSuccess, fetchCollectionsFailure } = shopSlice.actions

export default shopSlice.reducer
