const express = require('express');
const { addToWatchlist, removeFromWatchlist, getWatchlist, clearWatchlist } = require('../controllers/watchlistController');
const { userAuthenticate } = require('../middleware/userAuthenticate');
const watchlistRoutes = express.Router();

// All routes require authentication
watchlistRoutes.use(userAuthenticate);

// Add movie to watchlist
watchlistRoutes.post('/watchlist/add', addToWatchlist);

// Remove movie from watchlist
watchlistRoutes.delete('/watchlist/:movieId', removeFromWatchlist);

// Get user's watchlist
watchlistRoutes.get('/watchlist', getWatchlist);

// Clear all watchlist
watchlistRoutes.delete('/watchlist', clearWatchlist);

module.exports = watchlistRoutes;
