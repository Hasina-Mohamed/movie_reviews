import { useEffect, useState } from 'react'
import { MdMovie, MdSpaceDashboard } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import { FaBookmark, FaListUl, FaUser, FaFilm, FaHeart, FaClock, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useGetCurrentUserQuery } from '../redux/slices/userSlices';
import toast from 'react-hot-toast';
const Sidebar = () => {
    const { data: user = {} } = useGetCurrentUserQuery()
    const currentUser = user?.user || {};
    const [auth, setAuth] = useState(false);
    const userToken = Cookies.get('userToken');
    const location = useLocation();
    
    useEffect(() => {
        if (userToken) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    }, [userToken])
    
    const handleLogout = () => {
        Cookies.remove('userToken');
        window.location.replace('/');
        setTimeout(() => {
            toast.success('Successfully logged out')
        }, 2000)
    }
    
    return (
        <div className='w-[240px] fixed left-0 top-0 h-full bg-gradient-to-b from-[#0E1628] via-[#161D2F] to-[#0E1628] border-r border-gray-700/30 backdrop-blur-xl shadow-2xl z-50 lg:translate-x-0 -translate-x-full lg:block'>
            <div className='w-full h-full flex flex-col p-4'>
                {/* Logo Section */}
                <div className='flex items-center gap-3 mb-8 pb-4 border-b border-gray-600/30'>
                    <div className='w-10 h-10 bg-gradient-to-r from-[#FC4747] to-[#FF6B6B] rounded-xl flex items-center justify-center shadow-lg'>
                        <FaFilm size={20} className="text-white" />
                    </div>
                    <div className='hidden md:block'>
                        <h1 className='text-xl font-bold text-white'>MovieMates</h1>
                        <p className='text-xs text-gray-400 font-medium'>Reviews</p>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className='flex-1 space-y-2'>
                    <div className='mb-6'>
                        <h2 className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2'>Menu</h2>
                        
                        <Link 
                            to='/'
                            className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                                location.pathname === '/' 
                                    ? 'bg-gradient-to-r from-[#FC4747] to-[#FF6B6B] text-white shadow-lg shadow-[#FC4747]/25' 
                                    : 'text-gray-300 hover:bg-gray-700/30 hover:text-white'
                            }`}
                        >
                            <div className={`p-1.5 rounded-lg ${
                                location.pathname === '/' 
                                    ? 'bg-white/20' 
                                    : 'bg-gray-700/50 group-hover:bg-gray-600/50'
                            }`}>
                                <MdSpaceDashboard size={18} />
                            </div>
                            <span className='font-semibold text-sm hidden md:block'>Discover Movies</span>
                            {location.pathname === '/' && (
                                <div className='ml-auto w-1.5 h-1.5 bg-white rounded-full hidden md:block'></div>
                            )}
                        </Link>

                        <Link 
                            to='/bookmark'
                            className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                                location.pathname === '/bookmark' 
                                    ? 'bg-gradient-to-r from-[#FC4747] to-[#FF6B6B] text-white shadow-lg shadow-[#FC4747]/25' 
                                    : 'text-gray-300 hover:bg-gray-700/30 hover:text-white'
                            }`}
                        >
                            <div className={`p-1.5 rounded-lg ${
                                location.pathname === '/bookmark' 
                                    ? 'bg-white/20' 
                                    : 'bg-gray-700/50 group-hover:bg-gray-600/50'
                            }`}>
                                <FaHeart size={16} />
                            </div>
                            <span className='font-semibold text-sm hidden md:block'>Favorites</span>
                            {location.pathname === '/bookmark' && (
                                <div className='ml-auto w-1.5 h-1.5 bg-white rounded-full hidden md:block'></div>
                            )}
                        </Link>

                        <Link 
                            to='/watchlist'
                            className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                                location.pathname === '/watchlist' 
                                    ? 'bg-gradient-to-r from-[#FC4747] to-[#FF6B6B] text-white shadow-lg shadow-[#FC4747]/25' 
                                    : 'text-gray-300 hover:bg-gray-700/30 hover:text-white'
                            }`}
                        >
                            <div className={`p-1.5 rounded-lg ${
                                location.pathname === '/watchlist' 
                                    ? 'bg-white/20' 
                                    : 'bg-gray-700/50 group-hover:bg-gray-600/50'
                            }`}>
                                <FaClock size={16} />
                            </div>
                            <span className='font-semibold text-sm hidden md:block'>Watch Later</span>
                            {location.pathname === '/watchlist' && (
                                <div className='ml-auto w-1.5 h-1.5 bg-white rounded-full hidden md:block'></div>
                            )}
                        </Link>
                    </div>
                </nav>

                {/* User Section */}
                <div className='mt-auto pt-4 border-t border-gray-600/30'>
                    {auth ? (
                        <div className='space-y-3'>
                            {/* User Profile */}
                            <div className='flex items-center gap-3 p-3 bg-gray-700/20 backdrop-blur-sm rounded-xl border border-gray-600/20'>
                                <div className='relative'>
                                    <div className='w-10 h-10 bg-gradient-to-r from-[#FC4747] to-[#FF6B6B] rounded-xl flex items-center justify-center shadow-lg'>
                                        <FaUserCircle size={20} className="text-white" />
                                    </div>
                                    <div className='absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0E1628]'></div>
                                </div>
                                <div className='hidden md:block flex-1'>
                                    <p className='font-bold text-white text-xs'>{currentUser?.username || 'User'}</p>
                                    <p className='text-xs text-gray-400'>Premium Member</p>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <button 
                                onClick={handleLogout}
                                className='w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300 group'
                            >
                                <div className='p-1.5 rounded-lg bg-gray-700/50 group-hover:bg-red-500/20'>
                                    <FaSignOutAlt size={16} />
                                </div>
                                <span className='font-semibold text-sm hidden md:block'>Sign Out</span>
                            </button>
                        </div>
                    ) : (
                        <div className='space-y-2'>
                            <Link 
                                to='/user-login'
                                className='w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-[#FC4747] to-[#FF6B6B] text-white font-bold rounded-xl hover:shadow-lg hover:shadow-[#FC4747]/25 transition-all duration-300 transform hover:scale-105'
                            >
                                <FaUser size={16} />
                                <span className='hidden md:block text-sm'>Sign In</span>
                            </Link>
                            <Link 
                                to='/user-register'
                                className='w-full flex items-center justify-center gap-3 px-4 py-2.5 bg-gray-700/30 text-gray-300 font-semibold rounded-xl hover:bg-gray-600/30 hover:text-white transition-all duration-300 border border-gray-600/30'
                            >
                                <span className='hidden md:block text-sm'>Create Account</span>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Sidebar



