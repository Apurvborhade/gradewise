import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`, credentials: 'include' }),
    tagTypes: ['User'],
    endpoints: (build) => ({
        userSignup: build.mutation({
            query: (body) => ({
                url: '/signup',
                method: 'POST',
                body
            }),
            providesTags: ['User']
        }),
        userSignin: build.mutation({
            query: (body) => ({
                url: '/signin',
                method: 'POST',
                body
            }),
            providesTags: ['User']
        }),
        userLogout: build.mutation({
            query: (body) => ({
                url: '/signout',
                method: 'POST',
                body
            }),
            providesTags: ['User']
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUserLogoutMutation, useUserSigninMutation, useUserSignupMutation } = userApi