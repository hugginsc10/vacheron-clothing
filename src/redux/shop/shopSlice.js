import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'


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


    }
})

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection("collections");
        dispatch(fetchCollectionsStart);
        collectionRef
            .get()
            .then(snapshot => {
                const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
                dispatch(fetchCollectionsSuccess(collectionsMap));
            })
            .catch(err => {
                dispatch(fetchCollectionsFailure(err.message));
            });


    }

}
// export const fetchCollectionsStartAsync = () => {
//     return dispatch => {
//          const collectionRef = firestore.collection("collections");
//       dispatch(fetchCollectionsStart);
//       collectionRef
//         .get()
//         .then(snapshot => {
//         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//         dispatch(fetchCollectionsSuccess(collectionsMap));
//       })
//         .catch(error => dispatch(fetchCollectionsFailure(error.message)));
//     }
//   }

export const { fetchCollectionsStart, fetchCollectionsSuccess, fetchCollectionsFailure } = shopSlice.actions

export default shopSlice.reducer
