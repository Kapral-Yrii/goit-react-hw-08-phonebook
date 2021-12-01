import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import contactsReducer from './contacts/contacts-reducers';
import authReducer from './auth/auth-reducers'
import { contactsApi } from "./contactsAPI";
import { authApi } from "./authAPI";

const persistAuthConfig = {
    key: 'auth',
    storage,
    whitelist: ['token']
}

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
    auth: persistReducer(persistAuthConfig, authReducer),
    [authApi.reducerPath]: authApi.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(contactsApi.middleware, authApi.middleware)
})

const persistor = persistStore(store)

// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor }