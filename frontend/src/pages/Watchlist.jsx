import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWatchlist, syncWatchlistWithAuth } from '../redux/slices/watchlistSlice';
import { FaTrash, FaStar, FaClock } from 'react-icons/fa';
import Cookies from 'js-cookie';

const Watchlist = () => {
  const dispatch = useDispatch();
  const { watchlistMovies } = useSelector((state) => state.watchlist);
  const [auth, setAuth] = useState(false);
  const userToken = Cookies.get('userToken');

  useEffect(() => {
    if (userToken) {
      setAuth(true);
    } else {
      setAuth(false);
    }
    // Sync watchlist with authentication state
    dispatch(syncWatchlistWithAuth());
  }, [userToken, dispatch]);

  return (
    <div className="w-full">
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-4'>
          <FaClock className="text-red-500 text-2xl" />
          <h1 className='text-3xl font-bold text-white'>My Watchlist</h1>
          <span className='bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium'>
            {watchlistMovies?.length} movies
          </span>
        </div>
        <p className='text-gray-400'>Movies you've added to your watchlist</p>
      </div>
      
      {watchlistMovies.length === 0 ? (
        <div className="text-center py-20 bg-[#161D2F]/50 rounded-2xl">
          <FaClock className="text-6xl text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No movies in watchlist</h2>
          <p className="text-gray-400 mb-6">Start adding movies to your watchlist by clicking the clock icon</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors">
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {watchlistMovies.map((movie) => (
            <div key={movie.id} className="bg-[#161D2F] rounded-lg overflow-hidden group relative hover:scale-105 transition-all duration-300">
              {auth && (
                <button 
                  onClick={() => dispatch(removeFromWatchlist(movie))}
                  className="absolute top-2 right-2 z-10 bg-black/70 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500"
                >
                  <FaTrash className="text-red-500 hover:text-white" />
                </button>
              )}
              
              <Link to={`/movie-detail/${movie.id}`} state={movie} className="block">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`} 
                    alt={movie.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                    }}
                  />
                  <div className="absolute bottom-2 right-2 bg-[#161D2F] bg-opacity-80 p-1 rounded-md flex items-center">
                    <FaStar className="text-yellow-400 mr-1" size={12} />
                    <span className="text-sm">{movie.vote_average.toFixed(1)}</span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-lg truncate text-white">{movie.title}</h3>
                  <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                    <span>Lang: {movie.original_language?.toUpperCase()}</span>
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;