import React, { useContext, useEffect, useState } from "react"
import ShopItems from './shopItems'
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import useTools from "./tools";
import ShoppingAppContext from "../ShoppingAppContext";

export default function Fav (props) {
    const [favItems,setFavItems] = useState([]);
    //const [IsDataPresent,setIsDataPresent] = useState()
    const { userId,isDarkMode ,pathToPage} = useContext(ShoppingAppContext)
    const {IsDataPresent,setIsDataPresent,navigate} = useTools();
     useEffect(()=>{
        fetch(pathToPage +`/shopping/fav/${userId}`)
  .then((res) => res.json())
      .then((data) => {
        setFavItems(data);
        console.log(data);
        
      })
      .catch((err) => console.log(err));
      window.scrollTo(0, 0);

    },[]); 

    setTimeout(()=>{
       if(favItems.length == 0){
        setIsDataPresent(false)
      }
      else{
        setIsDataPresent(true)
      }
    },200);
  return (
    <div className={`w-full ${isDarkMode ? 'bg-slate-800 text-white':'bg-slate-200 text-black'} h-auto`}>
      
      <div className="flex justify-center items-center flex-row flex-wrap">
{  IsDataPresent ? 
        '' : 
          userId == 0 || userId == null ? (
          <div className="h-40 w-full flex justify-center items-center text-2xl flex-col gap-5">
                Please Login to add items to Favriote Item List <br />
                <button className="bg-slate-500 text-white px-3 rounded-md py-1 " onClick={()=>{navigate('/login')}}>Login</button>
          </div>
          ) :(
          <div className="h-40 w-full flex justify-center items-center text-2xl flex-col gap-5">
                No  Products present In your Favriote Item List <br />
                <button className="bg-slate-500 text-white px-3 rounded-md py-1 " onClick={()=>{navigate('/shop')}}>Add Items to fav List</button>
          </div>
          )
         }
      {
      favItems.map((data,i)=>(
            <ShopItems key={i} product_name={data.product_name} image_path = {data.image_path} brand={data.brand} price= {data.price} category = {data.category} product_id = {data.productId}/>
        ))}
      </div>
      
        
    </div>
  )
};