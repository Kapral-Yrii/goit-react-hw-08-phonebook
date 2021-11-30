import { createAction } from "@reduxjs/toolkit";

export const user = createAction('auth/user')
export const token = createAction('auth/token')
export const isLoggedIn = createAction('auth/isLoggedIn')