import  { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdMovie } from "react-icons/md";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import Cookies from 'js-cookie';
import { useGetCurrentUserQuery } from '../redux/slices/userSlices';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const { data: user = {} } = useGetCurrentUserQuery();
  const currentUser = user?.user || {};

  useEffect(() => {
    const userToken = Cookies.get('userToken');
    setIsLoggedIn(!!userToken);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    Cookies.remove('userToken');
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

          {/* User Actions */}
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-white focus:outline-none"
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
