import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './userReducer';
import accountReducer from './businessAccountReducer';
import reservationReducer from './reservationReducer';


const persistConfig = {
  key: 'root',
  storage,
  timeout: 0,
};

const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
  account: accountReducer,
  reservation: reservationReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ]
})

export let persistor = persistStore(store);

export default store;
