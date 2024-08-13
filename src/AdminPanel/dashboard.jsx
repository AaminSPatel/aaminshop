import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from './adminHeader';
import ShoppingAppContext from '../ShoppingAppContext';

const Dashboard = () => {
    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        orders: 0,
        revenue: 0,
    });
    const {isDarkMode,toggleTheme} = useContext(ShoppingAppContext);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const usersResponse = await axios.get('http://localhost:8081/login');
                const productsResponse = await axios.get('http://localhost:8081/shopping');
                const ordersResponse = await axios.get('http://localhost:8081/shopping_cart');
                const revenueResponse = await axios.get('http://localhost:8081/shopping_cart/totalPrice/:user_id'); // Needs a user_id parameter

                setStats({
                    users: usersResponse.data.length,
                    products: productsResponse.data.length,
                    orders: ordersResponse.data.length,
                    revenue: revenueResponse.data.totalPrice || 0,
                });
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className={`dashboard ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-screen p-4 transition-colors duration-300`}>
            
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="stat-card bg-gray-500 rounded-lg p-4 shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Users</h2>
                    <p className="text-2xl">{stats.users}</p>
                </div>
                <div className="stat-card bg-gray-500 rounded-lg p-4 shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Products</h2>
                    <p className="text-2xl">{stats.products}</p>
                </div>
                <div className="stat-card bg-gray-500 rounded-lg p-4 shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
                    <p className="text-2xl">{stats.orders}</p>
                </div>
                <div className="stat-card bg-gray-500 rounded-lg p-4 shadow-md">
                    <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
                    <p className="text-2xl">${stats.revenue}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
