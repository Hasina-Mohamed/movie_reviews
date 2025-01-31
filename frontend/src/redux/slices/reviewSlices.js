import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import { BASE_URL } from "./Base_url";
const getToken = () => {
    return Cookies.get('userToken');
}
export const reviewSlices = createApi({
    reducerPath: 'reviewSlices',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers) => {
            const token = getToken();
            if (token) {
                headers.set('Authorization', token);
            }
            return headers;
        }
    }),
    tagTypes: ['review'],
    endpoints: (builder) => ({
        createReview: builder.mutation({
            query: (newReview) => ({
                url: 'review/create',
                method: 'POST',
                body: newReview
            }),
            invalidatesTags: ['review']
        }),

        updateReview: builder.mutation({
            query: ({ id, updateReview }) => ({
                url: `review/${id}`,
                method: 'PUT',
                body: updateReview
            }),
            invalidatesTags: ['review']
        }),


        deleteReview: builder.mutation({
            query: (id) => ({
                url: `review/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['review']
        }),


        getReviews: builder.query({
            query: () => {
                return {
                    url: 'reviews',
                    method: 'GET',
                }
            },
            providesTags: ['review']
        }),
    })
})


export const {
    useCreateReviewMutation,
    useDeleteReviewMutation,
    useGetReviewsQuery,
    useUpdateReviewMutation
} = reviewSlices;