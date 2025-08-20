import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart, FaStar, FaFire, FaTrophy, FaClock, FaRocket } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggleFavorite, syncFavoritesWithAuth } from '../redux/slices/bookmarkSlice';
import { syncWatchlistWithAuth } from '../redux/slices/watchlistSlice';
import Cookies from 'js-cookie';
import AdvancedSearch from '../components/AdvancedSearch';

const Movies = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const userToken = Cookies.get('userToken');
  const dispatch = useDispatch();
  const { favoriteMovies } = useSelector((state) => state.favorites);
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [currentFilters, setCurrentFilters] = useState({});
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  useEffect(() => {
    if (userToken) {
      setAuth(true);
    } else {
      setAuth(false);
    }
    // Sync favorites and watchlist with authentication state
    dispatch(syncFavoritesWithAuth());
    dispatch(syncWatchlistWithAuth());
  }, [userToken, dispatch]);

  useEffect(() => {
    // Load all movie categories on component mount
    loadAllMovieCategories();
  }, []);
  
  const loadAllMovieCategories = async () => {
    setLoading(true);
    try {
      const [popularRes, trendingRes, topRatedRes, upcomingRes] = await Promise.all([
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&sort_by=popularity.desc`),
        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_API_KEY}`),
        axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}`),
        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_API_KEY}`)
      ]);

      setMovies(popularRes.data);
      setTrendingMovies(trendingRes.data);
      setTopRatedMovies(topRatedRes.data);
      setUpcomingMovies(upcomingRes.data);
    } catch (error) {
      // Error fetching movies
    } finally {
      setLoading(false);
    }
  };

  const handleSearchResults = (results) => {
    setMovies(results);
    setShowSearchResults(true);
  };

  const handleFiltersChange = (filters) => {
    setCurrentFilters(filters);
    // If user is actively searching, show search results
    if (filters.query || filters.genre || filters.year || filters.rating) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
  };

  const MovieSection = ({ title, movies, icon }) => (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h2 className="text-2xl font-bold text-white">{title}</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies?.results?.slice(0, 10).map(movie => (
          <div 
            key={movie.id} 
            className="bg-[#161D2F] rounded-lg overflow-hidden group relative hover:scale-105 transition-all duration-300"
          >
            <button 
              onClick={() => dispatch(toggleFavorite(movie))}
              className="absolute top-2 right-2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              {favoriteMovies.some(fav => fav.id === movie.id) ? (
                <FaHeart className="text-red-500" />
              ) : (
                <FaRegHeart className="text-white" />
              )}
            </button>
            
            <Link to={`/movie-detail/${movie.id}`} state={movie} className="block">
              <div className="relative h-64 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                  alt={movie.title}
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
                <h3 className="font-medium text-lg truncate">{movie.title}</h3>
                <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
                  <span>Lang: {movie.original_language.toUpperCase()}</span>
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Discover Movies</h1>
        <p className="text-gray-400 mb-6">Find your next favorite movie with our advanced search and filtering system</p>
      </div>
      
      <AdvancedSearch 
        onSearchResults={handleSearchResults} 
        onFiltersChange={handleFiltersChange}
      />


      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FC4747]"></div>
        </div>
      ) : showSearchResults ? (
        // Search Results
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {currentFilters.query ? `Search Results for "${currentFilters.query}"` : 'Search Results'} 
              <span className="text-gray-400 ml-2">({movies?.results?.length || 0} movies)</span>
            </h2>
            <button 
              onClick={() => {
                setShowSearchResults(false);
                setCurrentFilters({});
                loadAllMovieCategories();
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back to Browse
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies?.results?.map(movie => (
              <div 
                key={movie.id} 
                className="bg-[#161D2F] rounded-lg overflow-hidden group relative hover:scale-105 transition-all duration-300"
              >
                <button 
                  onClick={() => dispatch(toggleFavorite(movie))}
                  className="absolute top-2 right-2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                >
                  {favoriteMovies.some(fav => fav.id === movie.id) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart className="text-white" />
                  )}
                </button>
                
                <Link to={`/movie-detail/${movie.id}`} state={movie} className="block">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path || movie.poster_path}`}
                      alt={movie.title}
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
                    <h3 className="font-medium text-lg truncate">{movie.title}</h3>
                    <div className="flex justify-between items-center mt-2 text-sm text-[#8E95A9]">
                      <span>Lang: {movie.original_language.toUpperCase()}</span>
                      <span>{new Date(movie.release_date).getFullYear()}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {movies?.results?.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64">
              <p className="text-xl text-[#8E95A9]">No movies found</p>
              <p className="text-[#8E95A9] mt-2">Try adjusting your search criteria or filters</p>
            </div>
          )}
        </div>
      ) : (
        // Browse Categories
        <div>
          <MovieSection 
            title="Trending This Week" 
            movies={trendingMovies} 
            icon={<span className="text-2xl">🔥</span>}
          />
          
          <MovieSection 
            title="Top Rated Movies" 
            movies={topRatedMovies} 
            icon={<span className="text-2xl">🏆</span>}
          />
          
          <MovieSection 
            title="Popular Movies" 
            movies={movies} 
            icon={<span className="text-2xl">🚀</span>}
          />
          
          <MovieSection 
            title="Coming Soon" 
            movies={upcomingMovies} 
            icon={<span className="text-2xl">⏰</span>}
          />
        </div>
      )}
    </div>
  );
}

export default Movies

