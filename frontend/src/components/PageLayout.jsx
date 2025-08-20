import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../ExportFiles'
import MobileNav from './MobileNav'
import { FaUser, FaChevronDown, FaSignOutAlt, FaFilm } from 'react-icons/fa'
import { useGetCurrentUserQuery } from '../redux/slices/userSlices'
import { useDispatch } from 'react-redux'
import { syncFavoritesWithAuth } from '../redux/slices/bookmarkSlice'
import { syncWatchlistWithAuth } from '../redux/slices/watchlistSlice'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

const PageLayout = () => {
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const userToken = Cookies.get('userToken');
    const dispatch = useDispatch();
    
    const { data: user = {}, isLoading } = useGetCurrentUserQuery(undefined, {
        skip: !userToken,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true
    });
    const currentUser = user?.user || {};

    useEffect(() => {
        setIsLoggedIn(!!userToken);
    }, [userToken]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isUserDropdownOpen && !event.target.closest('.user-dropdown')) {
                setIsUserDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isUserDropdownOpen]);

    const handleLogout = () => {
        Cookies.remove('userToken');
        localStorage.removeItem('favoriteMovies');
        localStorage.removeItem('watchlistMovies');
        dispatch(syncFavoritesWithAuth());
        dispatch(syncWatchlistWithAuth());
        setIsUserDropdownOpen(false);
        window.location.replace('/');
        setTimeout(() => {
            toast.success('Successfully logged out')
        }, 2000);
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-[#0E1628] via-[#161D2F] to-[#0E1628]'>
            <Sidebar />
            
            {/* Mobile Header */}
            <div className='lg:hidden fixed top-0 left-0 right-0 bg-gradient-to-r from-[#0E1628] to-[#161D2F] border-b border-gray-700/30 backdrop-blur-xl z-40'>
                <div className='flex items-center justify-between px-4 py-3'>
                    {/* Logo */}
                    <div className='flex items-center gap-2'>
                        <div className='w-8 h-8 bg-gradient-to-r from-[#FC4747] to-[#FF6B6B] rounded-xl flex items-center justify-center'>
                            <FaFilm size={16} className="text-white" />
                        </div>
                        <span className='text-lg font-bold text-white'>MovieMates</span>
                    </div>

                    {/* User Actions */}
                    <div className='flex items-center'>
                        {isLoggedIn ? (
                            <div className="relative user-dropdown">
                                <button 
                                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                    className="flex items-center text-white focus:outline-none hover:scale-105 transition-transform duration-200"
                                >
                                    <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#FC4747] to-[#FF6B6B] flex items-center justify-center shadow-lg">
                                        <FaUser className="text-white text-sm" />
                                    </div>
                                </button>
                                
                                {/* User Dropdown */}
                                {isUserDropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-[#161D2F] rounded-lg shadow-lg border border-gray-700/50 z-50">
                                        <div className="p-3 border-b border-gray-700/50">
                                            <p className="text-white font-medium text-sm">{currentUser?.username}</p>
                                            <p className="text-gray-400 text-xs">{currentUser?.email}</p>
                                        </div>
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
                                        >
                                            <FaSignOutAlt />
                                            <span className="text-sm">Sign Out</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <a 
                                href="/user-login" 
                                className="flex items-center gap-2 text-white hover:text-[#FC4747] transition-colors"
                            >
                                <FaUser />
                                <span className="text-sm">Login</span>
                            </a>
                        )}
                    </div>
                </div>
            </div>

            <MobileNav />
            <main className='lg:ml-[240px] min-h-screen pb-20 lg:pb-0'>
                <div className='p-4 lg:p-6 pt-16 lg:pt-6'>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default PageLayout

