import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from './adminHeader';
import ShoppingAppContext from '../ShoppingAppContext';

const FavoritesManagement = () => {
    const [favorites, setFavorites] = useState([]);
    const {isDarkMode,toggleTheme} = useContext(ShoppingAppContext);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:8081/shopping_fav');
                setFavorites(response.data);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
        };

        fetchFavorites();
    }, []);

    const deleteFavorite = async (p_id, u_id) => {
        try {
            await axios.delete(`http://localhost:8081/shopping_fav/delete`, { data: { pid: p_id, uid: u_id } });
            setFavorites(favorites.filter(fav => fav.p_id !== p_id || fav.u_id !== u_id));
        } catch (error) {
            console.error('Error deleting favorite:', error);
        }
    };

    return (
        <div className={`favorites-management ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-screen transition-colors duration-300`}>
            
            <h2 className="text-2xl font-bold mb-4">Favorites Management</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-500 text-left">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Product Id</th>
                        <th className="border px-4 py-2">User ID</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {favorites.map(fav => (
                        <tr key={fav.p_id + '-' + fav.u_id} className={`${isDarkMode ?'hover:bg-gray-900' : 'hover:bg-gray-200'}`}>
                            <td className="border px-4 py-2">{fav.Id}</td>
                            <td className="border px-4 py-2">{fav.p_id}</td>
                            <td className="border px-4 py-2">{fav.u_id}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => deleteFavorite(fav.p_id, fav.u_id)}
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

export default FavoritesManagement;
