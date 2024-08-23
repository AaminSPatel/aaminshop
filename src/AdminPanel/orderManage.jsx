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
                const response = await axios.get('http://localhost:8081/orders');
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

    function dateFormater(date){

    
const dateObj = new Date(date);
    
const year = dateObj.getFullYear();
const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
const day = String(dateObj.getDate()).padStart(2, '0');
//const hours = String(dateObj.getHours()).padStart(2, '0');
//const minutes = String(dateObj.getMinutes()).padStart(2, '0');

// Format the date and time as needed
//const formattedDate = `${year}-${month}-${day}`;
//const formattedTime = `${hours}:${minutes}`;
return `${year}-${month}-${day}`;
    }
//console.log(`Date: ${formattedDate}, Time: ${formattedTime}`);
// Output: Date: 2024-08-13, Time: 18:30


    return (
        <div className={`order-management ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-screen transition-colors duration-300`}>
           
            <h2 className="text-2xl font-bold mb-4">Order Management</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-500 text-left">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">User Name</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Quantity</th>
                        <th className="border px-4 py-2">Total Price</th>
                        <th className="border px-4 py-2">Address</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.Id} className={`${isDarkMode ?'hover:bg-gray-900' : 'hover:bg-gray-200'}`}>
                            <td className="border px-4 py-2">{order.orderId}</td>
                            <td className="border px-1 py-2">{order.full_name}</td>
                            <td className="border px-4 py-2">{dateFormater(order.date)}</td>
                            <td className="border px-4 py-2">{order.item_quantity}</td>
                            <td className="border px-4 py-2">${order.amount}</td>
                            <td className="border px-1 py-2">{order.address},{order.pin_code}</td>
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
