import React, { useContext, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import ShopItems from './shopItems';
import ShoppingAppContext from "../ShoppingAppContext";

export default function Cars() {
const {  isDarkMode,searchRender,setAllShoppingItemsData,loading, setLoading,productDataTo,searchItems,setProductDataTo ,pathToPage} = useContext(ShoppingAppContext);
const [productDataToShow,setProductDataToShow] = useState();
/* const [loading, setLoading] = useState(true);
 */
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
  const handler = setTimeout(() => {
   fetchData();
  }, 400);
   //window.scrollTo(0, 0);
  return () => {
    clearTimeout(handler);
  };
  
  
  // console.log('productDatoshow = ',productDataToShow,'productdatato = ',productDataTo,'Loading = ',loading);
 

}, []);
/*  
useEffect(()=>{
  setProductDataToShow(productDataTo);
},[]) */
 useEffect(()=>{
  //setProductDataToShow(productDataTo);
  //console.log(productDataTo);
  
  setProductDataToShow(productDataTo);
     
},[searchRender,productDataTo])
 
if (loading) {
  return <div>Loading...</div>;
}
  else{
  return (
    <div id="ShoppingItemsPage" className={`w-auto h-auto flex justify-center items-center ${isDarkMode ? 'bg-black text-white':'bg-white text-black'} flex-col flex-wrap`}>
    
      <div className="flex justify-center items-center flex-col flex-wrap">
        <div className="flex justify-center items-center flex-row flex-wrap">
         {/*  {Array.isArray(productDataToShow) && productDataToShow.slice(0, 15).map((data, i) => (
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
          ))} */}  </div>
                 <Pagination productDataToShow={productDataToShow} />      </div>

       
    </div>
  );}
}

const Pagination = ({ productDataToShow }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  let ara = []
  if(!productDataToShow){
    return 
  }
   ara =  productDataToShow;
  //console.log(productDataToShow,ara);
   
  // ara =  productDataToShow;
  // Calculate the total number of pages
  const totalPages = Math.ceil( ara.length / itemsPerPage);

  // Slice the product data for the current page
  const currentProducts = ara.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-4">
        <div className="flex justify-center items-center flex-row flex-wrap">
        {currentProducts.map((data, i) => (
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

      <div className="flex justify-center mt-6">
        <ul className="flex space-x-2">
          <button className={`px-3 rounded-lg text-xl ${
                  currentPage ===  1
                    ? "bg-slate-800 text-white opacity-50"
                    : "bg-gray-200 text-gray-700 hover:text-orange-500"
                }`} onClick={() => handlePageChange(currentPage !== 1 ? currentPage -1 : currentPage)}>
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i}>
              <button
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-slate-800 text-white"
                    : "bg-gray-200 text-gray-700 hover:text-orange-500"
                }`}
              >
                {i + 1}
              </button>
            </li>
          ))}
          <button className={`px-3 rounded-lg text-xl ${
                  currentPage == totalPages
                    ? "bg-slate-800 text-white opacity-50"
                    : "bg-gray-200 text-gray-700 hover:text-orange-500"
                }`} onClick={() => handlePageChange(currentPage !== totalPages ? currentPage +1 : currentPage)}>
            &gt;
          </button>
        </ul>
      </div>
    </div>
  );
};