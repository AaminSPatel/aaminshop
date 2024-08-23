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
        visitors: 0,
    });
    const {isDarkMode,toggleTheme ,pathToPage} = useContext(ShoppingAppContext);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const usersResponse = await axios.get(pathToPage +'/login');
                const productsResponse = await axios.get(pathToPage +'/shopping');
                const ordersResponse = await axios.get(pathToPage +'/orders');
                const visitorsResponse = await axios.get(pathToPage +'/track-visitor');
                const revenueResponse = await axios.get(pathToPage +'/orders/totalPrice'); // Needs a user_id parameter

                setStats({
                    users: usersResponse.data.length,
                    products: productsResponse.data.length,
                    orders: ordersResponse.data.length,
                    visitors: visitorsResponse.data.allVisitors.length,
                    revenue: revenueResponse.data.totalRevenue || 0,
                });
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        };

        fetchStats();
    }, []);

    const dashCardcls = `stat-card  ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-slate-300 text-black'} rounded-lg p-4 shadow-md`
    return (
        <div className={`dashboard ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-screen p-4 transition-colors duration-300`}>
            
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className={dashCardcls}>
                    <h2 className="text-xl font-semibold mb-2">Total Users</h2>
                    <p className="text-2xl">{stats.users}</p>
                </div>
                <div className={dashCardcls}>
                    <h2 className="text-xl font-semibold mb-2">Total Products</h2>
                    <p className="text-2xl">{stats.products}</p>
                </div>
                <div className={dashCardcls}>
                    <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
                    <p className="text-2xl">{stats.orders}</p>
                </div>
                <div className={dashCardcls}>
                    <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
                    <p className="text-2xl">${stats.revenue}</p>
                </div>
                <div className={dashCardcls}>
                    <h2 className="text-xl font-semibold mb-2">Total Visitors</h2>
                    <p className="text-2xl">{stats.visitors}</p>
                </div>
                
            </div>
        </div>
    );
};

export default Dashboard;
