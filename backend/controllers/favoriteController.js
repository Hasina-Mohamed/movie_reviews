const Favorite = require('../model/favoriteModel');

// Add movie to favorites
const addToFavorites = async (req, res) => {
  try {
    const { movieId, movieData } = req.body;
    const userId = req.user.id;

    // Check if movie already exists in favorites
    const existingFavorite = await Favorite.findOne({ userId, movieId });
    if (existingFavorite) {
      return res.status(400).json({ message: 'Movie already in favorites' });
    }

    // Create new favorite
    const favorite = new Favorite({
      userId,
      movieId,
      movieData
    });

    await favorite.save();
    res.status(201).json({ message: 'Added to favorites', favorite });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Remove movie from favorites
const removeFromFavorites = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user.id;

    const deletedFavorite = await Favorite.findOneAndDelete({ userId, movieId });
    if (!deletedFavorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user's favorites
const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    const favorites = await Favorite.find({ userId }).sort({ addedAt: -1 });
    
    // Extract movie data from favorites
    const favoriteMovies = favorites.map(fav => fav.movieData);
    
    res.json({ favorites: favoriteMovies });
  } catch (error) {
    console.error('Error getting favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Clear all favorites for a user
const clearFavorites = async (req, res) => {
  try {
    const userId = req.user.id;
    await Favorite.deleteMany({ userId });
    res.json({ message: 'All favorites cleared' });
  } catch (error) {
    console.error('Error clearing favorites:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  clearFavorites
};
