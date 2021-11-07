import { createAction } from "@reduxjs/toolkit";

export const deleteContact = createAction('contacts/delete')
export const addNewContact = createAction('contacts/add')
export const filterContactByName = createAction('contacts/filterByName')