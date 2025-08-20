
import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';

const getAuthStatus = () => {
  return !!Cookies.get('userToken');
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteMovies: getAuthStatus() && localStorage.getItem('favoriteMovies')
      ? JSON.parse(localStorage.getItem('favoriteMovies'))
      : [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      if (!getAuthStatus()) {
        toast.error('Please sign in to add favorites');
        return;
      }
      
      if (!state.favoriteMovies.some((movie) => movie.id === action.payload.id)) {
        state.favoriteMovies.push(action.payload);
        localStorage.setItem('favoriteMovies', JSON.stringify(state.favoriteMovies));
        toast.success('Added to favorites ❤️');
      } else {
        toast.error('Already in your favorites');
      }
    },
    removeFromFavorites: (state, action) => {
      if (!getAuthStatus()) {
        toast.error('Please sign in to manage favorites');
        return;
      }
      
      const movieIdToRemove = action.payload;
      
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.id !== movieIdToRemove.id
      );
      localStorage.setItem('favoriteMovies', JSON.stringify(state.favoriteMovies));
      toast.success('Removed from favorites');
    },
    toggleFavorite: (state, action) => {
      if (!getAuthStatus()) {
        toast.error('Please sign in to manage favorites');
        return;
      }
      
      const movie = action.payload;
      const existingIndex = state.favoriteMovies.findIndex(
        (favMovie) => favMovie.id === movie.id
      );
      
      if (existingIndex !== -1) {
        // Remove from favorites
        state.favoriteMovies.splice(existingIndex, 1);
        localStorage.setItem('favoriteMovies', JSON.stringify(state.favoriteMovies));
        toast.success('Removed from favorites');
      } else {
        // Add to favorites
        state.favoriteMovies.push(movie);
        localStorage.setItem('favoriteMovies', JSON.stringify(state.favoriteMovies));
        toast.success('Added to favorites ❤️');
      }
    },
    clearFavorites: (state) => {
      state.favoriteMovies = [];
      localStorage.removeItem('favoriteMovies');
    },
    syncFavoritesWithAuth: (state) => {
      const isAuthenticated = getAuthStatus();
      if (!isAuthenticated) {
        // Clear favorites when not authenticated
        state.favoriteMovies = [];
        localStorage.removeItem('favoriteMovies');
      } else {
        // Load favorites from localStorage when authenticated
        const storedFavorites = localStorage.getItem('favoriteMovies');
        if (storedFavorites) {
          state.favoriteMovies = JSON.parse(storedFavorites);
        }
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites, toggleFavorite, clearFavorites, syncFavoritesWithAuth } = favoritesSlice.actions;
export default favoritesSlice.reducer;
