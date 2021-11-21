import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import * as actions from './contacts-actions'

const items = createReducer([], {
    [actions.deleteContact]: (state, { payload }) => state.filter(e => e.id !== payload),
    [actions.addNewContact]: (state, { payload }) => [...state, ...payload]
})

const filter = createReducer('', {
    [actions.filterContactByName]: (_, { payload }) => payload
})

export default combineReducers({
    items,
    filter,
})