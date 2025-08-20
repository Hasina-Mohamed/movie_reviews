import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from './Base_url';
import Cookies from 'js-cookie';

const getToken = () => {
  return Cookies.get('userToken');
};

export const watchlistApiSlice = createApi({
  reducerPath: 'watchlistApi',
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
  tagTypes: ['Watchlist'],
  endpoints: (builder) => ({
    // Get user's watchlist from database
    getWatchlist: builder.query({
      query: () => ({
        url: 'watchlist',
        method: 'GET',
      }),
      providesTags: ['Watchlist'],
    }),

    // Add movie to watchlist in database
    addToWatchlist: builder.mutation({
      query: (movieData) => ({
        url: 'watchlist/add',
        method: 'POST',
        body: {
          movieId: movieData.id,
          movieData: movieData
        },
      }),
      invalidatesTags: ['Watchlist'],
      async onQueryStarted(movieData, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Update the watchlist slice with the new movie
          dispatch({
            type: 'watchlist/addToWatchlist',
            payload: movieData
          });
        } catch (error) {
          console.error('Error adding to watchlist:', error);
        }
      },
    }),

    // Remove movie from watchlist in database
    removeFromWatchlist: builder.mutation({
      query: (movieId) => ({
        url: `watchlist/${movieId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Watchlist'],
      async onQueryStarted(movieId, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Update the watchlist slice by removing the movie
          dispatch({
            type: 'watchlist/removeFromWatchlist',
            payload: { id: movieId }
          });
        } catch (error) {
          console.error('Error removing from watchlist:', error);
        }
      },
    }),

    // Clear all watchlist in database
    clearWatchlist: builder.mutation({
      query: () => ({
        url: 'watchlist',
        method: 'DELETE',
      }),
      invalidatesTags: ['Watchlist'],
    }),
  }),
});

export const {
  useGetWatchlistQuery,
  useAddToWatchlistMutation,
  useRemoveFromWatchlistMutation,
  useClearWatchlistMutation,
} = watchlistApiSlice;
