//import React from 'react';
import { Link } from 'react-router-dom';
import { MdMovie } from "react-icons/md";
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and About */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <MdMovie size={28} className="text-accent" />
              <span className="text-xl font-bold">Gosaar <span className="text-accent">Movies</span></span>
            </Link>
            <p className="text-textSecondary mb-6">
              Your ultimate destination for discovering, reviewing, and discussing the best films from around the world.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-textSecondary hover:text-accent transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-textSecondary hover:text-accent transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-textSecondary hover:text-accent transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-textSecondary hover:text-accent transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-textSecondary hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/movies" className="text-textSecondary hover:text-accent transition-colors">
                  Movies
                </Link>
              </li>
              <li>
                <Link to="/bookmark" className="text-textSecondary hover:text-accent transition-colors">
                  Bookmarks
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-textSecondary hover:text-accent transition-colors">
                  Action
                </a>
              </li>
              <li>
                <a href="#" className="text-textSecondary hover:text-accent transition-colors">
                  Comedy
                </a>
              </li>
              <li>
                <a href="#" className="text-textSecondary hover:text-accent transition-colors">
                  Drama
                </a>
              </li>
              <li>
                <a href="#" className="text-textSecondary hover:text-accent transition-colors">
                  Horror
                </a>
              </li>
              <li>
                <a href="#" className="text-textSecondary hover:text-accent transition-colors">
                  Sci-Fi
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-textSecondary mb-4">
              Subscribe to our newsletter for the latest updates and movie recommendations.
            </p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="input-field w-full"
              />
              <button type="submit" className="btn-primary w-full">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-textSecondary text-sm mb-4 md:mb-0">
              &copy; {currentYear} Gosaar Movies. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="#" className="text-textSecondary hover:text-accent text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-textSecondary hover:text-accent text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-textSecondary hover:text-accent text-sm transition-colors">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
