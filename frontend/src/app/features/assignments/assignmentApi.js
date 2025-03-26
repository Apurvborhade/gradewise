import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


// Define a service using a base URL and expected endpoints
export const assignmentApi = createApi({
    reducerPath: 'assignmentApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/assignment`, credentials: 'include' }),
    tagTypes: ['Assignment'],
    endpoints: (build) => ({
        //* Queries
        // Get All assignment in a class
        getAllAssignments: build.query({
            query: (classId) => `/?classId=${classId}`,
            providesTags: ['Assignment']
        }),
        getAssignmentDetails: build.query({
            query: (assignmentId) => `/assignment-details/${assignmentId}`,
            providesTags: ['Assignment']
        }),
        // Get All assignment in a class
        getStudentAssignments: build.query({
            query: ({ studentId, page = 1, pageSize = 10, lastVisible = null }) => {
                let url = `/student-assignments?studentId=${studentId}&page=${page}&pageSize=${pageSize}`;
                if (lastVisible) {
                    url += `&lastVisible=${lastVisible}`;
                }
                return url;
            },
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
            query: ({ file, studentId, assignmentId, maxScore, gradingCriteria, classId, assignmentType }) => {
                const formData = new FormData();
                formData.append('studentId', studentId);
                formData.append('assignmentId', assignmentId);
                formData.append('maxScore', maxScore);
                formData.append('gradingCriteria', gradingCriteria);
                formData.append('classId', classId);
                formData.append('assignmentType', assignmentType);
                formData.append('file', file); // Append the file
                return {
                    url: `/upload`,
                    method: 'POST',
                    body: formData,
                    headers: {

                    }

                }
            },
            invalidatesTags: ['Assignment']
        }),
        // Handle Assignment Req (Teacher)
        handleAssignment: build.mutation({
            query: ({ classId, studentId, assignmentId, ...body }) => ({
                url: `/assignmenthandler?classId=${classId}&studentId=${studentId}&assignmentId=${assignmentId}`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Assignment']
        }),
        // Post new Assignment (Teacher)
        postNewAssignment: build.mutation({
            query: (body) => ({
                url: `/new-assignment`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Assignment']
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllAssignmentsQuery, useGetAssignmentAcceptedQuery, useGetAssignmentRejectedQuery, useGetAssignmentRequestsQuery, useGetAssignmentDetailsQuery, useGetStudentAssignmentsQuery, useGetTotalAssignmentSubmissionQuery, useHandleAssignmentMutation, usePostNewAssignmentMutation, useSubmitAssignmentMutation } = assignmentApi