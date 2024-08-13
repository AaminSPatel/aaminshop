import React, { useContext, useEffect, useState } from "react";
import { FaTshirt, FaShoePrints, FaMobileAlt, FaFootballBall, FaArrowRight } from "react-icons/fa";
import { IoMdWatch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BsFillHandbagFill } from "react-icons/bs";
import { GiDelicatePerfume } from "react-icons/gi";
import ShopItems from '../ShoppingCard/shopItems';
import ShoppingAppContext from "../ShoppingAppContext";
import Corosel from '../Corosel/corosel'
const categories = [
  { name: "Clothing", icon: <FaTshirt /> },
  { name: "Footwear", icon: <FaShoePrints /> },
  { name: "Sports", icon: <FaFootballBall /> },
  { name: "Accessories", icon: <BsFillHandbagFill /> },
  { name: "Mobile", icon: <FaMobileAlt /> },
  { name: "Watches", icon: <IoMdWatch /> },
  { name: "Perfumes", icon: <GiDelicatePerfume /> },
];

const brands = [
  { name: 'zara', logo: '/src/assets/logo/bl1.jpeg' },
  { name: 'ck', logo: '/src/assets/logo/bl11.jpeg' },
  //{ name: 'apple', logo: '/src/assets/logo/bl2.jpeg' },
  { name: 'titan', logo: '/src/assets/logo/bl3.jpeg' },
  { name: 'adidas', logo: '/src/assets/logo/bl4.jpeg' },
  { name: 'puma', logo: '/src/assets/logo/bl5.jpeg' },
  { name: 'louis vuitton', logo: '/src/assets/logo/bl6.jpeg' },
  { name: 'nike', logo: '/src/assets/logo/bl7.jpeg' },
  { name: 'h&m', logo: '/src/assets/logo/bl8.jpeg' },
  { name: 'pandora', logo: '/src/assets/logo/bl9.jpeg' },
  { name: 'gucci', logo: '/src/assets/logo/bl10.jpeg' },
  { name: 'hrx', logo: '/src/assets/logo/bl13.jpeg' },
];
/* 
const image = [
  {name : 'goggles' , image : 'src/assets/prod/pn1.png'},
  {name : 'goggles' , image : 'src/assets/prod/pn2.png'},
  {name : 'goggles' , image : 'src/assets/prod/pn3.png'},
  {name : 'goggles' , image : 'src/assets/prod/pn4.png'},
  {name : 'goggles' , image : 'src/assets/prod/pn5.png'},
  {name : 'goggles' , image : 'src/assets/prod/pn6.png'},
 ]
 */
const Homepage = () => {
  const navigate = useNavigate();
  const {  setSearchRender,loading,isDarkMode, setLoading,setSearchQuery,searchRender,setAllShoppingItemsData,allShoppingItemsData,setProductDataToShow,productDataTo,setProductDataTo,searchItems } = useContext(ShoppingAppContext);
 // const [productDataToShow,setProductDataToShow] = useState();
  //const [loading, setLoading] = useState(true);
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8081/shopping");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAllShoppingItemsData(data);
        setProductDataToShow(data);
      } catch (error) {
        console.error("Failed to fetch shopping items:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false whether fetch succeeds or fails
      }
    };
  
    fetchData();
  }, []);
   
  useEffect(()=>{
    //setProductDataToShow(productDataTo);
    setSearchRender(s => s + 2)
    //console.log(productDataTo);
   // navigate('/shop')

  },[]) 
  
  useEffect(() => {
    const handleScroll = () => {
      const parallax = document.querySelector('.parallax');
      let scrollPosition = window.pageYOffset;
      parallax.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`${isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-200 text-black' }   font-sans`}>
       {/* <div className="w-full h-[600px] bg-cover bg-center" style={{ backgroundImage: `linear-gradient(#00000000,#00000000), url('src/assets/prod/sh5.jpg') ` }}>

       </div>
       <div className="hero-image mt rounded-2xl  bg-scroll bg-center " style={{ backgroundImage: `linear-gradient(#000000bf,#000000bf), url('src/Corosel/img/pin1.jpeg') ` }} >
        
        <div className="hero-text text-center w-full p-8">
          <h1 className="text-4xl font-bold mb-2">Welcome to <span className="text-yellow-500">Aamin</span>Shop </h1>
          <p className="text-lg">Find everything you need and more.</p>
        </div>
      </div>
 */}
      <div className="parallax bg-center bg-cover text-white h-[536px] " style={{ backgroundImage: `url('src/assets/prod/sh5.jpg')` }}>
        <div className="overlay absolute inset-0 bg-black h-full flex justify-center items-center opacity-50"></div>
        <div className="content relative z-10 flex items-center justify-center flex-col h-full ">
        <h1 className="text-4xl font-bold mb-2">Welcome to <span className="text-yellow-500">Aamin</span>Shop </h1>
          <p className="text-lg">Find everything you need and more.</p>
        
        </div>
      </div>
      
      

      {/* Categories Section */}
      <div className="categories py-8 px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-card group  flex  justify-evenly items-center ${isDarkMode ? 'bg-slate-900 text-white hover:bg-slate-950' : 'bg-slate-400 hover:bg-slate-500'}  rounded-full p-4 text-center  cursor-pointer`}
            onClick={() => {
               searchItems(category.name);
               setSearchQuery(category.name)
               navigate('/shop')
              }}
          >
            <div className="text-4xl mb-2 group-hover:text-yellow-300">{category.icon}</div>
            <p className="text-lg group-hover:text-yellow-300">{category.name}</p>
          </div>
        ))}
      </div>

      {/* Featured Products Section */}
      <div className="featured-products py-8">
        <h2 className="text-3xl font-bold text-center mb-6">All Products</h2>
        <div className="products-grid flex flex-row flex-wrap justify-center items-center   ">
          
          {Array.isArray(allShoppingItemsData) && allShoppingItemsData.slice(0, 5).map((data, i) => (
            <ShopItems
              key={i}
              product_name={data.product_name}
              dataArr={data}
              image_path={data.image_path}
              product_id={data.productId}
              brand={data.brand}
              price={data.price}
              category={data.category}
            />
          ))}
        </div>
        <div className="text-center flex justify-end pr-5 mt-6 ">
          <button
            onClick={() => navigate('/shop')}
            className="text-yellow-500 hover:text-white text-xl flex items-center justify-center"
          >
            See More <FaArrowRight className="ml-2"/>
          </button>
        </div>
      </div>

      {/* See All Products Section */}
      <div className="all-products py-8 overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Products</h2>
        <div id="allProductsGrid" className="products-grid grid grid-cols-9   px-4 ">
          {Array.isArray(allShoppingItemsData) && allShoppingItemsData.slice(23, 32).map((d, i) => (
            <div key={i} className={`product-card ${isDarkMode ? 'bg-slate-900 hover:bg-slate-800' : 'bg-slate-400 hover:bg-slate-600'}  shadow-sm shadow-orange-300 w-44 p-4 rounded-xl  hover:-translate-x-4 transition-transform`} >
              <div className="product-image w-full h-40 bg-gray-400 rounded mb-4">
                
                <img src={d.image_path} alt="" className="h-40 w-36" />
              </div>
              <div className="product-details">
                <h3 className="text-xl mb-2">{d.product_name}</h3>
                <p className="text-lg">${d.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Brands  */}
      <div className="pinterest-gallery py-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center"> Our Trusted Brands</h2>
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-4 gap-8 space-y-4">
        {brands.map((image, index) => (
          <div key={index} className="break-inside-avoid">
            <img
              src={image.logo}
              alt={image.name}
              className="w-full rounded-lg scale-90 hover:scale-100 transition-all hover:opacity-80  duration-300"
            />
          </div>
        ))}
      </div>
    </div>

      {/* Contact Section */}
      <div className={`contact py-8 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-400'}  text-center rounded-xl mx-4 my-8`}>
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-lg">Have questions? We're here to help! Email us at support@aaminshop.com</p>
        <button className="h-10 w-28 bg-yellow-600 rounded mt-4"><a href="/contact">Contact Us</a></button>
      </div>

    </div>
  );
};


/* 
const HeroSection = () => {
  const radius = 350; // Radius of the circle
  const centerX = 100; // Center X-coordinate
  const centerY = 150; // Center Y-coordinate
  const images = [
    { name: 'goggles', image: 'src/assets/prod/pn4.png',ang : '190' },
    { name: 'goggles', image: 'src/assets/prod/pn2.png' ,ang : '-105'},
    { name: 'goggles', image: 'src/assets/prod/pn12.png' ,ang : '-65'},
    { name: 'goggles', image: 'src/assets/prod/pn8.png' ,ang : '0'},
    { name: 'goggles', image: 'src/assets/prod/pn7.png' ,ang : '45'},
    { name: 'goggles', image: 'src/assets/prod/pn6.png' ,ang : '125'},
  ];

   useEffect(() => {
    const interval = setInterval(() => {
      document.querySelector('.circle-container').style.transform = `rotate(${360}deg)`;
    }, 4000);
    return () => clearInterval(interval);
  }, []);
 
  return (
    <div className="relative overflow-hidden bg-orange-300 w-full flex flex-col items-center justify-center" >
     
      <div className="circle-container  flex justify-between flex-row w-full">
        {images.map((imag, i) => {
          const angle = (2 * Math.PI * i) / images.length; // Calculate angle
          const x = centerX + radius * Math.cos(angle) - 32; // X position, adjusted for image size
          const y = centerY + radius * Math.sin(angle) - 32; // Y position, adjusted for image size
         // const isHighlighted = angle === 0;
          return (
            <marquee className={`w-auto bg-orange-500`}>
               <div
              key={i}
              className={`w-full bg-slate-500`}
              
            >
              <img src={imag.image} alt={imag.name} className={`h-28 `}
              />
            </div>
            </marquee>
           
          );
        })}
        
      </div>
    </div>
  );
};
 */

export default Homepage;
