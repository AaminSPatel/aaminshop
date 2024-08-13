import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ShoppingAppContext from '../ShoppingAppContext';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [favCounts, setFavCounts] = useState({}); // State to store favorite counts
    const [cartCounts, setCartCounts] = useState({}); // State to store favorite counts
    const { isDarkMode } = useContext(ShoppingAppContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8081/shopping');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Fetch favorite counts for each product
        const fetchFavCounts = async () => {
            const counts = {};
            for (const product of products) {
                try {
                    const response = await axios.get(`http://localhost:8081/shopping_fav/favCount?p_id=${product.productId}`);
                    counts[product.productId] = response.data.favCount;
                } catch (error) {
                    console.error('Error fetching favorite count:', error);
                    counts[product.productId] = 0;
                }
            }
            setFavCounts(counts);
        };

        if (products.length > 0) {
            fetchFavCounts();
        }
        const fetchCartCounts = async () => {
            const count = {};
            for (const product of products) {
                try {
                    const response = await axios.get(`http://localhost:8081/shopping_cart/cartCount?p_id=${product.productId}`);
                    count[product.productId] = response.data.cartCount;
                } catch (error) {
                    console.error('Error fetching Cart count:', error);
                    count[product.productId] = 0;
                }
            }
            setCartCounts(count);
        };

        if (products.length > 0) {
            fetchCartCounts();
        }
        
    }, [products]);

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://localhost:8081/shopping/delete/${productId}`);
            setProducts(products.filter(product => product.productId !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className={`product-management ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-screen transition-colors duration-300`}>
            <h2 className="text-2xl font-bold mb-4">Product Management</h2>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-500 text-left">
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Product Name</th>
                        <th className="border px-4 py-2">Brand</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">In Carts</th>
                        <th className="border px-4 py-2">In Favs</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.productId} className={`${isDarkMode ? 'hover:bg-gray-900' : 'hover:bg-gray-200'}`}>
                            <td className="border px-4 py-2">{product.productId}</td>
                            <td className="border px-4 py-2">{product.product_name}</td>
                            <td className="border px-4 py-2">{product.brand}</td>
                            <td className="border px-4 py-2">${product.price}</td>
                            <td className="border px-4 py-2">{cartCounts[product.productId] || 0}</td>
                            <td className="border px-4 py-2">{favCounts[product.productId] || 0}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => deleteProduct(product.productId)}
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

export default ProductManagement;
