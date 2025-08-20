import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import { BiHide, BiShow } from "react-icons/bi";
import { FaFilm, FaUser, FaLock } from "react-icons/fa";
import { useLoginUserMutation } from '../redux/slices/userSlices';
import { useDispatch } from 'react-redux';
import { syncFavoritesWithAuth } from '../redux/slices/bookmarkSlice';
import { syncWatchlistWithAuth } from '../redux/slices/watchlistSlice';

const userLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser] = useLoginUserMutation();
  const [showPassword, setShowPassword] = useState('password');
  const initialValues = {
    email: '',
    password: ''
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required")
  })
  const handleSubmit = (values) => {
    const { email, password } = values;
    loginUser({ email, password })
      .then((res) => {
        const status = res?.data?.status;
        if (status) {
          toast.success(res?.data?.message);
          // Sync favorites and watchlist after successful login
          dispatch(syncFavoritesWithAuth());
          dispatch(syncWatchlistWithAuth());
          navigate('/');
        } else {
          toast.error(res?.data?.message);
        }
      }).catch((err) => {
        // Error handling
      })
  }
  return (
    <div className='min-h-screen bg-gradient-to-br from-[#0E1628] via-[#161D2F] to-[#0E1628] flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        {/* Logo and Header */}
        <div className='text-center mb-8'>
          <div className='flex items-center justify-center gap-3 mb-4'>
            <div className='w-12 h-12 bg-gradient-to-r from-[#FC4747] to-[#FF6B6B] rounded-xl flex items-center justify-center shadow-lg'>
              <FaFilm size={24} className="text-white" />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-white'>MovieMates</h1>
              <p className='text-sm text-gray-400'>Reviews</p>
            </div>
          </div>
          <h2 className='text-xl font-semibold text-white mb-2'>Welcome Back</h2>
          <p className='text-gray-400'>Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <div className='bg-[#161D2F]/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/30 shadow-2xl'>
          <Formik onSubmit={handleSubmit} enableReinitialize
            initialValues={initialValues} validationSchema={validationSchema}>
            <Form className='space-y-6'>
              {/* Email Field */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-300'>
                  Email Address
                </label>
                <div className='relative'>
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Field 
                    type='text' 
                    name='email' 
                    placeholder="Enter your email"
                    className='w-full pl-10 pr-4 py-3 bg-[#0E1628] text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FC4747] focus:border-transparent transition-all duration-300' 
                  />
                </div>
                <ErrorMessage className='text-red-400 text-sm' name='email' component='div' />
              </div>

              {/* Password Field */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-300'>
                  Password
                </label>
                <div className='relative'>
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Field 
                    type={showPassword} 
                    name='password' 
                    placeholder="Enter your password"
                    className='w-full pl-10 pr-12 py-3 bg-[#0E1628] text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FC4747] focus:border-transparent transition-all duration-300' 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(showPassword === 'password' ? 'text' : 'password')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword === 'password' ? <BiHide size={20} /> : <BiShow size={20} />}
                  </button>
                </div>
                <ErrorMessage className='text-red-400 text-sm' name='password' component='div' />
              </div>

              {/* Submit Button */}
              <button 
                type='submit' 
                className='w-full bg-gradient-to-r from-[#FC4747] to-[#FF6B6B] text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-[#FC4747]/25 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#FC4747] focus:ring-offset-2 focus:ring-offset-[#161D2F]'
              >
                Sign In
              </button>

              {/* Register Link */}
              <div className='text-center pt-4 border-t border-gray-700/30'>
                <p className='text-gray-400'>
                  Don't have an account?{' '}
                  <Link 
                    to='/user-register' 
                    className='text-[#FC4747] hover:text-[#FF6B6B] font-medium transition-colors'
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default userLogin