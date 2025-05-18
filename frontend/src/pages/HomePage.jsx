import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaStar, FaPlay } from 'react-icons/fa';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // Fetch trending movies
        const trendingResponse = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_API_KEY}`
        );
        setTrendingMovies(trendingResponse.data.results.slice(0, 6));
        
        // Set a random trending movie as featured
        const randomIndex = Math.floor(Math.random() * 5);
        setFeaturedMovie(trendingResponse.data.results[randomIndex]);
        
        // Fetch top rated movies
        const topRatedResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}`
        );
        setTopRatedMovies(topRatedResponse.data.results.slice(0, 6));
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Hero Section with Featured Movie */}
      {featuredMovie && (
        <div className="relative h-[70vh] w-full">
          <div className="absolute inset-0">
            <img 
              src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`} 
              alt={featuredMovie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{featuredMovie.title}</h1>
              <div className="flex items-center mb-4 space-x-4">
                <span className="flex items-center">
                  <FaStar className="text-yellow-400 mr-1" />
                  {featuredMovie.vote_average.toFixed(1)}
                </span>
                <span>{new Date(featuredMovie.release_date).getFullYear()}</span>
              </div>
              <p className="text-lg text-gray-300 mb-6 line-clamp-3">{featuredMovie.overview}</p>
              <div className="flex space-x-4">
                <Link 
                  to={`/movie-detail/${featuredMovie.id}`} 
                  state={featuredMovie}
                  className="btn-primary flex items-center"
                >
                  <FaPlay className="mr-2" /> Watch Now
                </Link>
                <Link 
                  to={`/movie-detail/${featuredMovie.id}`} 
                  state={featuredMovie}
                  className="px-4 py-2 border border-white rounded-lg hover:bg-white hover:text-secondary transition-colors"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Trending Movies Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Trending This Week</h2>
          <Link to="/movies" className="text-accent hover:underline">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {trendingMovies.map(movie => (
            <Link 
              key={movie.id} 
              to={`/movie-detail/${movie.id}`}
              state={movie}
              className="card group p-0 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute bottom-2 right-2 bg-primary bg-opacity-80 p-1 rounded-md flex items-center">
                  <FaStar className="text-yellow-400 mr-1" size={12} />
                  <span className="text-sm">{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium truncate">{movie.title}</h3>
                <p className="text-textSecondary text-sm">
                  {new Date(movie.release_date).getFullYear()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Top Rated Section */}
      <section className="container mx-auto px-4 py-12 bg-primary rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Top Rated Movies</h2>
          <Link to="/movies" className="text-accent hover:underline">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {topRatedMovies.map(movie => (
            <Link 
              key={movie.id} 
              to={`/movie-detail/${movie.id}`}
              state={movie}
              className="bg-secondary rounded-lg overflow-hidden group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                  alt={movie.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute bottom-2 right-2 bg-primary bg-opacity-80 p-1 rounded-md flex items-center">
                  <FaStar className="text-yellow-400 mr-1" size={12} />
                  <span className="text-sm">{movie.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="font-medium truncate">{movie.title}</h3>
                <p className="text-textSecondary text-sm">
                  {new Date(movie.release_date).getFullYear()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-primary rounded-xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with New Releases</h2>
          <p className="text-textSecondary mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to get notified about new movie releases, reviews, and exclusive content.
          </p>
          <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="input-field flex-grow"
            />
            <button className="btn-primary whitespace-nowrap">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;