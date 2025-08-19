
import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favoriteMovies: localStorage.getItem('favoriteMovies')
      ? JSON.parse(localStorage.getItem('favoriteMovies'))
      : [],
  },
  reducers: {
    addToFavorites: (state, action) => {
      if (!state.favoriteMovies.some((movie) => movie.id === action.payload.id)) {
        state.favoriteMovies.push(action.payload);
        localStorage.setItem('favoriteMovies', JSON.stringify(state.favoriteMovies));
        toast.success('Added to favorites ❤️');
      } else {
        toast.error('Already in your favorites');
      }
    },
    removeFromFavorites: (state, action) => {
      const movieIdToRemove = action.payload;
      
      state.favoriteMovies = state.favoriteMovies.filter(
        (movie) => movie.id !== movieIdToRemove.id
      );
      localStorage.setItem('favoriteMovies', JSON.stringify(state.favoriteMovies));
      toast.success('Removed from favorites');
    },
    toggleFavorite: (state, action) => {
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
  },
});

export const { addToFavorites, removeFromFavorites, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
