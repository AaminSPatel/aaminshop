import React, { useContext, useEffect, useState } from "react";
import { FaTshirt, FaShoePrints, FaMobileAlt, FaFootballBall, FaArrowRight } from "react-icons/fa";
import { IoMdWatch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { BsFillHandbagFill } from "react-icons/bs";
import { GiDelicatePerfume } from "react-icons/gi";
import ShopItems from '../ShoppingCard/shopItems';
import ShoppingAppContext from "../ShoppingAppContext";
import useTools from "../ShoppingCard/tools";
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
  { name: 'zara', logo: './assets/logo/bl1.jpeg' },
  { name: 'ck', logo: './assets/logo/bl11.jpeg' },
  { name: 'titan', logo: './assets/logo/bl3.jpeg' },
  { name: 'adidas', logo: './assets/logo/bl4.jpeg' },
  { name: 'puma', logo: './assets/logo/bl5.jpeg' },
  { name: 'louis vuitton', logo: './assets/logo/bl6.jpeg' },
  { name: 'nike', logo: './assets/logo/bl7.jpeg' },
  { name: 'h&m', logo: './assets/logo/bl8.jpeg' },
  { name: 'pandora', logo: './assets/logo/bl9.jpeg' },
  { name: 'gucci', logo: './assets/logo/bl10.jpeg' },
  { name: 'hrx', logo: './assets/logo/bl13.jpeg' },
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
  const {  setSearchRender ,pathToPage,loading,isDarkMode, setLoading,setSearchQuery,searchRender,setAllShoppingItemsData,allShoppingItemsData,setProductDataToShow,productDataTo,setProductDataTo,searchItems } = useContext(ShoppingAppContext);
 // const [productDataToShow,setProductDataToShow] = useState();
  //const [loading, setLoading] = useState(true);
  const { productClicked } = useTools()
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(pathToPage +"/shopping");
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
    console.log(pathToPage +"/shopping");
    
  }, []);
   
  useEffect(()=>{
    //setProductDataToShow(productDataTo);
    setSearchRender(s => s + 2)
    //console.log(productDataTo);
   // navigate('/shop')
   window.scrollTo(0, 0);

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
      
      <div className="parallax bg-center bg-cover text-white  h-[80vh] " style={{ backgroundImage: `url('./assets/prod/sh5.jpg')` }}>
        <div className="content relative z-10 flex items-center justify-center flex-col h-full bg-blend-overlay bg-[#000000aa]">
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
               navigate('/aaminshop/shop')
              }}
          >
            <div className="text-4xl mb-2 group-hover:text-yellow-300">{category.icon}</div>
            <p className="text-lg group-hover:text-yellow-300">{category.name}</p>
          </div>
        ))}
      </div>

      {/* All Products Section */}
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
            onClick={() => navigate('/aaminshop/shop')}
            className="text-yellow-500 hover:text-white text-xl flex items-center justify-center"
          >
            See More <FaArrowRight className="ml-2"/>
          </button>
        </div>
      </div>

      {/* Featured  Section */}
      <div className="all-products py-8 overflow-hidden">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Products</h2>
        <div id="allProductsGrid" className="products-grid grid grid-cols-9   px-4 ">
          {Array.isArray(allShoppingItemsData) && allShoppingItemsData.slice(23, 32).map((d, i) => (
            <div key={i} className={`product-card ${isDarkMode ? 'bg-slate-900 hover:bg-slate-800' : 'bg-slate-400 hover:bg-slate-600'}  shadow-sm shadow-orange-300 w-44 p-4 rounded-xl  hover:-translate-x-4 transition-transform`} >
              <div className="product-image cursor-pointer w-full h-40 bg-gray-400 rounded mb-4">
                
                <img onClick={()=>{
                  productClicked(
                  d.product_name,
                  d.image_path,
                  d.price,
                  d.brand,
                  d.category,
                  d.productId,
                );}} src={pathToPage +`/images/${d.image_path}`} alt={d.image_path} className="h-40 w-36" />
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
      <div className={`contact py-8  text-center rounded-xl mx-4 `}>
        <div className={`contact py-8 ${isDarkMode ? 'bg-slate-900' : 'bg-slate-400'}  text-center rounded-xl mx-4 py-8 `}>
        <h2 className="text-3xl font-bold mb-4" >Contact Us</h2>
        <p className="text-lg">Have questions? We're here to help! Email us at support@aaminshop.com</p>
        <button className="h-10 w-28 bg-yellow-600 rounded mt-4"><a href="/aaminshop/contact">Contact Us</a></button>
      </div>
      </div>
      
    </div>
  );
};


export default Homepage;
