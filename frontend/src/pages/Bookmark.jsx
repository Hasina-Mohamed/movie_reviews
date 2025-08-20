import React, { useEffect, useState } from 'react'
import { FaHeart, FaSearch, FaStar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromFavorites, syncFavoritesWithAuth, syncFavoritesFromDatabase } from '../redux/slices/bookmarkSlice'
import { useGetFavoritesQuery, useRemoveFromFavoritesMutation } from '../redux/slices/favoriteApiSlice'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

const Bookmark = () => {
  const dispatch = useDispatch();
  const favoriteMovies = useSelector(state => state.favorites.favoriteMovies)
  const [auth, setAuth] = useState(false);
  const userToken = Cookies.get('userToken');
  
  // Database API queries
  const { data: dbFavorites, isLoading: isLoadingFavorites, error: favoritesError } = useGetFavoritesQuery(undefined, {
    skip: !userToken,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true
  });
  const [removeFromFavoritesDb] = useRemoveFromFavoritesMutation();
  
  useEffect(() => {
    if (userToken) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [userToken])

  // Sync database favorites to Redux state when data is loaded
  useEffect(() => {
    if (dbFavorites && dbFavorites.favorites) {
      dispatch(syncFavoritesFromDatabase(dbFavorites.favorites));
    }
  }, [dbFavorites, dispatch]);

  // Use database favorites if available, otherwise fall back to localStorage
  const displayFavorites = dbFavorites?.favorites || favoriteMovies || [];
  
  const [searchByTitle, setSearchByTitle] = useState('')

  const handleRemoveFromFavorites = async (movie) => {
    try {
      if (userToken) {
        // Remove from database
        await removeFromFavoritesDb(movie.id).unwrap();
      } else {
        // Remove from localStorage
        dispatch(removeFromFavorites(movie));
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const filteredFavorites = displayFavorites.filter(movie =>
    movie.title?.toLowerCase().includes(searchByTitle.toLowerCase())
  );

  if (isLoadingFavorites && userToken) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className='w-full'>
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-4'>
          <FaHeart className="text-red-500 text-2xl" />
          <h1 className='text-3xl font-bold text-white'>My Favorites</h1>
          <span className='bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium'>
            {displayFavorites?.length} movies
          </span>
        </div>
        <p className='text-gray-400'>Movies you've added to your favorites collection</p>
      </div>

      <div className='relative mb-6'>
        <div className='relative'>
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search your favorite movies..."
            value={searchByTitle}
            onChange={(e) => setSearchByTitle(e.target.value)}
            className='w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent'
          />
        </div>
      </div>

      {filteredFavorites.length === 0 ? (
        <div className='text-center py-16'>
          <div className='w-24 h-24 mx-auto mb-6 bg-gray-700/30 rounded-full flex items-center justify-center'>
            <FaHeart className="text-gray-400 text-3xl" />
          </div>
          <h3 className='text-xl font-semibold text-white mb-2'>No favorites yet</h3>
          <p className='text-gray-400 mb-6'>Start adding movies to your favorites by clicking the heart icon</p>
          <Link
            to='/'
            className='inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-colors duration-200'
          >
            <FaHeart className="text-sm" />
            Discover Movies
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filteredFavorites.map((movie) => (
            <div key={movie.id} className='group relative bg-gray-800/30 rounded-xl overflow-hidden border border-gray-700/30 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10'>
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
                      onClick={() => handleRemoveFromFavorites(movie)}
                      className='w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-semibold text-sm transition-colors duration-200'
                    >
                      Remove from Favorites
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
  )
}

export default Bookmark