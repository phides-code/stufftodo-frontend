import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TASKS_SERVICE_URL = import.meta.env.VITE_TASKS_SERVICE_URL as string;
const API_KEY = import.meta.env.VITE_API_KEY as string;

const prepareHeaders = (headers: Headers) => {
    headers.set('x-api-key', API_KEY);
    return headers;
};

export interface Task {
    id: string;
    content: string;
    taskStatus: string;
    completedOn: number;
    createdOn: number;
}

interface TasksApiResponse {
    data: Task[] | null;
    errorMessage: string | null;
}

export const tasksApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: TASKS_SERVICE_URL,
        prepareHeaders,
    }),

    reducerPath: 'tasksApi',
    tagTypes: ['Tasks'],
    endpoints: (build) => ({
        getTasks: build.query<TasksApiResponse, void>({
            query: () => '',
            // providesTags: (result, error, id) => [{ type: 'Tasks', id }],
            providesTags: ['Tasks'],
        }),
    }),
});

export const { useGetTasksQuery } = tasksApiSlice;
