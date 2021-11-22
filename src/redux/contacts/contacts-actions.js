import { createAction } from "@reduxjs/toolkit";

export const addNewContact = createAction('contacts/add')
export const filterContactByName = createAction('contacts/filterByName')