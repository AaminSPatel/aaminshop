import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from './adminHeader';
import ShoppingAppContext from '../ShoppingAppContext';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const {isDarkMode,toggleTheme} = useContext(ShoppingAppContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8081/shopping_cart');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const deleteOrder = async (orderId) => {
        try {
            await axios.delete('http://localhost:8081/shopping_cart/delete', { params: { orderId } });
            setOrders(orders.filter(order => order.Id !== orderId));
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };


    return (
        <div className={`order-management ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-screen transition-colors duration-300`}>
           
            <h2 className="text-2xl font-bold mb-4">Order Management</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-500 text-left">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Product Name</th>
                        <th className="border px-4 py-2">User ID</th>
                        <th className="border px-4 py-2">Quantity</th>
                        <th className="border px-4 py-2">Total Price</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.Id} className={`${isDarkMode ?'hover:bg-gray-900' : 'hover:bg-gray-200'}`}>
                            <td className="border px-4 py-2">{order.Id}</td>
                            <td className="border px-4 py-2">{order.product_name}</td>
                            <td className="border px-4 py-2">{order.u_id}</td>
                            <td className="border px-4 py-2">{order.count}</td>
                            <td className="border px-4 py-2">${order.totalPrice}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => deleteOrder(order.Id)}
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

export default OrderManagement;
