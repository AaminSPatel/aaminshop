import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Dashboard from "./dashboard";
import UserManagement from "./userManage";
import ProductManagement from "./productManage";
import OrderManagement from "./orderManage";
import FavoritesManagement from "./favManage";
import CartManagement from "./cartManage";
import Header from "./adminHeader";
import ShoppingAppContext from "../ShoppingAppContext";

const AdminPanel = () => {
  const { isDarkMode, toggleTheme } = useContext(ShoppingAppContext);
 const linkClass = `${
              isDarkMode ? "bg-red-600 text-white" : "bg-red-400 text-white"
            } px-3 p-2 w-auto text-right rounded hover:bg-red-500`;

  return (
    <div
      className={`admin-panel py-3 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      } min-h-screen transition-colors duration-300`}
    >
      {/* <nav>
                    <ul className="flex space-x-4 border-b pb-4 mb-4">
                        <li><Link to="/" className="hover:text-blue-500">Dashboard</Link></li>
                        <li><Link to="/users" className="hover:text-blue-500">User Management</Link></li>
                        <li><Link to="/products" className="hover:text-blue-500">Product Management</Link></li>
                        <li><Link to="/orders" className="hover:text-blue-500">Order Management</Link></li>
                        <li><Link to="/favorites" className="hover:text-blue-500">Favorites Management</Link></li>
                        <li><Link to="/cart" className="hover:text-blue-500">Cart Management</Link></li>
                    </ul>
                </nav> */}
      <div className="content">
        <div className="h-[500px] w-full overflow-hidden flex flex-col">
         <Dashboard /> <a
            className={linkClass}
            href="/admin/dashboard"
          >
            Go to Dashboard &gt;&gt;
          </a>
          
        </div>
        <div className="h-[500px] w-full overflow-hidden flex flex-col">
           <UserManagement />
          <a
            className={linkClass}
            href="/admin/users"
          >
             Go to User Management &gt;&gt;
          </a>
         
        </div>
        <div className="h-[500px] w-full overflow-hidden flex flex-col">
         <ProductManagement /> <a
            className={linkClass}
            href="/admin/products"
          >
           Go to ProductManagement &gt;&gt;
          </a>
          
        </div>
        <div className="h-[500px] w-full overflow-hidden flex flex-col">
          <OrderManagement /> <a
            className={linkClass}
            href="/admin/orders"
          >
           Go to OrderManagement &gt;&gt;
          </a>
         
        </div>
        <div className="h-[500px] w-full overflow-hidden flex flex-col">
          <FavoritesManagement /><a
            className={linkClass}
            href="/admin/favorites"
          >
           Go to FavoritesManagement &gt;&gt;
          </a>
          
        </div>
        <div className="h-[500px] w-full overflow-hidden flex flex-col">
          <CartManagement /> <a
            className={linkClass}
            href="/admin/cart"
          >
           Go to CartManagement &gt;&gt;
          </a>
         
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
