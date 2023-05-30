import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
 } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userSlice';
import cartReducer from './cart/cartSlice';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shopSlice';


// if (process.env.NODE_ENV === "development") {
//   middlewares.push(loggerMiddleware);
// }
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

const persistConfig = {
  key: 'root',
  storage,
  // whitelist: ['cart']
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
  })
});
export const persistor = persistStore(store);
