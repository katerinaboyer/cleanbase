import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from './userReducer';


const persistConfig = {
    key: 'user',
    storage,
};

const rootReducer = combineReducers({
  user: persistReducer(persistConfig, userReducer),
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
