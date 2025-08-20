import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MovieReview } from '../ExportFiles';
import { useGetReviewsQuery } from '../redux/slices/reviewSlices';
import { useGetCurrentUserQuery } from '../redux/slices/userSlices';
import EnhancedReview from '../components/EnhancedReview';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../redux/slices/watchlistSlice';
import { useAddToWatchlistMutation, useRemoveFromWatchlistMutation } from '../redux/slices/watchlistApiSlice';
import { FaBookmark, FaRegBookmark, FaListUl, FaRegListAlt, FaPlus, FaStar } from "react-icons/fa";

const MovieDetails = () => {
    const { data: MovieReviews = [] } = useGetReviewsQuery();
    const { data: user = [], isLoading } = useGetCurrentUserQuery(undefined, {
        skip: !Cookies.get('userToken'), // Skip query if no token
        refetchOnMountOrArgChange: true, // Refetch when component mounts
        refetchOnFocus: true // Refetch when window regains focus
    });
    const currentUser = user?.user || {};
    const currentReview = MovieReviews?.reviews || [];
    const [showReview, setShowReview] = useState(false);
    const movie = useLocation().state;
    
    const movieReviews = currentReview?.filter(res => {
        return res?.MovieId == movie?.id
    });

    // Sort reviews by helpfulness and date
    const sortedReviews = [...movieReviews].sort((a, b) => {
        const helpfulnessA = (a.helpfulVotes || 0) - (a.notHelpfulVotes || 0);
        const helpfulnessB = (b.helpfulVotes || 0) - (b.notHelpfulVotes || 0);
        
        if (helpfulnessB !== helpfulnessA) {
            return helpfulnessB - helpfulnessA; // Sort by helpfulness first
        }
        
        return new Date(b.createdAt) - new Date(a.createdAt); // Then by date
    });

    // Calculate average rating
    const averageRating = movieReviews.length > 0 
        ? movieReviews.reduce((sum, review) => sum + review.MovieRate, 0) / movieReviews.length 
        : 0;

    const [auth, setAuth] = useState(false);
    const userToken = Cookies.get('userToken');
    useEffect(() => {
        if (userToken) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    }, [])

    const handleReviewDelete = (reviewId) => {
        // This will trigger a refetch through RTK Query
        // Review deleted
    }

    const dispatch = useDispatch();
    const { watchlistMovies } = useSelector((state) => state.watchlist);
    const isInWatchlist = watchlistMovies.some((m) => m.id === movie?.id);
    
    // Database API mutations
    const [addToWatchlistDb] = useAddToWatchlistMutation();
    const [removeFromWatchlistDb] = useRemoveFromWatchlistMutation();

    const handleWatchlist = async () => {
        try {
            if (userToken) {
                // Use database API when logged in
                if (isInWatchlist) {
                    await removeFromWatchlistDb(movie.id).unwrap();
                } else {
                    await addToWatchlistDb(movie).unwrap();
                }
            } else {
                // Use localStorage when not logged in
                if (isInWatchlist) {
                    dispatch(removeFromWatchlist(movie));
                } else {
                    dispatch(addToWatchlist(movie));
                }
            }
        } catch (error) {
            console.error('Error toggling watchlist:', error);
        }
    };

    return (
        <div className="w-full">
            {/* Hero Section with Backdrop */}
            <div className="relative">
                {/* Backdrop Image */}
                <div className="absolute inset-0 w-full h-96 md:h-[500px] overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path || movie?.poster_path}`}
                        alt={movie?.title}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/1920x1080?text=No+Image';
                        }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1628] via-[#0E1628]/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0E1628]/90 via-transparent to-[#0E1628]/60"></div>
                </div>

                {/* Content Container */}
                <div className="relative z-10 px-4 pt-20 pb-8">
                    <div className="flex flex-col lg:flex-row items-start gap-8 mt-32 md:mt-40">
                        {/* Movie Poster */}
                        <div className="flex-shrink-0">
                            <div className="relative group">
                                <img
                                    className="w-64 md:w-80 h-96 md:h-[480px] object-cover rounded-2xl shadow-2xl border border-gray-700/50"
                                    src={`https://image.tmdb.org/t/p/w500${movie?.poster_path || movie?.backdrop_path}`}
                                    alt={movie?.title}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/500x750?text=No+Poster';
                                    }}
                                />
                                {/* Hover Effect */}
                                <div className="absolute inset-0 bg-black/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>

                        {/* Movie Info */}
                        <div className="flex-1 space-y-6">
                            {/* Title and Year */}
                            <div className="space-y-2">
                                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                                    {movie?.title}
                                </h1>
                                <p className="text-xl text-gray-300">
                                    {new Date(movie?.release_date).getFullYear()} • {movie?.original_language?.toUpperCase()}
                                </p>
                            </div>

                            {/* Rating and Stats */}
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-500/30">
                                    <FaStar className="text-yellow-400" />
                                    <span className="text-xl font-semibold text-white">{movie?.vote_average?.toFixed(1)}</span>
                                    <span className="text-gray-300">/ 10</span>
                                </div>
                                
                                <div className="flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-500/30">
                                    <span className="text-blue-400 font-medium">{movie?.vote_count?.toLocaleString()}</span>
                                    <span className="text-gray-300">votes</span>
                                </div>

                                {movieReviews.length > 0 && (
                                    <div className="flex items-center gap-2 bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-green-500/30">
                                        <FaStar className="text-green-400" />
                                        <span className="text-xl font-semibold text-white">{averageRating.toFixed(1)}</span>
                                        <span className="text-gray-300">user rating</span>
                                    </div>
                                )}

                                <div className="bg-gray-700/50 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-600/50">
                                    <span className="text-gray-300 text-sm font-medium">HD</span>
                                </div>
                            </div>

                            {/* Overview */}
                            <div className="space-y-3 max-w-3xl">
                                <h2 className="text-2xl font-semibold text-white">Overview</h2>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    {movie?.overview}
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-4 pt-4">
                                {auth && (
                                    <>
                                        <button 
                                            className="flex items-center gap-3 px-6 py-3 bg-[#FC4747] text-white font-semibold rounded-xl hover:bg-[#FC4747]/80 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                            onClick={() => setShowReview(!showReview)}
                                        >
                                            <FaPlus />
                                            {movieReviews.some(r => r.user_id._id === currentUser._id) ? 'Update Review' : 'Write Review'}
                                        </button>

                                        <button 
                                            onClick={handleWatchlist}
                                            className="flex items-center gap-3 px-6 py-3 bg-gray-700/50 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-gray-600/50 transition-all duration-300 border border-gray-600/50"
                                        >
                                            {isInWatchlist ? (
                                                <>
                                                    <FaListUl className="text-[#FC4747]" />
                                                    Remove from Watchlist
                                                </>
                                            ) : (
                                                <>
                                                    <FaRegListAlt />
                                                    Add to Watchlist
                                                </>
                                            )}
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="px-4 pb-12">
                {/* Reviews Section */}
                <div className="bg-[#161D2F]/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <h2 className="text-3xl font-bold text-white">Community Reviews</h2>
                            <div className="bg-gray-700/50 px-4 py-2 rounded-full">
                                <span className="text-gray-300 font-medium">{movieReviews.length} reviews</span>
                            </div>
                        </div>
                    </div>

                    {showReview && (
                        <div className="mb-8 bg-[#0E1628]/50 rounded-2xl p-6 border border-gray-600/30">
                            <MovieReview showReview={showReview} setShowReview={setShowReview} movieId={movie?.id} />
                        </div>
                    )}

                    {/* Reviews List */}
                    <div className="space-y-6">
                        {sortedReviews.length > 0 ? (
                            sortedReviews.map(review => (
                                <EnhancedReview 
                                    key={review._id} 
                                    review={review} 
                                    onDelete={handleReviewDelete}
                                />
                            ))
                        ) : (
                            <div className="text-center py-16 bg-[#0E1628]/30 rounded-2xl border border-gray-700/30">
                                <div className="max-w-md mx-auto">
                                    <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaStar className="text-2xl text-gray-400" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white mb-2">No reviews yet</h3>
                                    <p className="text-gray-400 mb-6">Be the first to share your thoughts about this movie!</p>
                                    {auth && (
                                        <button 
                                            className="px-8 py-3 bg-[#FC4747] text-white font-semibold rounded-xl hover:bg-[#FC4747]/80 transition-all duration-300 transform hover:scale-105 shadow-lg"
                                            onClick={() => setShowReview(true)}
                                        >
                                            Write First Review
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails
