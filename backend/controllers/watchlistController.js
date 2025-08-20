const Watchlist = require('../model/watchlistModel');

// Add movie to watchlist
const addToWatchlist = async (req, res) => {
  try {
    const { movieId, movieData } = req.body;
    const userId = req.user.id;

    // Check if movie already exists in watchlist
    const existingWatchlist = await Watchlist.findOne({ userId, movieId });
    if (existingWatchlist) {
      return res.status(400).json({ message: 'Movie already in watchlist' });
    }

    // Create new watchlist entry
    const watchlistItem = new Watchlist({
      userId,
      movieId,
      movieData
    });

    await watchlistItem.save();
    res.status(201).json({ message: 'Added to watchlist', watchlistItem });
  } catch (error) {
    console.error('Error adding to watchlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Remove movie from watchlist
const removeFromWatchlist = async (req, res) => {
  try {
    const { movieId } = req.params;
    const userId = req.user.id;

    const deletedWatchlist = await Watchlist.findOneAndDelete({ userId, movieId });
    if (!deletedWatchlist) {
      return res.status(404).json({ message: 'Watchlist item not found' });
    }

    res.json({ message: 'Removed from watchlist' });
  } catch (error) {
    console.error('Error removing from watchlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get user's watchlist
const getWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const watchlist = await Watchlist.find({ userId }).sort({ addedAt: -1 });
    
    // Extract movie data from watchlist
    const watchlistMovies = watchlist.map(item => item.movieData);
    
    res.json({ watchlist: watchlistMovies });
  } catch (error) {
    console.error('Error getting watchlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Clear all watchlist for a user
const clearWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    await Watchlist.deleteMany({ userId });
    res.json({ message: 'All watchlist cleared' });
  } catch (error) {
    console.error('Error clearing watchlist:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
  clearWatchlist
};
