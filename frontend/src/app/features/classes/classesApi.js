import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const classesApi = createApi({
    reducerPath: 'classesApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/class`, credentials: 'include' }),
    tagTypes: ['Class'],
    endpoints: (build) => ({
        //* Querys

        // Get Class Details
        getClassDetails: build.query({
            query: (classId) => `/${classId}`,
            providesTags: ['Class']
        }),
        // Get Students Req to Join Class
        getStudentsRequests: build.query({
            query: (classId) => `/${classId}/requests`,
            providesTags: ['Class']
        }),
        // Get Students in class
        getStudents: build.query({
            query: (classId) => `/${classId}/students`,
            providesTags: ['Class']
        }),
        // Get Classes in class
        getClasses: build.query({
            query: ({ userId, limit }) => `/${userId}/classes?limit=${limit}`,
            providesTags: ['Class']
        }),
        // Get Class Leaderboard
        getLeaderboard: build.query({
            query: () => `/leaderboard`,
            providesTags: ['Class']
        }),

        // * Mutations 
        // Create Class (Faculty)
        createClass: build.mutation({
            query: (body) => ({
                url: `/create`,
                method: 'POST',
                body
            }),
            invalidatesTags:['Class']
        }),
        // Join Class (Student)
        joinClass: build.mutation({
            query: ({ classId, ...body }) => ({
                url: `/${classId}/join`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Class']
        }),

        // Handle Join Requests (Faculty)
        handleJoinRequests: build.mutation({
            query: ({ classId, studentId, ...body }) => ({
                url: `/${classId}/requests/${studentId}`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Class']
        }),

    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateClassMutation, useGetStudentsQuery, useGetStudentsRequestsQuery, useGetLeaderboardQuery,useHandleJoinRequestsMutation, useJoinClassMutation, useGetClassesQuery,useGetClassDetailsQuery } = classesApi