// src/api/postsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '../types/post';

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => 'posts',
            providesTags: ['Posts'], // provides the 'Posts' tag when the query is made,

        }),
        getPost: builder.query<Post, number>({
            query: (id) => `posts/${id}`,

        }),
        addPost: builder.mutation<Post, Partial<Post>>({
            query: (post) => ({
                url: 'posts',
                method: 'POST',
                body: post,
            }),
            invalidatesTags: ['Posts'], // invalidates the 'Posts' tag when a new post is added, so that the list of posts is refetched

        }),
        updatePost: builder.mutation<Post, { id: number; post: Partial<Post> }>({
            query: ({ id, post }) => ({
                url: `posts/${id}`,
                method: 'PUT',
                body: post,
            }),
            invalidatesTags: ['Posts'],
        }),
        deletePost: builder.mutation<{ success: boolean; id: number }, number>({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'DELETE',
            }),
            // invalidatesTags: ['Posts'],
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPostQuery,
    useAddPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} = postsApi;

export default postsApi;
