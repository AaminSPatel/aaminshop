import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from './adminHeader';
import ShoppingAppContext from '../ShoppingAppContext';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const {isDarkMode,toggleTheme} = useContext(ShoppingAppContext);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8081/login');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8081/user/delete/${userId}`);
            setUsers(users.filter(user => user.Id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    
    return (
        <div className={`user-management ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-screen transition-colors duration-300`}>
            
            <h2 className="text-2xl font-bold mb-4">User Management</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-slate-500 text-left">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Username</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.Id} className={`${isDarkMode ?'hover:bg-gray-900' : 'hover:bg-gray-200'}`}>
                            <td className="border px-4 py-2">{user.Id}</td>
                            <td className="border px-4 py-2">{user.username}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => deleteUser(user.Id)}
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

export default UserManagement;
