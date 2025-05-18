import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    watchlistMovies: localStorage.getItem('watchlistMovies')
      ? JSON.parse(localStorage.getItem('watchlistMovies'))
      : [],
  },
  reducers: {
    addToWatchlist: (state, action) => {
      if (!state.watchlistMovies.some((movie) => movie.id === action.payload.id)) {
        state.watchlistMovies.push(action.payload);
        localStorage.setItem('watchlistMovies', JSON.stringify(state.watchlistMovies));
        toast.success('Added to watchlist');
      } else {
        toast.error('Already in your watchlist');
      }
    },
    removeFromWatchlist: (state, action) => {
      state.watchlistMovies = state.watchlistMovies.filter(
        (movie) => movie.id !== action.payload.id
      );
      localStorage.setItem('watchlistMovies', JSON.stringify(state.watchlistMovies));
      toast.success('Removed from watchlist');
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;