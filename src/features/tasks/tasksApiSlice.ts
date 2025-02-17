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
            providesTags: ['Tasks'],
        }),
        postTask: build.mutation<Task, Partial<Task>>({
            query: (newTask) => ({
                url: '',
                method: 'POST',
                body: newTask,
            }),
            invalidatesTags: ['Tasks'],
        }),
        deleteTask: build.mutation<void, string>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tasks'],
        }),
    }),
});

export const { useGetTasksQuery, usePostTaskMutation, useDeleteTaskMutation } =
    tasksApiSlice;
