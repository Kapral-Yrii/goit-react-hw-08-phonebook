import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://connections-api.herokuapp.com'
    }),
    tagTypes: ['Auth'],
    endpoints: builder => ({
        signupUser: builder.mutation({
            query: newUser => ({
                url: '/users/signup',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['Auth'],
        }),
        loginUser: builder.mutation({
            query: dataLogin => ({
                url: '/users/login',
                method: 'POST',
                body: dataLogin,
            }),
            invalidatesTags: ['Auth'],
        }),
        logoutUser: builder.mutation({
            query: token => ({
                url: '/users/logout',
                method: 'POST',
                headers: {
                    Authorization : `Bearer ${token}`
                }
            }),
            invalidatesTags: ['Auth'],
        }),
        currentUser: builder.mutation({
            query: token => ({
                url: '/users/current',
                method: 'GET',
                headers: {
                    Authorization : `Bearer ${token}`
                }
            }),
            providesTags: ['Auth'],
        })
    })
})

export const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation, useCurrentUserMutation } = authApi