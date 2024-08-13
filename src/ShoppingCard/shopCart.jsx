import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa6";
import { IoArrowBackOutline } from "react-icons/io5";

import { RxCross2 } from "react-icons/rx";
//import { useNavigate } from "react-router-dom";
import  ShoppingAppContext  from "../ShoppingAppContext";
import useTools from "./tools";
export default function ShoppingCart(props) {
  const [itemNum, setItemNum] = useState();
/*   const [totalPrice, setTotalPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [subTotal,setSubTotal] = useState(0);

  const navigate = useNavigate();
 */
  const {cartData,navigate,removetocart,rendr,setRendr,/* decreaseClick,increaseClick */ setCartData,subTotal,setSubTotal,tax, setTax,totalPrice, setTotalPrice} = useTools()
  const { userId,isDarkMode} = useContext(ShoppingAppContext)
  useEffect(() => {
   
      axios.get(`http://localhost:8081/shopping/cart/${userId}`)
        //.then((res) => {console.log(res)})
        .then((data) => {setCartData(data.data)})
        .catch((err) => console.log(err));
        //console.log(cartData); 
  },[rendr,subTotal,itemNum]);

  
 
  useEffect(() => {
    fetch(`http://localhost:8081/shopping_cart/count-rows/${userId}`)
      .then((res) => res.json())
      .then((data) => {setItemNum(data.count);
        //console.log(data.count);
        
      })
      .catch((err) => console.log(err));
     // console.log(itemNum);
      
  },[rendr]); 
  useEffect(() => {
    fetch(`http://localhost:8081/shopping_cart/totalPrice/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const totalPrice = Math.floor(data.totalPrice);
        setSubTotal(totalPrice);
        const taxAmount = Math.floor(totalPrice / 100 * 8.5);
        setTax(taxAmount);
        setTotalPrice(totalPrice + taxAmount);
       // console.log(taxAmount, totalPrice, subTotal);
      })
      .catch((err) => console.log(err));
  },[rendr]);
  /*  function crossShopCartClick(nam) {
    axios
      .delete(`http://localhost:8081/shopping_cart/delete/${nam}`)
      // .then((res)=>console.log(res))
      .catch((err) => console.log(err));
  } */

  function increaseClick(item_id, user_id, cart) {
    //let currentItemNum = cart;
    let increaseItemNum = cart + 1;
    if (10 > cart) {
      axios
        .put(`http://localhost:8081/shopping_cart/increase`, {
          item_id,
          user_id,
          increaseItemNum,
        })
        .then((res)=>{
          //res.json();
          //console.log(res.data.message)
          if(res.data.message == 'Quantity Updated successfully'){
            setRendr(rendr+1)
          }
        })
        .catch((err) => console.log(err));
    }
  }
  function decreaseClick(item_id,user_id, cart) {
    if (cart > 0)
      axios
        .put(`http://localhost:8081/shopping_cart/decrease`,{item_id,user_id})
        .then((res)=>{
          //console.log(res)
          if(res.data.message == 'Quantity Updated successfully'){
            setRendr(rendr+1)
          }
        })
        .catch((err) => console.log(err));
  }
 
  return (
    <div className={`w-full h-auto ${isDarkMode ? 'bg-gray-800 text-white':'bg-gray-300 text-black'}  flex justify-evenly items-start flex-col`}>


      <div className="w-full h-auto flex justify-evenly items-start flex-row sm:flex-nowrap md:flex-nowrap lg:flex-nowrap flex-wrap">
      <div className=" sm:w-full md:w-full lg:w-3/6 w-full max-w-100 rounded h-screen pb-8 overflow-y-auto hide-scrollbar  py-3 flex justify-start items-start gap-2 px-3 flex-col">
        <p className={`${isDarkMode? 'bg-slate-900' :'bg-white'}  w-full px-3 text-lg font-normal flex justify-between rounded-md`}>
          <h2>Your product list</h2>
          <span>{itemNum} Items</span>
        </p>
        {
            itemNum==0 || itemNum==null ? 
            (userId == null || userId == 0 ? (
              <p className="h-32 w-full flex items-center flex-col px-5 text-2xl text-white rounded bg-orange-600">
                Please Login to Add Items to Cart
                <a href="/login" className="bg-white px-4 hover:text-orange-500 text-black rounded ">Login</a>
                 </p>) : 
            ( <p className="h-32 w-full flex flex-col items-center px-5 text-2xl text-white rounded bg-orange-600">
              No Items Here Add Items to Cart
              <a href="/shop" className="bg-white px-4 hover:text-orange-500 text-black rounded ">Add Items</a>
              </p>) ) : ''
          }
          {/* {
            userId == null || userId == 0 ? (
            <p className="h-32 w-full flex items-center flex-col px-5 text-2xl text-white rounded bg-orange-600">
              Please Login to Add Items to Cart
              <a href="/" className="bg-white px-4 hover:text-orange-500 text-black rounded ">Login</a>
               </p>) : ''
          } */}
         {cartData.map((d, i) => (
          <div
            className={`  ${isDarkMode ? 'bg-gray-700' : 'bg-white'} w-full h-24 py-3 rounded-md flex justify-center items-center flex-row`}
            key={i}
          >
            <div className="h-24 w-24 flex justify-center items-center mx-1 ">
              <img
                className="rounded-md h-20 w-24 transform hover:scale-105"
                src={d.image_path}
                alt={d.image_path}
              />
            </div>
            <div className="w-full h-24 flex justify-center items-start flex-col">
              <div className="flex justify-between w-full items-center font-sans font-semibold px-2 py-1">
                <p className="h-auto">{d.product_name}</p>
                <p
                  className={`${isDarkMode ? 'hover:bg-blue-500 text-slate-100' : 'hover:bg-blue-300 text-slate-800'}  cursor-pointer active:bg-slate-100 text-xl`}
                  
                  onClick={() => {
                    removetocart(
                      d.p_id,
                      d.u_id,
                    );
                  }}
                >
                  <RxCross2 />
                </p>
              </div>
              <div className="flex w-full justify-between items-center font-sans px-2 py-1 font-semibold">
                <p className="flex justify-between items-center flex-row font-sans">
                  <span
                    className={` w-6 h-6 pb-2 mr-2 flex justify-center items-center ${isDarkMode ? 'hover:bg-blue-400 bg-slate-500' : 'hover:bg-blue-300 bg-slate-200'}  cursor-pointer active:bg-slate-100 font-semibold text-2xl`}
                    onClick={() => {
                      decreaseClick(d.p_id,d.u_id,d.cart);
                    }}
                  >
                    -
                  </span>
                  <span className="px-1 mr-3 font-semibold ">{d.cart}</span>
                  <span
                    className={` w-6 h-6 pb-2 mr-2 flex justify-center items-center ${isDarkMode ? 'hover:bg-blue-400 bg-slate-500' : 'hover:bg-blue-300 bg-slate-200'}  cursor-pointer active:bg-slate-100 font-semibold text-2xl`}
                    onClick={() => {
                      increaseClick(d.p_id,d.u_id, d.cart);
                    }}
                  >
                    +
                  </span>
                </p>
                <p className="font-bold">${d.cart * d.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="sm:w-64 md:w-96 lg:w-3/6 w-full flex justify-center items-start flex-col">
        <div className={`${isDarkMode ? 'bg-slate-600 ':'bg-white'}  w-full rounded-md flex justify-center items-start flex-col py-4`}>
          <h1 className="px-2  font-sans py-2">Order Summery</h1>
          <table className="flex w-full justify-center items-start flex-row px-2">
            <thead className="flex justify-start items-start flex-col font-semibold">
              <th className="font-semibold w-32 text-left">Subtotal</th>
              <th className="font-semibold w-32 text-left">Tax</th>
              <th className="font-semibold w-32 text-left ">Shipping</th>
              <th className="font-semibold w-32 text-left  border-t-2 my-1  border-0 border-black">
                Total
              </th>
            </thead>
            <tbody className="flex justify-start items-start flex-col">
              <td className="font-bold text-right px-1 flex justify-between w-full items-center flex-row "><span>$</span> <span>{subTotal}</span> </td>
              <td className="font-bold text-right px-1 flex justify-between items-center flex-row w-full"><span>$</span><span>{tax}</span></td>
              <td className="font-bold text-right px-1 flex justify-between items-center flex-row w-full"><span>$</span><span>0</span></td>
              <td className="font-bold text-right px-1 flex justify-between items-center flex-row w-full border-t-2 my-1  border-0 border-black">
              <span>$</span> <span>{totalPrice}</span>
              </td>
            </tbody>
          </table>
          <p className="w-full px-2 ">
            <button className={`w-full ${isDarkMode ? 'bg-white text-black' :'bg-black text-white'}  rounded-md my-1 px-3 py-1 text-center `}>
              Order Now
            </button>
          </p>
        </div>
      </div>
      </div>
      
    </div>
  );
}


/* 

install --save gh-pages
create repository 
"homepage" : "https://AaminSpatel/github.io/aaminshop"
"predeploy" : "npm run build"
"deploy" : "gh-pages -d dist"
 
push to github repo 
npm run deploy




*/