import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromWatchlist } from '../redux/slices/watchlistSlice';
import { FaTrash, FaStar } from 'react-icons/fa';

const Watchlist = () => {
  const dispatch = useDispatch();
  const { watchlistMovies } = useSelector((state) => state.watchlist);

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6">My Watchlist</h1>
      
      {watchlistMovies.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-lg mb-4">Your watchlist is empty</p>
          <Link to="/" className="btn-primary inline-block">Browse Movies</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {watchlistMovies.map((movie) => (
            <div key={movie.id} className="card relative group">
              <div className="absolute top-2 right-2 z-10">
                <button 
                  onClick={() => dispatch(removeFromWatchlist(movie))}
                  className="p-2 bg-accent rounded-full opacity-80 hover:opacity-100 transition-opacity"
                >
                  <FaTrash size={14} />
                </button>
              </div>
              
              <Link to={`/movie-detail/${movie.id}`} state={movie}>
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img 
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                    alt={movie.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute bottom-2 right-2 bg-primary bg-opacity-80 p-2 rounded-lg flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-1 truncate">{movie.title}</h3>
                <p className="text-textSecondary text-sm">
                  {new Date(movie.release_date).getFullYear()}
                </p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;