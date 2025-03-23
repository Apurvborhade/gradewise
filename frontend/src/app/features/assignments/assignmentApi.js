import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const assignmentApi = createApi({
    reducerPath: 'assignmentApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/assignment` }),
    tagTypes: ['Assignment'],
    endpoints: (build) => ({
        //* Queries
        // Get All assignment in a class
        getAllAssignments: build.query({
            query: (classId) => `/?classId=${classId}`,
            providesTags: ['Assignment']
        }),
        // Get Total assignment submission
        getTotalAssignmentSubmission: build.query({
            query: (classId) => `/totalsubmission?classId=${classId}`,
            providesTags: ['Assignment']
        }),
        // Get Assignemnt Requests
        getAssignmentRequests: build.query({
            query: (classId) => `/assignment-requests?classId=${classId}`,
            providesTags: ['Assignment']
        }),

        // Get accepted Assignments
        getAssignmentAccepted: build.query({
            query: (classId) => `/assignment-accepted?classId=${classId}`,
            providesTags: ['Assignment']
        }),
        // Get rejected Assignments
        getAssignmentRejected: build.query({
            query: (classId) => `/assignment-rejected?classId=${classId}`,
            providesTags: ['Assignment']
        }),
        //* Mutations
        // Submit assignment (Student)
        submitAssignment: build.mutation({
            query: (body) => ({
                url: `/upload`,
                method: 'POST',
                body
            })
        }),
        // Handle Assignment Req (Teacher)
        handleAssignment: build.mutation({
            query: ({ classId, studentId, assignmentId, ...body }) => ({
                url: `/assignmenthandler?classId=${classId}&studentId=${studentId}&assignmentId=${assignmentId}`,
                method: 'POST',
                body
            })
        }),
        // Post new Assignment (Teacher)
        postNewAssignment: build.mutation({
            query: (body) => ({
                url: `/new-assignment`,
                method: 'POST',
                body
            })
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { } = assignmentApi