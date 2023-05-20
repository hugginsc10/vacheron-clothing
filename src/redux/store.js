import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducers';
// import rootReducer from "./root-reducer";
// import createSagaMiddleware from "redux-saga";
// import { createLogger } from "redux-logger";


// const sagaMiddleware = createSagaMiddleware();
// const loggerMiddleware = createLogger();

// const middlewares = [sagaMiddleware];

// if (process.env.NODE_ENV === "development") {
//   middlewares.push(loggerMiddleware);
// }

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer,
    shop: shopReducer
  }
});
export const persistor = persistStore(store);