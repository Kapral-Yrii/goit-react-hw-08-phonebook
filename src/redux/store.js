import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from './contacts/contacts-reducers';
import { contactsApi } from "./contactsAPI";

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ]
})

export default store