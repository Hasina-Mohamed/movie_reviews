import { useEffect, useState } from 'react';
import axios from 'axios';

const GenreFilter = ({ onGenreSelect }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleGenreClick = (genreId) => {
    if (selectedGenre === genreId) {
      setSelectedGenre(null);
      onGenreSelect(null);
    } else {
      setSelectedGenre(genreId);
      onGenreSelect(genreId);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Filter by Genre</h3>
      <div className="flex flex-wrap gap-2">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedGenre === genre.id
                ? 'bg-accent text-white'
                : 'bg-primary text-textSecondary hover:bg-opacity-80'
            } transition-colors`}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;


