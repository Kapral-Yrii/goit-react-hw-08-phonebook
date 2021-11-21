import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import contactsReducer from './contacts/contacts-reducers';
import { contactsApi } from "./contactsAPI";
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER } from "redux-persist";
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//     key: 'contacts',
//     storage,
//     blacklist: ['filter']
// }

const store = configureStore({
  reducer: {
      // contacts: persistReducer(persistConfig, contactsReducer)
    contacts: contactsReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ]
    // getDefaultMiddleware({
    //   serializableCheck: {
    //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    //   }
    // })
})

// const persistor = persistStore(store)

// eslint-disable-next-line import/no-anonymous-default-export
// export default { store, persistor }
export default store