import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import { BiHide, BiShow } from "react-icons/bi";
import { FaFilm, FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useRegisterUserMutation } from '../redux/slices/userSlices';

const userRegister = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState('password');
  const initialValues = {
    username: '',
    email: '',
    password: ''
  }
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required").min(3, "Username must be at least 3 characters"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters")
  })
  const handleSubmit = (values) => {
    const { username, email, password } = values;
    registerUser({ username, email, password })
      .then((res) => {
        const status = res?.data?.status;
        if (status) {
          toast.success(res?.data?.message);
          navigate('/user-login');
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
          <h2 className='text-xl font-semibold text-white mb-2'>Create Account</h2>
          <p className='text-gray-400'>Join our community of movie enthusiasts</p>
        </div>

        {/* Registration Form */}
        <div className='bg-[#161D2F]/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/30 shadow-2xl'>
          <Formik onSubmit={handleSubmit} enableReinitialize
            initialValues={initialValues} validationSchema={validationSchema}>
            <Form className='space-y-6'>
              {/* Username Field */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-300'>
                  Username
                </label>
                <div className='relative'>
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Field 
                    type='text' 
                    name='username' 
                    placeholder="Choose a username"
                    className='w-full pl-10 pr-4 py-3 bg-[#0E1628] text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FC4747] focus:border-transparent transition-all duration-300' 
                  />
                </div>
                <ErrorMessage className='text-red-400 text-sm' name='username' component='div' />
              </div>

              {/* Email Field */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-300'>
                  Email Address
                </label>
                <div className='relative'>
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Field 
                    type='email' 
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
                    placeholder="Create a password"
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
                Create Account
              </button>

              {/* Login Link */}
              <div className='text-center pt-4 border-t border-gray-700/30'>
                <p className='text-gray-400'>
                  Already have an account?{' '}
                  <Link 
                    to='/user-login' 
                    className='text-[#FC4747] hover:text-[#FF6B6B] font-medium transition-colors'
                  >
                    Sign In
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

export default userRegister