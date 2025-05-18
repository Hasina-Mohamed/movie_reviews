import { useEffect, useState } from 'react'
import { MdMovie, MdSpaceDashboard } from "react-icons/md";
import { Link, useLocation } from 'react-router-dom';
import { FaBookmark, FaListUl, FaUser } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useGetCurrentUserQuery } from '../redux/slices/userSlices';
import toast from 'react-hot-toast';
import { AiOutlineLogout } from "react-icons/ai";
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
        <div className='w-[20%] md:w-[30%] lg:w-[15%] fixed left-0 lg:left-10 top-20 bottom-24 shadow-lg rounded-lg bg-[#161D2F] transition-all duration-300 hover:shadow-accent/20'>
            <div className='w-full p-6 h-full flex flex-col'>
                <div className='w-full flex flex-row justify-start items-center gap-3 mb-8'>
                    <MdMovie size={28} className="text-accent" />
                    <h1 className='text-xl font-bold tracking-wide hidden md:block'>Gosaar <span className='text-accent'>Movies</span></h1>
                </div>

                <div className='w-full space-y-6 flex-grow'>
                    <Link 
                        className={`w-full flex flex-row justify-start items-center gap-3 p-3 rounded-lg transition-colors ${
                            location.pathname === '/' ? 'bg-accent bg-opacity-20 text-accent' : 'hover:bg-secondary'
                        }`} 
                        to='/'
                    >
                        <MdSpaceDashboard size={22} /> 
                        <span className='text-base font-medium hidden md:block'>Movies</span>
                    </Link>
                    <Link 
                        className={`w-full flex flex-row justify-start items-center gap-3 p-3 rounded-lg transition-colors ${
                            location.pathname === '/bookmark' ? 'bg-accent bg-opacity-20 text-accent' : 'hover:bg-secondary'
                        }`} 
                        to='/bookmark'
                    >
                        <FaBookmark size={20} /> 
                        <span className='hidden md:block text-base font-medium'>Bookmark</span>
                    </Link>
                    <Link 
                        className={`w-full flex flex-row justify-start items-center gap-3 p-3 rounded-lg transition-colors ${
                            location.pathname === '/watchlist' ? 'bg-accent bg-opacity-20 text-accent' : 'hover:bg-secondary'
                        }`} 
                        to='/watchlist'
                    >
                        <FaListUl size={20} /> 
                        <span className='hidden md:block text-base font-medium'>Watchlist</span>
                    </Link>
                    {
                        auth && (
                            <button 
                                className='w-full flex flex-row justify-start items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors' 
                                onClick={handleLogout}
                            >
                                <AiOutlineLogout size={22} className="text-red-500" /> 
                                <span className='hidden md:block text-base font-medium'>Logout</span>
                            </button>
                        )
                    }
                </div>

                <div className='mt-auto'>
                    {
                        auth ? (
                            <div className='w-full flex flex-row justify-start items-center gap-4 p-4 rounded-lg bg-accent bg-opacity-10 shadow-md'>
                                <div className='w-10 h-10 rounded-full bg-accent flex items-center justify-center'>
                                    <FaUser className="text-white" />
                                </div>
                                <p className='text-base font-medium hidden md:block truncate'>{currentUser?.username}</p>
                            </div>
                        ) : (
                            <Link 
                                to='/user-login' 
                                className='w-full block text-center bg-accent p-3 rounded-lg
                                text-white text-base font-medium hover:bg-opacity-80 transition-all duration-300 shadow-md'
                            >
                                Login
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Sidebar



