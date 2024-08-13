import React, { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login/login";
import ShopCart  from './ShoppingCard/shopCart'
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import Signup from "./Signup/signup";
import Home from "./Home/home2";
import Items from "./ShoppingCard/shoppingHome";
import FavItems from "./ShoppingCard/favItems";
import ProductItems from "./ShoppingCard/productPage";
import {ShoppingAppProvider} from './ShoppingAppContext'
import useTools from "./ShoppingCard/tools";
import Header from "./Header/header";

import { IoIosSearch } from "react-icons/io";
import Footer from "./Footer/footer";
import UserProfileDashboard from "./ProfileDashboard/UserProfileDashboard";
import AboutUs from "./About/about";
import ContactUs from "./About/contact";
import TermsOfService from "./Support/termServices";
import PrivacyPolicy from "./Support/privacyPolicy";
import HelpAndSupport from "./Support/helpSupport";
import AdminPanel from "./AdminPanel/adminPanel";
import Dashboard from "./AdminPanel/dashboard";
import UserManagement from "./AdminPanel/userManage";
import ProductManagement from "./AdminPanel/productManage";
import OrderManagement from "./AdminPanel/orderManage";
import FavoritesManagement from "./AdminPanel/favManage";
import CartManagement from "./AdminPanel/cartManage";
import HeaderAdmin from "./AdminPanel/adminHeader";
import Faq from './Support/Faq'
export default function App() {
 // const {handleChangeSearch} = useTools();
 const location = useLocation();

    // Determine if the current route is part of the admin panel
    const isAdminRoute = location.pathname.startsWith('/admin');

  return (
<ShoppingAppProvider>
  <div>
  
      <div className="mt-24">
      {isAdminRoute ? <HeaderAdmin/> : <Header/>}
      
      
        <Routes>          
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/shop" element={<Items/>}></Route>
            <Route path="/shopcart" element={<ShopCart/>}></Route>
            <Route path="/shopfav" element={<FavItems/>}></Route>
            <Route path="/product" element={<ProductItems/>}></Route>
            <Route path="/profile" element={<UserProfileDashboard/>}></Route>
            <Route path="/aboutus" element={<AboutUs/>}></Route>
            <Route path="/contact" element={<ContactUs/>}></Route>
            <Route path="/terms-of-service" element={<TermsOfService/>}></Route>
            <Route path="/privacy-policy" element={<PrivacyPolicy/>}></Route>
            <Route path="/help-&-support" element={<HelpAndSupport/>}></Route>
            <Route path="/faqs" element={<Faq/>}></Route>
            <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/products" element={<ProductManagement />} />
        <Route path="/admin/orders" element={<OrderManagement />} />
        <Route path="/admin/favorites" element={<FavoritesManagement />} />
        <Route path="/admin/cart" element={<CartManagement />} />  

        <Route path="/home" element={<Home />}></Route>
        </Routes>
        <Footer/>
      </div>
  </div>
 
 
  </ShoppingAppProvider>
  );
}
