import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './Base_url';
import Cookies from 'js-cookie';

const getToken = () => {
  return Cookies.get('userToken');
};

export const favoriteApiSlice = createApi({
  reducerPath: 'favoriteApi',
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
  tagTypes: ['Favorite'],
  endpoints: (builder) => ({
    // Get user's favorites from database
    getFavorites: builder.query({
      query: () => ({
        url: 'favorites',
        method: 'GET',
      }),
      providesTags: ['Favorite'],
    }),

    // Add movie to favorites in database
    addToFavorites: builder.mutation({
      query: (movieData) => ({
        url: 'favorites/add',
        method: 'POST',
        body: {
          movieId: movieData.id,
          movieData: movieData
        },
      }),
      invalidatesTags: ['Favorite'],
      async onQueryStarted(movieData, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Update the favorites slice with the new movie
          dispatch({
            type: 'favorites/addToFavorites',
            payload: movieData
          });
        } catch (error) {
          console.error('Error adding to favorites:', error);
        }
      },
    }),

    // Remove movie from favorites in database
    removeFromFavorites: builder.mutation({
      query: (movieId) => ({
        url: `favorites/${movieId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorite'],
      async onQueryStarted(movieId, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Update the favorites slice by removing the movie
          dispatch({
            type: 'favorites/removeFromFavorites',
            payload: { id: movieId }
          });
        } catch (error) {
          console.error('Error removing from favorites:', error);
        }
      },
    }),

    // Clear all favorites in database
    clearFavorites: builder.mutation({
      query: () => ({
        url: 'favorites',
        method: 'DELETE',
      }),
      invalidatesTags: ['Favorite'],
    }),
  }),
});

export const {
  useGetFavoritesQuery,
  useAddToFavoritesMutation,
  useRemoveFromFavoritesMutation,
  useClearFavoritesMutation,
} = favoriteApiSlice;
