import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import * as actions from './contacts-actions'

const items = createReducer([], {
    [actions.addNewContact]: (_, { payload }) => [...payload]
})

const filter = createReducer('', {
    [actions.filterContactByName]: (_, { payload }) => payload
})

export default combineReducers({
    items,
    filter,
})