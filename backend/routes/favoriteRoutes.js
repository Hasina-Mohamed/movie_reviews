const express = require('express');
const { addToFavorites, removeFromFavorites, getFavorites, clearFavorites } = require('../controllers/favoriteController');
const { userAuthenticate } = require('../middleware/userAuthenticate');
const favoriteRoutes = express.Router();

// All routes require authentication
favoriteRoutes.use(userAuthenticate);

// Add movie to favorites
favoriteRoutes.post('/favorites/add', addToFavorites);

// Remove movie from favorites
favoriteRoutes.delete('/favorites/:movieId', removeFromFavorites);

// Get user's favorites
favoriteRoutes.get('/favorites', getFavorites);

// Clear all favorites
favoriteRoutes.delete('/favorites', clearFavorites);

module.exports = favoriteRoutes;
