import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const classesApi = createApi({
    reducerPath: 'classesApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BACKEND_URL }),
    endpoints: (build) => ({

    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { } = classesApi