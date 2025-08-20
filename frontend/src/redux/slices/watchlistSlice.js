import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const getAuthStatus = () => {
  return !!Cookies.get('userToken');
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    watchlistMovies: getAuthStatus() && localStorage.getItem('watchlistMovies')
      ? JSON.parse(localStorage.getItem('watchlistMovies'))
      : [],
  },
  reducers: {
    addToWatchlist: (state, action) => {
      if (!getAuthStatus()) {
        toast.error('Please sign in to add to watchlist');
        return;
      }
      
      if (!state.watchlistMovies.some((movie) => movie.id === action.payload.id)) {
        state.watchlistMovies.push(action.payload);
        localStorage.setItem('watchlistMovies', JSON.stringify(state.watchlistMovies));
        toast.success('Added to watchlist');
      } else {
        toast.error('Already in your watchlist');
      }
    },
    removeFromWatchlist: (state, action) => {
      if (!getAuthStatus()) {
        toast.error('Please sign in to manage watchlist');
        return;
      }
      
      state.watchlistMovies = state.watchlistMovies.filter(
        (movie) => movie.id !== action.payload.id
      );
      localStorage.setItem('watchlistMovies', JSON.stringify(state.watchlistMovies));
      toast.success('Removed from watchlist');
    },
    clearWatchlist: (state) => {
      state.watchlistMovies = [];
      localStorage.removeItem('watchlistMovies');
    },
    syncWatchlistWithAuth: (state) => {
      const isAuthenticated = getAuthStatus();
      if (!isAuthenticated) {
        // Clear watchlist when not authenticated
        state.watchlistMovies = [];
        localStorage.removeItem('watchlistMovies');
      } else {
        // Load watchlist from localStorage when authenticated
        const storedWatchlist = localStorage.getItem('watchlistMovies');
        if (storedWatchlist) {
          state.watchlistMovies = JSON.parse(storedWatchlist);
        }
      }
    },
  },
});

export const { addToWatchlist, removeFromWatchlist, clearWatchlist, syncWatchlistWithAuth } = watchlistSlice.actions;
export default watchlistSlice.reducer;