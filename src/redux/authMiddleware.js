import { setLoading, setError, setCurrentUser } from './user/userSlice'
import { auth, googleProvider } from '../firebase/firebase.utils'

export const signInWithGoogle = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const { user } = await auth.signInWithPopup(googleProvider);
            dispatch(setCurrentUser(user));
        } catch (error) {
            dispatch(setError(error.message));
        }
    }
}

export const signOut = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            await auth.signOut();
            dispatch(setCurrentUser(null));
        } catch (error) {
            dispatch(setError(error.message));
        }
    }
}