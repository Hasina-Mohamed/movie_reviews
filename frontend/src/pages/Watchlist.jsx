import React, { useEffect, useState } from 'react';
import { FaClock, FaSearch, FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWatchlist, syncWatchlistWithAuth, syncWatchlistFromDatabase } from '../redux/slices/watchlistSlice';
import { useGetWatchlistQuery, useRemoveFromWatchlistMutation } from '../redux/slices/watchlistApiSlice';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Watchlist = () => {
  const dispatch = useDispatch();
  const { watchlistMovies } = useSelector((state) => state.watchlist);
  const [auth, setAuth] = useState(false);
  const userToken = Cookies.get('userToken');

  // Database API queries
  const { data: dbWatchlist, isLoading: isLoadingWatchlist, error: watchlistError } = useGetWatchlistQuery(undefined, {
    skip: !userToken,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true
  });
  const [removeFromWatchlistDb] = useRemoveFromWatchlistMutation();

  useEffect(() => {
    if (userToken) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [userToken]);

  // Sync database watchlist to Redux state when data is loaded
  useEffect(() => {
    if (dbWatchlist && dbWatchlist.watchlist) {
      dispatch(syncWatchlistFromDatabase(dbWatchlist.watchlist));
    }
  }, [dbWatchlist, dispatch]);

  // Use database watchlist if available, otherwise fall back to localStorage
  const displayWatchlist = dbWatchlist?.watchlist || watchlistMovies || [];

  const [searchByTitle, setSearchByTitle] = useState('');

  const handleRemoveFromWatchlist = async (movie) => {
    try {
      if (userToken) {
        // Remove from database
        await removeFromWatchlistDb(movie.id).unwrap();
      } else {
        // Remove from localStorage
        dispatch(removeFromWatchlist(movie));
      }
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    }
  };

  const filteredWatchlist = displayWatchlist.filter(movie =>
    movie.title?.toLowerCase().includes(searchByTitle.toLowerCase())
  );

  if (isLoadingWatchlist && userToken) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-4'>
          <FaClock className="text-blue-500 text-2xl" />
          <h1 className='text-3xl font-bold text-white'>My Watchlist</h1>
          <span className='bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium'>
            {displayWatchlist?.length} movies
          </span>
        </div>
        <p className='text-gray-400'>Movies you've added to your watchlist</p>
      </div>

      <div className='relative mb-6'>
        <div className='relative'>
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search your watchlist..."
            value={searchByTitle}
            onChange={(e) => setSearchByTitle(e.target.value)}
            className='w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent'
          />
        </div>
      </div>

      {filteredWatchlist.length === 0 ? (
        <div className='text-center py-16'>
          <div className='w-24 h-24 mx-auto mb-6 bg-gray-700/30 rounded-full flex items-center justify-center'>
            <FaClock className="text-gray-400 text-3xl" />
          </div>
          <h3 className='text-xl font-semibold text-white mb-2'>No movies in watchlist</h3>
          <p className='text-gray-400 mb-6'>Start adding movies to your watchlist by clicking the clock icon</p>
          <Link
            to='/'
            className='inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors duration-200'
          >
            <FaClock className="text-sm" />
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filteredWatchlist.map((movie) => (
            <div key={movie.id} className='group relative bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10'>
              <div className='relative'>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className='w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <div className='absolute bottom-4 left-4 right-4'>
                    <div className='flex items-center justify-between mb-2'>
                      <div className='flex items-center gap-1'>
                        <FaStar className="text-yellow-400 text-sm" />
                        <span className='text-white text-sm font-medium'>{movie.vote_average?.toFixed(1)}</span>
                      </div>
                      <span className='text-gray-300 text-xs'>{movie.release_date?.split('-')[0]}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveFromWatchlist(movie)}
                      className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-colors duration-200'
                    >
                      Remove from Watchlist
                    </button>
                  </div>
                </div>
              </div>
              <div className='p-4'>
                <h3 className='text-white font-semibold text-lg mb-2 line-clamp-2'>{movie.title}</h3>
                <p className='text-gray-400 text-sm line-clamp-3'>{movie.overview}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;