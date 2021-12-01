import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import * as actions from './auth-actions'

const initialState = {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false
}

const user = createReducer(initialState.user, {
    [actions.user]: (_, {payload}) => payload
})

const token = createReducer(initialState.token, {
    [actions.token]: (_, {payload}) => payload
})

const isLoggedIn = createReducer(initialState.isLoggedIn, {
    [actions.isLoggedIn]: (_, {payload}) => payload
})

export default combineReducers({
    user,
    token,
    isLoggedIn,
})