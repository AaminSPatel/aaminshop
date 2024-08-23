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
import Order from "./Order/order";
import AddItem from "./ShoppingCard/newItemAdd";

export default function App() {
 // const {handleChangeSearch} = useTools();
 const location = useLocation();

    // Determine if the current route is part of the admin panel
    const isAdminRoute = location.pathname.startsWith('/aaminshop/admin');
/*  useEffect(()=>{
  axios.get('http://localhost:8081/track-visitor')
  .then(data=>console.log(data)
  )
  .catch(err=>console.log(err)
  )
})  */
  return (
<ShoppingAppProvider>
  <div>
  
      <div className={`${isAdminRoute ? 'mt-16 pt-2': ' mt-24'}`}>
      {isAdminRoute ? <HeaderAdmin/> : <Header/>}
      
      
        <Routes>          
            <Route path="/aaminshop/login" element={<Login />}></Route>
            <Route path="/aaminshop/signup" element={<Signup />}></Route>
            <Route path="/aaminshop/shop" element={<Items/>}></Route>
            <Route path="/aaminshop/shopcart" element={<ShopCart/>}></Route>
            <Route path="/aaminshop/order" element={<Order/>}></Route>
            <Route path="/aaminshop/shopfav" element={<FavItems/>}></Route>
            <Route path="/aaminshop/product" element={<ProductItems/>}></Route>
            <Route path="/aaminshop/additem" element={<AddItem/>}></Route>
            <Route path="/aaminshop/profile" element={<UserProfileDashboard/>}></Route>
            <Route path="/aaminshop/aboutus" element={<AboutUs/>}></Route>
            <Route path="/aaminshop/contact" element={<ContactUs/>}></Route>
            <Route path="/aaminshop/terms-of-service" element={<TermsOfService/>}></Route>
            <Route path="/aaminshop/privacy-policy" element={<PrivacyPolicy/>}></Route>
            <Route path="/aaminshop/help-&-support" element={<HelpAndSupport/>}></Route>
            <Route path="/aaminshop/faqs" element={<Faq/>}></Route>
            <Route path="/aaminshop/admin/*" element={<AdminPanel />} />
        <Route path="/aaminshop/admin/dashboard" element={<Dashboard />} />
        <Route path="/aaminshop/admin/users" element={<UserManagement />} />
        <Route path="/aaminshop/admin/products" element={<ProductManagement />} />
        <Route path="/aaminshop/admin/orders" element={<OrderManagement />} />
        <Route path="/aaminshop/admin/favorites" element={<FavoritesManagement />} />
        <Route path="/aaminshop/admin/cart" element={<CartManagement />} />  

        <Route path="/aaminshop/" element={<Home />}></Route>
        </Routes>
        <Footer/>
      </div>
  </div>
 
 
  </ShoppingAppProvider>
  );
}
