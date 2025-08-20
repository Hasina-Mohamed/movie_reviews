import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

const getAuthStatus = () => {
  return !!Cookies.get('userToken');
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    watchlistMovies: (() => {
      const stored = localStorage.getItem('watchlistMovies');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed;
      }
      return [];
    })(),
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
      
      const movieIdToRemove = action.payload;
      
      state.watchlistMovies = state.watchlistMovies.filter(
        (movie) => movie.id !== movieIdToRemove.id
      );
      localStorage.setItem('watchlistMovies', JSON.stringify(state.watchlistMovies));
      toast.success('Removed from watchlist');
    },
    toggleWatchlist: (state, action) => {
      if (!getAuthStatus()) {
        toast.error('Please sign in to manage watchlist');
        return;
      }
      
      const movie = action.payload;
      const existingIndex = state.watchlistMovies.findIndex(
        (watchlistMovie) => watchlistMovie.id === movie.id
      );
      
      if (existingIndex !== -1) {
        // Remove from watchlist
        state.watchlistMovies.splice(existingIndex, 1);
        localStorage.setItem('watchlistMovies', JSON.stringify(state.watchlistMovies));
        toast.success('Removed from watchlist');
      } else {
        // Add to watchlist
        state.watchlistMovies.push(movie);
        localStorage.setItem('watchlistMovies', JSON.stringify(state.watchlistMovies));
        toast.success('Added to watchlist');
      }
    },
    clearWatchlist: (state) => {
      state.watchlistMovies = [];
      localStorage.removeItem('watchlistMovies');
    },
    syncWatchlistWithAuth: (state) => {
      const storedWatchlist = localStorage.getItem('watchlistMovies');
      
      if (storedWatchlist) {
        state.watchlistMovies = JSON.parse(storedWatchlist);
      } else {
        state.watchlistMovies = [];
      }
    },
    // New action to sync with database data
    syncWatchlistFromDatabase: (state, action) => {
      if (action.payload && Array.isArray(action.payload)) {
        state.watchlistMovies = action.payload;
        // Also update localStorage for consistency
        localStorage.setItem('watchlistMovies', JSON.stringify(action.payload));
      }
    },
  },
});

export const { 
  addToWatchlist, 
  removeFromWatchlist, 
  toggleWatchlist, 
  clearWatchlist, 
  syncWatchlistWithAuth,
  syncWatchlistFromDatabase 
} = watchlistSlice.actions;
export default watchlistSlice.reducer;