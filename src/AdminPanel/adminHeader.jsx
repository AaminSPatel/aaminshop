import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {  FaSun, FaMoon } from 'react-icons/fa'; // Assuming you have these icons or use appropriate ones
import ShoppingAppContext from '../ShoppingAppContext';

const Header = () => {
    const location = useLocation();
    const { isDarkMode, toggleTheme } = useContext(ShoppingAppContext);

    const getHeaderContent = () => {
        switch (location.pathname) {
            case '/admin/dashboard':
                return 'Admin Dashboard';
            case '/admin/users':
                return 'User Management';
            case '/admin/products':
                return 'Product Management';
            case '/admin/orders':
                return 'Order Management';
            case '/admin/favorites':
                return 'Favorites Management';
            case '/admin/cart':
                return 'Cart Management';
            default:
                return 'Admin Panel';
        }
    };
    const headerLinkClass = `hover:text-blue-500 ${ isDarkMode?'hover:bg-slate-900':'hover:bg-slate-300'} transition-all px-2 rounded`
  return (
    <header className={`fixed top-0 w-full mb-20 shadow-md ${!isDarkMode ? ' bg-white shadow-black text-black ' :' bg-gray-800 text-white shadow-slate-400 transition-shadow'}`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          {/* Logo */}
          <Link to="/admin/dashboard" className="text-2xl font-bold">
          {getHeaderContent()}
          </Link>
        </div>
        {/* Navigation */}
        <nav>
          <ul className="flex">
            <li className={`${getHeaderContent() == 'Admin Dashboard' ? 'text-sky-500 border-b-2 border-b-sky-500 rounded-none' : ''} ${headerLinkClass}`}><Link to="/admin/dashboard" className={`${getHeaderContent() == 'Admin Dashboard' ? '' : ''}`}>Dashboard</Link></li>
            <li className={`${getHeaderContent() == 'User Management' ? 'text-sky-500 border-b-2 border-b-sky-500 rounded-none' : ''} ${headerLinkClass}`}><Link to="/admin/users"  >User Management User Panel</Link></li>
            <li className={`${getHeaderContent() == 'Product Management' ? 'text-sky-500 border-b-2 border-b-sky-500 rounded-none' : ''} ${headerLinkClass}`}><Link to="/admin/products" >Product Panel</Link></li>
            <li className={`${getHeaderContent() == 'Order Management' ? 'text-sky-500 border-b-2 border-b-sky-500 rounded-none' : ''} ${headerLinkClass}`}><Link to="/admin/orders">Order Panel</Link></li>
            <li className={`${getHeaderContent() == 'Favorites Management' ? 'text-sky-500 border-b-2 border-b-sky-500 rounded-none' : ''} ${headerLinkClass}`}><Link to="/admin/favorites" >Favorites Panel</Link></li>
            <li className={`${getHeaderContent() == 'Cart Management' ? 'text-sky-500 border-b-2 border-b-sky-500 rounded-none' : ''} ${headerLinkClass}`}><Link to="/admin/cart" >Cart Panel</Link></li>
          </ul>
        </nav>
        {/* Theme Toggle */}
        <button
          className={`ml-4 p-2 rounded-md ${isDarkMode ? 'hover:bg-slate-600 text-yellow-400' :' hover:bg-slate-300 text-sky-300'} `}
          onClick={toggleTheme}
        >
          {isDarkMode ? (
            <FaSun className="w-6 h-6" />
          ) : (
            <FaMoon className="w-6 h-6" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
