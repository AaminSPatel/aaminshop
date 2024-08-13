import React, { useContext, useEffect, useState } from "react";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { FaCartArrowDown, FaCartPlus, FaHeart } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useTools from "./tools";
import { IoCart, IoCartOutline } from "react-icons/io5";
import ShoppingAppContext from "../ShoppingAppContext";

export default function itemShop(data) {
  // const [addedCart, setAddedCart] = useState(false);
  ////const [productOpen, setProductOpen] = useState(false);
 // const [productIdToOpen, setProductIdToOpen] = useState([]);
  const {
    addedCart,
    isCartAdded,
    addtocart,
    removetocart,
    setAddedCart,
    productClicked,
    addtofav,
    removetofav,
    isFavAdded,toGetCartAndFavState,
    setIsFavAdded,
    setIsCartAdded,rendr
  } = useTools();
 
  const { userId,isDarkMode} = useContext(ShoppingAppContext)
  let product_id = data.product_id;
  // let userId = 1;

      
       useEffect(() => {
        toGetCartAndFavState(userId, product_id)
      //  console.log(userId);
        
    }, [userId, product_id,rendr]);  // Include `uId` and `product_id` as dependencies if they change 
  return (
    <div className="flex flex-col justify-center items-center mb-2 my-2 h-auto">
      <div className="allitemsofshop flex justify-center items-center flex-row flex-wrap w-full h-auto">
        <div className={`${isDarkMode ? 'bg-slate-900 text-white shadow-slate-300':'bg-slate-400  shadow-slate-700 text-black'}  shadow-md rounded-xl h-auto pb-3 my-2 mx-1`}>
          <div className="group w-60 h-64 bg-white rounded-xl overflow-hidden">
            <img
              className=" w-auto mx-auto h-64 hover:scale-110 transition-all"
              src={data.image_path}
              alt={data.image_path}
              onClick={() => {
                productClicked(
                  data.product_name,
                  data.image_path,
                  data.price,
                  data.brand,
                  data.category,
                  data.product_id,
                  
                );
              }}
            />
            <p className="absolute -translate-y-64 px-3 p-1 rounded-xl text-black transition-all z-10 gap-3 text-xl  font-semibold h-6 w-60  flex justify-between opacity-0 group-hover:opacity-100 item-center flex-row">
              <span className="cursor-pointer hover:text-blue-950 bg-white shadow-xl shadow-slate-400 h-6 w-6 rounded-sm flex justify-center items-center">
                {isFavAdded ? (
                  <span
                    onClick={() => {
                      removetofav(
                        data.product_id,
                        userId
                      );
                    }}
                  >
                    <FaHeart />
                  </span>
                ) : (
                  <span
                    onClick={() => {
                      addtofav(
                        data.product_id,
                        userId
                      );
                    }}
                  >
                    <FaRegHeart />
                  </span>
                )}
              </span>
              <span className="cursor-pointer hover:text-blue-950 bg-white shadow-xl shadow-slate-400 h-6 w-6 rounded-sm flex justify-center items-center">
                {isCartAdded ? (
                  <span
                  onClick={() => {
                    removetocart(
                      data.product_id,
                      userId
                    );
                  }}
                >
                  <IoCart />
                </span>
                ) : (
                  
                  <span
                  onClick={() => {
                    addtocart(
                      data.product_id,
                      userId                 
                    );
                  }}
                >
                  <IoCartOutline />
                </span>
                )}
              </span>
            </p>
          </div>
          <div className="">
            <div className="flex items-center gap-1 justify-between  font-medium px-1">
              <p className="h-auto text-lg max-w-44 ">{data.product_name}</p>
              <p className="text-xl font-semibold">${data.price}</p>
            </div>
            <div className="flex items-start gap-1 justify-between  font-medium  px-1">
              <p className="text-lg font-medium">
                {data.brand} <br />
                <span className="font-normal text-sm">{data.category}</span>
              </p>
              
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
