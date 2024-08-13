import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaCartPlus, FaCartShopping, FaCross, FaHeart, FaMoon, FaSun } from "react-icons/fa6";
import { FaShoppingCart, FaUserAlt,FaTimes } from "react-icons/fa";
import { MdHomeFilled } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import useTools from "../ShoppingCard/tools";
import { IoArrowBackOutline } from "react-icons/io5";
//import ShopItems from './shopItems';
import  ShoppingAppContext  from "../ShoppingAppContext";
import { Link } from 'react-router-dom'; // If you use React Router for navigation

export default function header (props) {
    const [sticky,setSticky] = useState(0);
  /*  { document.querySelector('button').addEventListener('click', () => {
    // Add functionality for mobile menu toggle
    alert('Mobile menu toggle');
}) */
  const {handleChangeSearch,toggleTheme,searchItems,isDarkMode} =useContext(ShoppingAppContext);
 
  const navigate = useNavigate();
  window.onscroll = function() { fixHeaderOnScroll() };

function fixHeaderOnScroll() {
  var header2 = document.getElementById("header-2");
  //var sticky = 0; // The scroll position after which the header should stick
  
  if (window.scrollY > sticky) {
    header2.style.overflow = 'hidden';
    header2.style.height = '0';
    setIsOpen(false);
    setSticky(window.scrollY);
   // console.log('header collaps when scroll down');
    
  } else {
    header2.style.height = '40px';
    header2.style.overflow = 'auto';
   // console.log('header come down when scroll up');
    setSticky(window.scrollY);
    

  }
}
/* useEffect(()=>{
  let va = document.getElementById('sideba').style;
   va.display='none';
}) */
  const clasDropList =
    "bg-slate-800 cursor-pointer hover:bg-slate-900 px-1 mb-0.5 w-full text-center rounded";

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
  
  return (
    <div id="myHeader" className=" w-screen  h-auto z-20">
         <div id="header-1" className="w-screen">
       <div className="">
        <div className={` w-full h-16 text-2xl flex items-center gap-3 flex-row justify-between  ${isDarkMode ? 'bg-slate-900 text-white':'bg-slate-200 text-black'}  px-6`}>
        <div className={`flex items-center gap-3 flex-row  justify-start ${isDarkMode ? 'bg-slate-900 text-white':'bg-slate-200 text-black'} `}>
        <a href="/home" className="text-2xl font-bold flex" >
             <img src="/src/assets/logo1.png" className={`${isDarkMode ? '' : 'bg-black rounded-full'} h-12 w-12`} alt="" />
            <span className="text-yellow-500">Aamin</span>Shop
        </a>

        </div>
      
        <div className="flex items-center gap-3 flex-row justify-start ">
          <p className="group SearchButton text-2xl cursor-pointer flex flex-row items-center justify-start">
           
            <input type="text" placeholder="Search" onChange={(e)=>{handleChangeSearch(e)}} className="SearchInput text-sm group-hover:px-3 text-black sm:w-56 md:w-64 rounded-xl h-6" />
             <IoIosSearch className="pl-2 text-3xl"/>
          </p>
          <p
            className=" cursor-pointer  text-xl"
            onClick={() => {
              navigate("/shopFav");
            }}
          >
            <FaHeart />
          </p>
          <p
            className=" cursor-pointer  text-xl"
            onClick={() => {
              navigate("/shopcart");
            }}
          >
            <FaCartShopping />
          </p>
          <p className="text-xl cursor-pointer" onClick={()=>{navigate("/profile")}} >
            <FaUserAlt />
          </p>
          <p onClick={toggleTheme}>
            {isDarkMode ? <FaMoon/> : <FaSun/>}
          </p>
        </div>
      </div>
        </div>

<header id="header-2" className={`${isDarkMode ? 'bg-slate-700  text-white' : 'bg-slate-200 text-black'}    w-full shadow-md`}>
    <div className="container w-full  flex justify-start items-center p-1 px-5">
       
        <nav className="flex  ">
        
          <div className="hidden sm:flex ml-1 space-x-6">
            <a href="/home" className="hover:text-yellow-500">Home</a>
            <a href="/shop" className="hover:text-yellow-500">Shop</a>
            <a href="/aboutus" className="hover:text-yellow-500">About</a>
            <a href="/contact" className="hover:text-yellow-500">Contact</a>
            
          </div>
          <div className="hidden sm:flex pb-1">
            <ul className="flex justify-center gap-6 px-6 w-auto items-center flex-row  font-sans">
            <li className="dropDownlistCategory cursor-pointer hover:text-yellow-500">
               Category
              <ul className="dropDownlistCategoryul flex  absolute w-32 bg-white  rounded-md justify-center p-1 items-center flex-col font-serif">
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("Clothing");
                  }}
                >
                  Clothing
                </li>
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("Footwear");
                  }}
                >
                  Footwear
                </li>
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("Accessories");
                  }}
                >
                  Accessories
                </li>
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("Watches");
                  }}
                >
                  Watches
                </li>
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("Sports & Fiteness");
                  }}
                >
                  Sports
                </li>
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems( "Mobiles");
                  }}
                >
                  Mobiles
                </li>

                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("Grooming & Perfumes");
                  }}
                >
                  Perfumes
                </li>
              </ul>
            </li>
            <li className="dropDownlistBrand hover:text-yellow-500 cursor-pointer ">
              Brands
              <ul className="dropDownlistBrandul flex absolute w-32 bg-white  rounded-md justify-center p-1 items-center flex-col font-serif">
              <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("adidas");
                  }}
                >
                  Adidas
                </li>
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("HRX by Hrithik Roshan");
                  }}
                >
                  HRX
                </li>
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("Jockey");
                  }}
                >
                  Jockey
                </li>
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("Titen");
                  }}
                >
                  Titen
                </li>
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems( "Apple");
                  }}
                >
                  Apple
                </li>
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems( "Realme");
                  }}
                >
                  Realme
                </li>
                
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("Samsung");
                  }}
                >
                  Samsung
                </li>
               
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("Wild Stone");
                  }}
                >
                  Wild Stone
                </li>
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("Adil Qadri");
                  }}
                >
                  Adil Qadri
                </li>
                
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("Jack Jones");
                  }}
                >
                  Jack Jones
                </li>
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("Park Avenue");
                  }}
                >
                  ParkAvenue
                </li>
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("Highlander");
                  }}
                >
                  Highlander
                </li>
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("Indian Terrain");
                  }}
                >
                  IndianTerrain
                </li>
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems( "Nike");
                  }}
                >
                  Nike
                </li>
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("adidas");
                  }}
                >
                  Adidas
                </li>
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("SkyBags");
                  }}
                >
                  SkyBags
                </li>
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems("Campus");
                  }}
                >
                  Campus
                </li>
                <li
                  className={clasDropList}
                  onClick={() => {
                    searchItems( "Backberrys");
                  }}
                >
                  Backberrys
                </li>
                
              </ul>
            </li>
          </ul>
          </div>
            
            
        </nav>

       
{/* 
        <button className="sm:hidden  flex items-center p-2 text-gray-500 hover:text-white"
        onClick={()=>{
         let va = document.getElementById('sideba').style;
         if(va.display == 'block'){
          va.display = 'none';
         }
         else{
          va.display = 'block';
         } 
        }}>
           <FaBars/>
        </button> */}
{/* 
<div id="sideba" className="fixed sm:hidden bg-slate-700 top-2 left-0 h-auto py-3 mt-24 pt-5 lg:32 px-2 sm:w-20 sm:px-2 md:w-32 md:px-5 z-10">
 <ul>
  <li><a href="">Home</a></li>
  <li><a href="">Shop</a></li>
  <li><a href="">About</a></li>
  <li><a href="">Contact</a></li>
  <li><a href="">Home</a></li>
 </ul>
</div> */}
<button onClick={toggleMenu} className={`text-2xl sm:hidden ${isOpen ? isDarkMode ?' bg-slate-900 rounded-full p-1' :'bg-slate-400 rounded-full p-1': 'transparent '}`}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <nav className={`sm:hidden fixed top-24 md:items-start mt-1  z-300 rounded-md justify-start ${isDarkMode ? 'bg-slate-900 ' : 'bg-slate-400'}  md:space-x-6 ${isOpen ? 'block' : 'hidden'}`}>
          <Link to="/home" className="block py-2 px-4 hover:bg-slate-800 hover:text-white rounded">
            Home
          </Link>
          <Link to="/shop" className="block py-2 px-4 hover:bg-slate-800 hover:text-white rounded">
            Shop
          </Link>
          <Link to="/aboutus" className="block py-2 px-4 hover:bg-slate-800 hover:text-white rounded">
            About
          </Link>
          <Link to="/contact" className="block py-2 px-4 hover:bg-slate-800 hover:text-white rounded">
            Contact
          </Link>
        </nav>
   
    </div>
</header>


       </div>


    </div>
  )
};