import { Link, useLocation } from 'react-router-dom';
import { FaFilm, FaHeart, FaClock } from 'react-icons/fa';
import { MdSpaceDashboard } from 'react-icons/md';

const MobileNav = () => {
    const location = useLocation();

    return (
        <div className='lg:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#0E1628] to-[#161D2F] border-t border-gray-700/30 backdrop-blur-xl z-50'>
            <div className='flex items-center justify-around py-2'>
                {/* Logo/Brand */}
                <Link to='/' className='flex flex-col items-center py-2 px-4'>
                    <div className='w-8 h-8 bg-gradient-to-r from-[#FC4747] to-[#FF6B6B] rounded-xl flex items-center justify-center mb-1'>
                        <FaFilm size={16} className="text-white" />
                    </div>
                    <span className='text-xs font-bold text-white'>MovieMates</span>
                </Link>

                {/* Movies */}
                <Link 
                    to='/'
                    className={`flex flex-col items-center py-2 px-4 transition-all duration-300 ${
                        location.pathname === '/' 
                            ? 'text-[#FC4747]' 
                            : 'text-gray-400'
                    }`}
                >
                    <div className={`p-2 rounded-xl mb-1 ${
                        location.pathname === '/' 
                            ? 'bg-[#FC4747]/20' 
                            : ''
                    }`}>
                        <MdSpaceDashboard size={20} />
                    </div>
                    <span className='text-xs font-medium'>Movies</span>
                </Link>

                {/* Favorites */}
                <Link 
                    to='/bookmark'
                    className={`flex flex-col items-center py-2 px-4 transition-all duration-300 ${
                        location.pathname === '/bookmark' 
                            ? 'text-[#FC4747]' 
                            : 'text-gray-400'
                    }`}
                >
                    <div className={`p-2 rounded-xl mb-1 ${
                        location.pathname === '/bookmark' 
                            ? 'bg-[#FC4747]/20' 
                            : ''
                    }`}>
                        <FaHeart size={18} />
                    </div>
                    <span className='text-xs font-medium'>Favorites</span>
                </Link>

                {/* Watchlist */}
                <Link 
                    to='/watchlist'
                    className={`flex flex-col items-center py-2 px-4 transition-all duration-300 ${
                        location.pathname === '/watchlist' 
                            ? 'text-[#FC4747]' 
                            : 'text-gray-400'
                    }`}
                >
                    <div className={`p-2 rounded-xl mb-1 ${
                        location.pathname === '/watchlist' 
                            ? 'bg-[#FC4747]/20' 
                            : ''
                    }`}>
                        <FaClock size={18} />
                    </div>
                    <span className='text-xs font-medium'>Watchlist</span>
                </Link>


            </div>
        </div>
    );
};

export default MobileNav;
