import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaBookmark, FaStar } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { bookmarkMovie } from '../redux/slices/bookmarkSlice';
import Cookies from 'js-cookie';
import GenreFilter from '../components/GenreFilter';

const Movies = () => {
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const userToken = Cookies.get('userToken');
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [searchByTitle, setSearchByTitle] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);
  
  useEffect(() => {
    if (userToken) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [userToken]);

  useEffect(() => {
    getMovies();
  }, [selectedGenre]);
  
  const getMovies = async () => {
    setLoading(true);
    try {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}`;
      
      if (selectedGenre) {
        url += `&with_genres=${selectedGenre}`;
      }
      
      const response = await axios.get(url);
      setMovies(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">All Movies ({movies?.results?.length || 0})</h1>
        <input 
          type="text" 
          placeholder="Search movie title..." 
          className="w-full md:w-96 p-3 bg-[#161D2F] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FC4747]"
          onChange={(e) => setSearchByTitle(e.target.value)}
          value={searchByTitle}
        />
      </div>
      
      <GenreFilter onGenreSelect={setSelectedGenre} />
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FC4747]"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-8">
          {movies?.results
            ?.filter(movie => movie.title.toLowerCase().includes(searchByTitle.toLowerCase()))
            .map(movie => (
              <div 
                key={movie.id} 
                className="bg-[#161D2F] rounded-lg overflow-hidden group relative hover:scale-105 transition-all duration-300"
              >
                {auth && (
                  <button 
                    onClick={() => dispatch(bookmarkMovie(movie))}
                    className="absolute top-2 right-2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <FaBookmark className="text-white" />
                  </button>
                )}
                
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
      )}
      
      {movies?.results?.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-xl text-[#8E95A9]">No movies found</p>
          <button 
            onClick={() => {
              setSelectedGenre(null);
              setSearchByTitle('');
              getMovies();
            }}
            className="mt-4 bg-[#FC4747] text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default Movies

