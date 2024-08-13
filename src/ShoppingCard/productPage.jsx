import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  FaCartPlus,
  FaCartShopping,
  FaCross,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa6";
import { IoCart, IoCartOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import useTools from "./tools";
import ShoppingAppContext from "../ShoppingAppContext";
export default function ProductItems() {
  /* const [isCartAdded, setIsCartAdded] = useState(false);
  const [isFavAdded, setIsFavAdded] = useState(false);
  const [arrayOfCartitems, setArrayOfCartitems] = useState([]);
  const [arrayOfFavitems, setArrayOfFavitems] = useState([]);
  const [product, setProduct] = useState({}); */
  const {isCartAdded, arrayOfFavitems,product, setProduct, setArrayOfFavitems,isFavAdded, setIsFavAdded,arrayOfCartitems, setArrayOfCartitems,
    addtocart,removetocart,rendr,removetofav,toGetCartAndFavState,productCrossClicked,addtofav
  } = useTools();
  //const navigate = useNavigate();
  const { userId,isDarkMode} = useContext(ShoppingAppContext)
        
  useEffect(() => {
    toGetCartAndFavState(userId, product.p_id)
    
//console.log(rendr);

}); 

  useEffect(() => {
    fetch("http://localhost:8081/product_page")
      .then((res) => res.json())
      .then((dat) => {
        setProduct(dat[0]);
      })
      .catch((err) => console.log(err));
    //console.log(product.p_name);
    //setProduct(products[0])
  },[]);

  return (
    <div className="sm:h-auto max-w-screen overflow-hidden sm:overflow-y-hidden md:py-5 sm:py-0 m-0 sm:max-h-screen flex  justify-center items-center">
      <div className="flex justify-center w-full  overflow-hidden  items-center">
        <button
          onClick={() => {
            productCrossClicked(product.p_id);
          }}
          className="h-8 absolute left-5 top-32 z-10 text-3xl flex justify-center items-center bg-slate-300 w-8 "
        >
          <RxCross2 />
        </button>
        <div className={`flex justify-center ${isDarkMode ? 'bg-slate-900 text-white': 'bg-slate-100 text-black'} py-10 px-6 w-full items-center flex-row flex-wrap overflow-hidden`}>
          <div className="w-3/6 min-w-96 py-10">
            <img
              className="min-w-96 h-[400px] sm:h-[400px]  lg:h-[500px] md:h-[500px] rounded-xl shadow-md shadow-sky-900 transform transition-all hover:scale-105"
              src={product.i_path}
              alt={product.p_name}
            />
          </div>
          <div className="w-3/6 text-xl flex justify-center items-start flex-col gap-2 min-w-96 px-3  pb-10">
            <p>
              Name : <span className="font-medium px-2"> {product.p_name}</span>
            </p>
            <p>
              Brand : <span className="font-medium px-2"> {product.brand}</span>
            </p>
            <p>
              Category :{" "}
              <span className="font-medium px-2"> {product.category}</span>
            </p>
            <p>
              Price :{" "}
              <span className="font-medium px-2"> ${product.price}</span>
            </p>
            <p className="flex justify-center items-center flex-row gap-1">
             
              {isFavAdded ? (
                <button
                  onClick={() => {
                    removetofav(
                      product.p_id,userId
                    );
                  }}
                  className="border rounded-md border-slate-700 pr-2 text-white bg-blue-950 hover:text-slate-100 hover:bg-blue-900"
                >
                  <span className="float-left m-0.5 py-1 px-1 mr-2 flex justify-center text-blue-900  items-center rounded-md bg-white">
                    <FaHeart />
                  </span>{" "}
                  Added to Fav
                </button>
              ) : (
                <button
                  onClick={() => {
                    addtofav(
                      product.p_id,userId
                    );
                  }}
                  className="border rounded-md border-slate-700 pr-2 hover:text-blue-900 hover:bg-slate-100 text-blue-950 bg-white"
                >
                  <span className="float-left m-0.5 py-1 px-1 text-white mr-2 bg-blue-900 flex justify-center items-center  rounded-md">
                    <FaRegHeart />
                  </span>{" "}
                  Add to Fav
                </button>
              )}

{isCartAdded ? (
                <button
                  onClick={() => {
                    removetocart(product.p_id,userId);
                  }}
                  className="border rounded-md border-slate-700 pr-2 hover:bg-blue-900 text-white bg-blue-950"
                >
                  <span className="float-left py-1 px-1 mr-2 m-0.5 flex justify-center  text-blue-900  items-center rounded-md bg-white">
                    <IoCart />
                  </span>{" "}
                  Added to Cart
                </button>
              ) : (
                <button
                  onClick={() => {
                    addtocart(
                      product.p_id,userId
                    );
                  }}
                  className="border rounded-md border-slate-700 pr-2 text-blue-950 bg-white hover:text-blue-900 hover:bg-slate-100"
                >
                  <span className="float-left py-1 px-1 mr-2 m-0.5 bg-blue-900 flex justify-center items-center text-white rounded-md">
                    <IoCartOutline />
                  </span>{" "}
                  Add to Cart
                </button>
              )}

            </p>
            <hr className="border w-full " />
            <p className=" text-lg">
              Discover the perfect addition to your collection with our
              <span className="font-medium"> {product.p_name}!</span> Made with
              high-quality materials and designed with attention to detail, this{" "}
              <span className="font-medium">{product.category} </span> is sure
              to impress. Whether you're looking for a unique gift or treating
              yourself, our{" "}
              <span className="font-medium">{product.p_name} </span> is the
              perfect choice. This product is both functional and stylish. Order
              now and experience the{" "}
              <span className="font-medium">{product.brand} </span> difference!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
