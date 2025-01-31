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
        <div className="w-full mt-10">
            <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}>
                <Form className='w-full flex flex-col justify-start items-start space-y-3 text-black'>
                    <div className='w-full flex flex-row justify-start items-center gap-3'>
                        <p className='text-white'>Your rating</p>
                        {
                            star.map((item, index) => {
                                return (
                                    <FaStar key={index}
                                        onClick={() => handleClick(index + 1)}
                                        name='rating'
                                        className={(hoverValue || currentValue) > index ? "text-orange-500 cursor-pointer" : "text-gray-400 cursor-pointer"}
                                        onMouseOver={() => handleMouseHover(index + 1)}
                                        onMouseLeave={() => handleMouseLeave()} />
                                )
                            })
                        }
                    </div>
                    <Field className="p-3 w-full rounded shadow outline-[#FF6F61]" rows='5' as='textarea' name='comment' placeholder='Enter review comment' />
                    <button className='p-3 rounded shadow bg-[#FF6F61] text-white' type='submit' onMouseLeave={() => setShowReview(false)}>submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default MovieReview