import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { FaStar } from 'react-icons/fa6'
import { useCreateReviewMutation } from '../redux/slices/reviewSlices'
import toast from 'react-hot-toast'
const MovieReview = ({ setShowReview, movieId }) => {
    const [createReview] = useCreateReviewMutation();
    const star = Array(5).fill(0)
    const [currentValue, setCurrentValues] = useState(0);
    const [hoverValue, setHoverValues] = useState(undefined);

    const handleClick = (value) => {
        setCurrentValues(value);
    }
    const handleMouseHover = (value) => {
        setHoverValues(value);
    }

    const handleMouseLeave = () => {
        setHoverValues(undefined);
    }
    const initialValues = {
        comment: ''
    }
    const handleSubmit = async (values) => {
        const { comment } = values;
         await createReview({  MovieReview : comment, MovieRate: currentValue , MovieId : movieId})
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
    return (
        <div className="w-full">
            <div className="bg-gradient-to-r from-[#FC4747]/10 to-transparent p-6 rounded-2xl border border-[#FC4747]/20">
                <h3 className="text-2xl font-bold text-white mb-6">Share Your Review</h3>
                
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValues}>
                    <Form className='w-full space-y-6'>
                        {/* Rating Section */}
                        <div className='space-y-3'>
                            <label className='text-lg font-semibold text-white'>Rate this movie</label>
                            <div className='flex items-center gap-4'>
                                <div className='flex items-center gap-1'>
                                    {star.map((item, index) => {
                                        return (
                                            <FaStar 
                                                key={index}
                                                size={28}
                                                onClick={() => handleClick(index + 1)}
                                                className={`${(hoverValue || currentValue) > index 
                                                    ? "text-yellow-400" 
                                                    : "text-gray-500"
                                                } cursor-pointer hover:text-yellow-300 transition-colors duration-200`}
                                                onMouseOver={() => handleMouseHover(index + 1)}
                                                onMouseLeave={() => handleMouseLeave()} 
                                            />
                                        )
                                    })}
                                </div>
                                <span className="text-lg text-gray-300 font-medium">
                                    {currentValue > 0 ? `${currentValue}/5` : 'Select rating'}
                                </span>
                            </div>
                        </div>

                        {/* Comment Section */}
                        <div className='space-y-3'>
                            <label className='text-lg font-semibold text-white'>Write your review</label>
                            <Field 
                                as='textarea' 
                                name='comment' 
                                rows='6'
                                className="w-full p-4 bg-[#0E1628] text-white rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FC4747] focus:border-transparent resize-none placeholder-gray-400"
                                placeholder='Share your thoughts about this movie. What did you like or dislike? How was the story, acting, or cinematography?'
                            />
                        </div>

                        {/* Submit Buttons */}
                        <div className='flex items-center gap-4 pt-4'>
                            <button 
                                type='submit'
                                disabled={!currentValue}
                                className='flex items-center gap-2 px-8 py-3 bg-[#FC4747] text-white font-semibold rounded-xl hover:bg-[#FC4747]/80 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                            >
                                <FaStar />
                                Submit Review
                            </button>
                            <button 
                                type='button'
                                onClick={() => setShowReview(false)}
                                className='px-6 py-3 bg-gray-600 text-white font-medium rounded-xl hover:bg-gray-700 transition-colors'
                            >
                                Cancel
                            </button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default MovieReview