import { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const AdvancedSearch = ({ onSearchResults, onFiltersChange }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  
  const [filters, setFilters] = useState({
    query: '',
    genre: '',
    year: '',
    rating: '',
    sortBy: 'popularity.desc',
    language: '',
    adult: false
  });

  const sortOptions = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'popularity.asc', label: 'Least Popular' },
    { value: 'vote_average.desc', label: 'Highest Rated' },
    { value: 'vote_average.asc', label: 'Lowest Rated' },
    { value: 'release_date.desc', label: 'Newest First' },
    { value: 'release_date.asc', label: 'Oldest First' },
    { value: 'title.asc', label: 'A-Z' },
    { value: 'title.desc', label: 'Z-A' }
  ];

  const languages = [
    { value: '', label: 'All Languages' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'zh', label: 'Chinese' },
    { value: 'hi', label: 'Hindi' }
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`
      );
      setGenres(response.data.genres);
    } catch (error) {
      // Error fetching genres
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const searchMovies = async () => {
    setLoading(true);
    try {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}`;
      
      // Add query search if provided
      if (filters.query.trim()) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(filters.query)}`;
      }

      // Add filters
      if (filters.genre) url += `&with_genres=${filters.genre}`;
      if (filters.year) url += `&year=${filters.year}`;
      if (filters.rating) url += `&vote_average.gte=${filters.rating}`;
      if (filters.language) url += `&with_original_language=${filters.language}`;
      if (!filters.adult) url += `&include_adult=false`;
      
      // Add sorting (only for discover endpoint)
      if (!filters.query.trim()) {
        url += `&sort_by=${filters.sortBy}`;
      }

      const response = await axios.get(url);
      onSearchResults(response.data);
    } catch (error) {
      // Error searching movies
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    const clearedFilters = {
      query: '',
      genre: '',
      year: '',
      rating: '',
      sortBy: 'popularity.desc',
      language: '',
      adult: false
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    searchMovies();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchMovies();
  };

  return (
    <div className="bg-[#161D2F] rounded-lg p-6 mb-6">
      {/* Search Bar */}
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search movies by title, actor, director..."
            value={filters.query}
            onChange={(e) => handleFilterChange('query', e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-[#0E1628] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FC4747]"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-3 bg-[#FC4747] text-white rounded-lg hover:bg-opacity-80 transition-colors"
        >
          <FaFilter />
          Filters
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="border-t border-gray-700 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Genre Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
              <select
                value={filters.genre}
                onChange={(e) => handleFilterChange('genre', e.target.value)}
                className="w-full p-2 bg-[#0E1628] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FC4747]"
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="w-full p-2 bg-[#0E1628] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FC4747]"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Min Rating</label>
              <select
                value={filters.rating}
                onChange={(e) => handleFilterChange('rating', e.target.value)}
                className="w-full p-2 bg-[#0E1628] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FC4747]"
              >
                <option value="">Any Rating</option>
                <option value="9">9.0+ Exceptional</option>
                <option value="8">8.0+ Excellent</option>
                <option value="7">7.0+ Very Good</option>
                <option value="6">6.0+ Good</option>
                <option value="5">5.0+ Average</option>
              </select>
            </div>

            {/* Language Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
              <select
                value={filters.language}
                onChange={(e) => handleFilterChange('language', e.target.value)}
                className="w-full p-2 bg-[#0E1628] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FC4747]"
              >
                {languages.map((lang) => (
                  <option key={lang.value} value={lang.value}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full p-2 bg-[#0E1628] text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FC4747]"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Adult Content */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="adult"
                checked={filters.adult}
                onChange={(e) => handleFilterChange('adult', e.target.checked)}
                className="mr-2 w-4 h-4 text-[#FC4747] bg-[#0E1628] border-gray-700 rounded focus:ring-[#FC4747]"
              />
              <label htmlFor="adult" className="text-sm text-gray-300">
                Include Adult Content
              </label>
            </div>
          </div>

          {/* Clear Filters Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FaTimes />
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
