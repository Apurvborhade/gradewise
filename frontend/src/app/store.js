import { configureStore } from '@reduxjs/toolkit'
import { userApi } from './features/users/usersApi'
import { classesApi } from './features/classes/classesApi'
import { assignmentApi } from './features/assignments/assignmentApi'

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [classesApi.reducerPath]: classesApi.reducer,
        [assignmentApi.reducerPath]: assignmentApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware).concat(classesApi.middleware).concat(assignmentApi.middleware),
})