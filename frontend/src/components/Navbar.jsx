import  { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdMovie } from "react-icons/md";
import { FaBars, FaTimes, FaUser, FaChevronDown, FaSignOutAlt } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useGetCurrentUserQuery } from '../redux/slices/userSlices';
import { useDispatch } from 'react-redux';
import { syncFavoritesWithAuth } from '../redux/slices/bookmarkSlice';
import { syncWatchlistWithAuth } from '../redux/slices/watchlistSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const { data: user = {}, isLoading } = useGetCurrentUserQuery(undefined, {
    skip: !Cookies.get('userToken'), // Skip query if no token
    refetchOnMountOrArgChange: true, // Refetch when component mounts
    refetchOnFocus: true // Refetch when window regains focus
  });
  const currentUser = user?.user || {};
  const dispatch = useDispatch();

  useEffect(() => {
    const userToken = Cookies.get('userToken');
    setIsLoggedIn(!!userToken);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserDropdownOpen && !event.target.closest('.relative')) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserDropdownOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    Cookies.remove('userToken');
    // Clear favorites and watchlist from localStorage on logout
    localStorage.removeItem('favoriteMovies');
    localStorage.removeItem('watchlistMovies');
    dispatch(syncFavoritesWithAuth());
    dispatch(syncWatchlistWithAuth());
    window.location.replace('/');
  };

  return (
    <nav className="bg-primary fixed w-full z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <MdMovie size={24} className="text-accent" />
            <span className="text-lg font-bold">Gosaar <span className="text-accent">Movies</span></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'text-accent' : 'text-white hover:text-accent'}`}
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className={`nav-link ${location.pathname === '/movies' ? 'text-accent' : 'text-white hover:text-accent'}`}
            >
              Movies
            </Link>
            <Link 
              to="/bookmark" 
              className={`nav-link ${location.pathname === '/bookmark' ? 'text-accent' : 'text-white hover:text-accent'}`}
            >
              Bookmarks
            </Link>
          </div>

          {/* User Actions - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <FaUser className="text-white" />
                  </div>
                  <span className="text-sm font-medium">{currentUser?.username}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="btn-primary text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/user-login" className="text-white hover:text-accent">
                  Login
                </Link>
                <Link to="/user-register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile User Actions */}
          <div className="md:hidden flex items-center space-x-2">
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 text-white focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                    <FaUser className="text-white text-sm" />
                  </div>
                  <span className="text-sm font-medium max-w-20 truncate">
                    {isLoading ? 'Loading...' : (currentUser?.username || 'User')}
                  </span>
                  <FaChevronDown className={`text-xs transition-transform duration-200 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {/* User Dropdown */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#161D2F] rounded-lg shadow-lg border border-gray-700/50 z-50">
                    <div className="p-3 border-b border-gray-700/50">
                      <p className="text-white font-medium text-sm">{currentUser?.username}</p>
                      <p className="text-gray-400 text-xs">{currentUser?.email}</p>
                    </div>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setIsUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <FaSignOutAlt />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/user-login" 
                className="flex items-center gap-2 text-white hover:text-accent"
              >
                <FaUser />
                <span className="text-sm">Login</span>
              </Link>
            )}
            
            <button 
              onClick={toggleMenu}
              className="text-white focus:outline-none ml-2"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'text-accent' : 'text-white hover:text-accent'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className={`nav-link ${location.pathname === '/movies' ? 'text-accent' : 'text-white hover:text-accent'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Movies
            </Link>
            <Link 
              to="/bookmark" 
              className={`nav-link ${location.pathname === '/bookmark' ? 'text-accent' : 'text-white hover:text-accent'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Bookmarks
            </Link>
            
            <div className="pt-4 border-t border-gray-700">
              {isLoggedIn ? (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <FaUser className="text-white" />
                    </div>
                    <span className="text-sm font-medium">{currentUser?.username}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="btn-primary text-sm w-full"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Link 
                    to="/user-login" 
                    className="btn-secondary text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/user-register" 
                    className="btn-primary text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
