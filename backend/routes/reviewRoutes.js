const express = require('express');
const { createReview, updateReview, deleteReview, getreview } = require('../controllers/reviewController');
const { userAuthenticate } = require('../middleware/userAuthenticate');
const reviewRoutes = express.Router();
reviewRoutes.post('/review/create',userAuthenticate, createReview);
reviewRoutes.put('/review/:id', userAuthenticate,updateReview);
reviewRoutes.delete('/review/:id', userAuthenticate,deleteReview);
reviewRoutes.get('/reviews', getreview);

module.exports = reviewRoutes;