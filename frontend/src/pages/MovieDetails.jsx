import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { MovieReview } from '../ExportFiles';
import { useDeleteReviewMutation, useGetReviewsQuery } from '../redux/slices/reviewSlices';
import { useGetCurrentUserQuery } from '../redux/slices/userSlices';
import { CiEdit } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../redux/slices/watchlistSlice';
import { FaBookmark, FaRegBookmark, FaListUl, FaRegListAlt } from "react-icons/fa";

const MovieDetails = () => {
    const [deleteReview] = useDeleteReviewMutation()
    const { data: MovieReviews = [] } = useGetReviewsQuery();
    const { data: user = [] } = useGetCurrentUserQuery()
    const currentUser = user?.user || {};
    const currentReview = MovieReviews?.reviews || [];
    const [showReview, setShowReview] = useState(false);
    const movie = useLocation().state;
    const getReviewOfMovieDetail = currentReview?.filter(res => {
        return res?.MovieId == movie?.id
    })

    const formatDate = (date) => {
        return new Date(date).toLocaleString();
    }

    const [auth, setAuth] = useState(false);
    const userToken = Cookies.get('userToken');
    useEffect(() => {
        if (userToken) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    }, [])

    const handleDelete = (id) => {
        if (confirm('are you sure to delete this one')) {
            deleteReview(id)
                .then((res) => {
                    const status = res?.data?.status;
                    if (status) {
                        toast.success(res?.data?.message);
                    } else {
                        toast.error(res?.data?.message);
                    }
                }).catch((err) => {
                    console.log(err);
                })
        }
    }

    const dispatch = useDispatch();
    const { watchlistMovies } = useSelector((state) => state.watchlist);
    const isInWatchlist = watchlistMovies.some((m) => m.id === movie?.id);

    const handleWatchlist = () => {
        if (isInWatchlist) {
            dispatch(removeFromWatchlist(movie));
        } else {
            dispatch(addToWatchlist(movie));
        }
    };

    return (
        <div className="w-full p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 justify-between items-start gap-5 p-3">
                <img className="w-full rounded-md object-cover" src={`${'https://image.tmdb.org/t/p/w500' + movie?.backdrop_path || 'https://image.tmdb.org/t/p/w500' + movie?.poster_path}`} alt="" />
                <div className="flex flex-col justify-start item-start gap-2 space-y-2">
                    <div className="flex flex-row justify-between md:justify-start items-center gap-5 ">
                        <span className=" text-center bg-green-500 p-1 rounded md:font-bold text-white text-lg">
                            {movie?.vote_average * 10} % matches{" "}
                        </span>
                        <span className=" font-thin text-lg">
                            {movie?.release_date || movie?.first_air_date}
                        </span>
                        <span className="flex h-4 items-center justify-center rounded  border border-white/40 px-1.5 text-xs">
                            HD
                        </span>
                    </div>
                    <span className=" text-lg text-gray-400 capitalize space-x-1">title :<small className="text-white ml-2">{movie?.title}</small></span>
                    <span className=" text-lg text-gray-400 capitalize space-x-1">original_language :<small className="text-white ml-2">{movie?.original_language}</small></span>
                    <span className=" text-lg text-gray-400 capitalize space-x-1">overview : <small className="text-white ml-2">{movie?.overview}</small></span>
                    <span className=" text-lg text-gray-400 capitalize space-x-1">vote_average :<small className="text-white ml-2">{movie?.vote_average}</small></span>
                    <span className=" text-lg text-gray-400 capitalize space-x-1">vote_count :<small className="text-white ml-2">{movie?.vote_count}</small></span>
                    {/* <BsFillPlusCircleFill size={25} className="mt-2 cursor-pointer text-white" onClick={() => handleMovies()} /> */}
                </div>

            </div>
            <div className='w-full'>
                {
                    auth && <button className="px-4 py-2  shadow text-[#FF6F61] text-lg bg-white"
                        onClick={() => setShowReview(!showReview)}> Create Review</button>
                }
            </div>
            {
                showReview && <MovieReview showReview={showReview} setShowReview={setShowReview} movieId={movie?.id} />
            }

            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10'>
                {
                    getReviewOfMovieDetail?.map(review => {
                        return <div key={review?._id} className='w-full p-3 bg-[#161D2F] text-white space-y-3 mt-10'>
                            <div className='w-full flex flex-row justify-start items-center gap-3'>
                                <img src="/public/images/avatarProfile.png" className='w-10 h-10 rounded-full shadow' alt="" />
                                <div className='w-fit space-y-1'>
                                    <h1>{review?.user_id?.username}</h1>
                                    <p>{formatDate(review?.createdAt)}</p>
                                </div>
                            </div>
                            <p className='text-base font-light'>{review?.MovieReview}</p>

                            {
                                review?.user_id?._id == currentUser?._id && (
                                    <div className='mt-10 w-full flex flex-row justify-end items-center gap-3'>
                                        <CiEdit size={20} />
                                        <AiTwotoneDelete size={20} onClick={() => handleDelete(review?._id)} />
                                    </div>
                                )
                            }
                        </div>
                    })
                }
            </div>
            {auth && (
                <button 
                    onClick={handleWatchlist}
                    className="flex items-center gap-2 px-4 py-2 bg-primary rounded-lg hover:bg-opacity-80 transition-all"
                >
                    {isInWatchlist ? (
                        <>
                            <FaListUl className="text-accent" />
                            <span>Remove from Watchlist</span>
                        </>
                    ) : (
                        <>
                            <FaRegListAlt />
                            <span>Add to Watchlist</span>
                        </>
                    )}
                </button>
            )}
        </div>
    )
}

export default MovieDetails
