import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from './adminHeader';
import ShoppingAppContext from '../ShoppingAppContext';

const CartManagement = () => {
    const [cartItems, setCartItems] = useState([]);
    const {isDarkMode,toggleTheme} = useContext(ShoppingAppContext);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:8081/shopping_cart');
                setCartItems(response.data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const deleteCartItem = async (cartId) => {
        try {
            await axios.delete('/shopping_cart/delete', { params: { Id: cartId } });
            setCartItems(cartItems.filter(item => item.Id !== cartId));
        } catch (error) {
            console.error('Error deleting cart item:', error);
        }
    };

   
    return (
        <div className={`cart-management ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-screen transition-colors duration-300`}>
           
            <h2 className="text-2xl font-bold mb-4">Cart Management</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-500 text-left">
                        <th className="border px-4 py-2">Cart ID</th>
                        <th className="border px-4 py-2">Product ID</th>
                        <th className="border px-4 py-2">User ID</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                        <tr key={item.Id} className={`${isDarkMode ?'hover:bg-gray-900' : 'hover:bg-gray-200'}`}>
                            <td className="border px-4 py-2">{item.Id}</td>
                            <td className="border px-4 py-2">{item.p_id}</td>
                            <td className="border px-4 py-2">{item.u_id}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => deleteCartItem(item.Id)}
                                    className={`py-1 px-3 rounded ${isDarkMode ? 'bg-red-600 text-white' : 'bg-red-400 text-black'}`}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CartManagement;


/*
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import Dashboard from './dashboard';
import UserManagement from './userManage';
import ProductManagement from './productManage';
import OrderManagement from './orderManage';
import FavoritesManagement from './favManage';
import CartManagement from './cartManage';

const AdminPanel = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        
            <div className={`admin-panel ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-screen transition-colors duration-300`}>
                <button
                    onClick={toggleTheme}
                    className={`py-2 px-4 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'} mb-4`}
                >
                    Toggle Theme
                </button>
                <nav>
                    <ul className="flex space-x-4 border-b pb-4 mb-4">
                        <li><Link to="/" className="hover:text-blue-500">Dashboard</Link></li>
                        <li><Link to="/users" className="hover:text-blue-500">User Management</Link></li>
                        <li><Link to="/products" className="hover:text-blue-500">Product Management</Link></li>
                        <li><Link to="/orders" className="hover:text-blue-500">Order Management</Link></li>
                        <li><Link to="/favorites" className="hover:text-blue-500">Favorites Management</Link></li>
                        <li><Link to="/cart" className="hover:text-blue-500">Cart Management</Link></li>
                    </ul>
                </nav>
                <div className="content">
                    
                        <a href="/" exact  ><Dashboard/>Dashboard</a>
                        <a href="/users" ><UserManagement/>User Management</a>
                        <a href="/products" ><ProductManagement />ProductManagement</a>
                        <a href="/orders"  >< OrderManagement/>OrderManagement</a>
                        <a href="/favorites" >< FavoritesManagement/>FavoritesManagement</a>
                        <a href="/cart"  ><CartManagement />CartManagement</a>
                    
                </div>
            </div>
      
    );
};

export default AdminPanel;


*/