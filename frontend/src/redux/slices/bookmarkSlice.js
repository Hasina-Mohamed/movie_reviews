
import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState: {
    bookmarkedMovies:  localStorage.getItem('bookmarkedMovies')
    ? JSON.parse(localStorage.getItem('bookmarkedMovies'))
    : [],
  },
  reducers: {
    bookmarkMovie: (state, action) => {
      if (!state.bookmarkedMovies.some((movie) => movie.id === action.payload.id)) {
        state.bookmarkedMovies.push(action.payload);
        localStorage.setItem('bookmarkedMovies', JSON.stringify(state.bookmarkedMovies));
        toast.success('successfully Added bookmark')
      }
    },
    removeBookmark: (state, action) => {
      const movieIdToRemove = action.payload;
      
      console.log('movieIdToRemove', movieIdToRemove);
      state.bookmarkedMovies = state.bookmarkedMovies.filter(
        (movie) => movie.id !== movieIdToRemove.id
      );
      localStorage.setItem('bookmarkedMovies', JSON.stringify(state.bookmarkedMovies));
      toast.success('successfully removed bookmark')
    },
  },
});

export const { bookmarkMovie, removeBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
