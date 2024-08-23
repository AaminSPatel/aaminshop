import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {  FaSun, FaMoon, FaTimes } from 'react-icons/fa'; // Assuming you have these icons or use appropriate ones
import ShoppingAppContext from '../ShoppingAppContext';
import { FaBars } from 'react-icons/fa6';

const Header = () => {
    const location = useLocation();
    const { isDarkMode, toggleTheme } = useContext(ShoppingAppContext);

    const getHeaderContent = () => {
        switch (location.pathname) {
            case '/aaminshop/admin/dashboard':
                return 'Admin Dashboard';
            case '/aaminshop/admin/users':
                return 'User Management';
            case '/aaminshop/admin/products':
                return 'Product Management';
            case '/aaminshop/admin/orders':
                return 'Order Management';
            case '/aaminshop/admin/favorites':
                return 'Favorites Management';
            case '/aaminshop/admin/cart':
                return 'Cart Management';
            default:
                return 'Admin Panel';
        }
    };
    const headerLinkClass = `hover:text-blue-500 ${ isDarkMode?'hover:bg-slate-900':'hover:bg-slate-300'} transition-all px-2 rounded`
    const [isNavDrop,setIsNavDrop] = useState(false);
    
  return (
    <header className={`fixed top-0 w-full mb- shadow-md ${!isDarkMode ? ' bg-white shadow-black text-black ' :' bg-gray-800 text-white shadow-slate-400 transition-shadow'}`}>
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex gap-2 items-center">
          {/* Logo */}
          <Link to="/aaminshop/admin" className="text-xl font-bold px-2 bg-yellow-300">
          Admin Panel
          </Link>
          <Link to="/aaminshop/" className="text-xl font-bold px-2 hover:bg-yellow-300">
          Home
          </Link>
          
        </div>
        {/* Navigation */}
        <nav>
          <ul className={`md:flex hidden`}>
            <li className={`${getHeaderContent() == 'Admin Dashboard' ? 'text-sky-500 border-b-2 border-b-sky-500 rounded-none' : ''} ${headerLinkClass}`}><Link to="/aaminshop/admin/dashboard" className={`${getHeaderContent() == 'Admin Dashboard' ? '' : ''}`}>Dashboard</Link></li>
            <li className={`${getHeaderContent() == 'User Management' ? 'text-sky-500 border-b-2 border-b-sky-500 rounded-none' : ''} ${headerLinkClass}`}><Link to="/aaminshop/admin/users"  > User Panel</Link></li>
            <li className={`${getHeaderContent() == 'Product Management' ? 'text-sky-500 border-b-2 border-b-sky-500 rounded-none' : ''} ${headerLinkClass}`}><Link to="/aaminshop/admin/products" >Product Panel</Link></li>
            <li className={`${getHeaderContent() == 'Order Management' ? 'text-sky-500 border-b-2 border-b-sky-500 rounded-none' : ''} ${headerLinkClass}`}><Link to="/aaminshop/admin/orders">Order Panel</Link></li>
            <li className={`${getHeaderContent() == 'Favorites Management' ? 'text-sky-500 border-b-2 border-b-sky-500 rounded-none' : ''} ${headerLinkClass}`}><Link to="/aaminshop/admin/favorites" >Favorites Panel</Link></li>
            <li className={`${getHeaderContent() == 'Cart Management' ? 'text-sky-500 border-b-2 border-b-sky-500 rounded-none' : ''} ${headerLinkClass}`}><Link to="/aaminshop/admin/cart" >Cart Panel</Link></li>
          </ul>
        </nav>
        
        <nav>
          <ul className={`md:hidden z-30 ${isNavDrop ? `flex absolute gap-1 ${!isDarkMode ? ' bg-white shadow-black shadow-lg text-black ' :' bg-gray-900 text-white '} rounded justify-center items-start flex-col` : 'hidden'}`}>
            <li className={`${getHeaderContent() == 'Admin Dashboard' ? 'text-sky-500 border-b-2 border-b-sky-500 rounded-none' : ''} ${headerLinkClass}`}><Link to="/aaminshop/admin/dashboard" className={`${getHeaderContent() == 'Admin Dashboard' ? '' : ''}`}>Dashboard</Link></li>
            <li className={`${getHeaderContent() == 'User Management' ? 'text-sky-500 border-b-2 border-b-sky-500 rounded-none' : ''} ${headerLinkClass}`}><Link to="/aaminshop/admin/users"  > User Panel</Link></li>
            <li className={`${getHeaderContent() == 'Product Management' ? 'text-sky-500 border-b-2 border-b-sky-500 rounded-none' : ''} ${headerLinkClass}`}><Link to="/aaminshop/admin/products" >Product Panel</Link></li>
            <li className={`${getHeaderContent() == 'Order Management' ? 'text-sky-500 border-b-2 border-b-sky-500 rounded-none' : ''} ${headerLinkClass}`}><Link to="/aaminshop/admin/orders">Order Panel</Link></li>
            <li className={`${getHeaderContent() == 'Favorites Management' ? 'text-sky-500 border-b-2 border-b-sky-500 rounded-none' : ''} ${headerLinkClass}`}><Link to="/aaminshop/admin/favorites" >Favorites Panel</Link></li>
            <li className={`${getHeaderContent() == 'Cart Management' ? 'text-sky-500 border-b-2 border-b-sky-500 rounded-none' : ''} ${headerLinkClass}`}><Link to="/aaminshop/admin/cart" >Cart Panel</Link></li>
          </ul>
        </nav>


        <div className='w-auto flex gap-3'>
        <button className=' z-40 lg:hidden md:hidden block' onClick={()=>{setIsNavDrop(!isNavDrop)}}>
          {isNavDrop ? <FaTimes/> : <FaBars/>} 
          
          </button>
        {/* Theme Toggle */}
        <button
          className={` rounded-md ${isDarkMode ? 'hover:bg-slate-300 text-yellow-600' :' hover:bg-slate-800 text-sky-300'} p-1`}
          onClick={toggleTheme}
        >
          {isDarkMode ? (
            <FaSun className="w-5 h-5" />
          ) : (
            <FaMoon className="w-5 h-5" />
          )}
        </button>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
