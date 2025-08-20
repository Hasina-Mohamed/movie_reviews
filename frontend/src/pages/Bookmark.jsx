import React, { useEffect, useState } from 'react'
import { FaHeart, FaSearch, FaStar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromFavorites, syncFavoritesWithAuth } from '../redux/slices/bookmarkSlice'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

const Bookmark = () => {
  const dispatch = useDispatch();
  const favoriteMovies = useSelector(state => state.favorites.favoriteMovies)
  const [auth, setAuth] = useState(false);
  const userToken = Cookies.get('userToken');
  useEffect(() => {
    if (userToken) {
      setAuth(true);
    } else {
      setAuth(false);
    }
    // Sync favorites with authentication state
    dispatch(syncFavoritesWithAuth());
  }, [userToken, dispatch])
  const [searchByTitle, setSearchByTitle] = useState('')

  return (
    <div className='w-full'>
      <div className='mb-8'>
        <div className='flex items-center gap-3 mb-4'>
          <FaHeart className="text-red-500 text-2xl" />
          <h1 className='text-3xl font-bold text-white'>My Favorites</h1>
          <span className='bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium'>
            {favoriteMovies?.length} movies
          </span>
        </div>
        <p className='text-gray-400'>Movies you've added to your favorites collection</p>
      </div>

      <div className='relative mb-6'>
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder='Search your favorite movies...'
          value={searchByTitle}
          className='w-full pl-12 pr-4 py-3 bg-[#161D2F] text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent' 
          onChange={(e) => setSearchByTitle(e.target.value)} 
        />
      </div>

      {favoriteMovies?.length === 0 ? (
        <div className="text-center py-20 bg-[#161D2F]/50 rounded-2xl">
          <FaHeart className="text-6xl text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">No favorites yet</h2>
          <p className="text-gray-400 mb-6">Start adding movies to your favorites by clicking the heart icon</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors">
            <FaSearch />
            Discover Movies
          </Link>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {favoriteMovies?.filter(movie => {
            return movie.title.toLowerCase().includes(searchByTitle.toLowerCase())
          })?.map(movie => (
              <div key={movie?.id} className="bg-[#161D2F] rounded-lg overflow-hidden group relative hover:scale-105 transition-all duration-300">
                {auth && (
                  <button 
                    onClick={() => dispatch(removeFromFavorites(movie))}
                    className="absolute top-2 right-2 z-10 bg-black/70 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-500"
                  >
                    <FaHeart className="text-red-500 hover:text-white" />
                  </button>
                )}
                
                <Link to={`/movie-detail/${movie?.id}`} state={movie} className="block">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path || movie?.poster_path}`}
                      alt={movie?.title}
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
                    <h3 className="font-medium text-lg truncate text-white">{movie?.title}</h3>
                    <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                      <span>Lang: {movie?.original_language?.toUpperCase()}</span>
                      <span>{new Date(movie?.release_date).getFullYear()}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}

export default Bookmark