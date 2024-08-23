import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaCartPlus } from "react-icons/fa6";
import { IoArrowBackOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

import { RxCross2 } from "react-icons/rx";
//import { useNavigate } from "react-router-dom";
import ShoppingAppContext from "../ShoppingAppContext";
import useTools from "./tools";
export default function ShoppingCart(props) {
  const [itemNum, setItemNum] = useState();
  const [customer, setCustomer] = useState([]);
  const [pids, setPids] = useState([]);
  const [carts, setCarts] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [orderId, setOrderId] = useState();
  /*   const [totalPrice, setTotalPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [subTotal,setSubTotal] = useState(0);

  const navigate = useNavigate();
 */
  const {
    cartData,
    navigate,
    removetocart,
    rendr,
    setRendr,
    /* decreaseClick,increaseClick */ setCartData,
    subTotal,
    setSubTotal,
    tax,
    setTax,
    totalPrice,
    setTotalPrice,
    productClicked,
  } = useTools();
  const {
    userId,
    isDarkMode,
    orderConfirm,
    setOrderConfirm,
    isOrderPlaced,
    setIsOrderPlaced ,pathToPage,openOrderDetailId,setOpenOrderDetailId
  } = useContext(ShoppingAppContext);
  useEffect(() => {
    axios
      .get(pathToPage +`/shopping/cart/${userId}`)
      .then((data) => {
        setCartData(data.data);
        localStorage.setItem("cartData", JSON.stringify(data.data));
      })
      .catch((err) => console.log(err));
  }, [rendr, subTotal, itemNum]);

  useEffect(() => {
    const storedCartData = localStorage.getItem("cartData");
    if (storedCartData) {
      setCartData(JSON.parse(storedCartData));
    }
  }, []);

  useEffect(() => {
    axios
      .get(pathToPage +`/shopping/cart/pIds/${userId}`)
      .then((response) => {
        const data = response.data; // Assuming the response is an array of p_id
        setPids(data.p_ids); // Save the array in state
        setCarts(data.cart); // Save the array in state
        //console.log('pid =',p_ids.p_ids,'cart = ',p_ids.cart);
        //console.log(p_ids.filter((item)=> item.p_id));
       /*  p_ids.forEach(element => {
          setPids(pre=>[...pre,element.p_id])
        });
        console.log(pids);
         */
       setFormData((prev) => ({ ...prev, p_id: data.p_ids,item_carts : data.cart }));
        //localStorage.setItem("cartPIDs", JSON.stringify(p_ids)); // Optionally store it in local storage
      })
      .catch((err) => console.log(err));
  }, [rendr, subTotal, itemNum]);

  const [formData, setFormData] = useState({
    address: customer.address,
    order_type: "",
    email: customer.email,
    mobile: customer.mobile,
    pin_code: "",
    token: "",
    p_id: pids,
    u_id: customer.user_id,
    amount: totalPrice,
    tax: tax,
    item_quantity: itemNum,
    name: customer.full_name,
    item_carts:carts,
  });

  useEffect(() => {
    fetch(`http://localhost:8081/shopping_cart/count-rows/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setItemNum(data.count);
        setFormData((prev) => ({ ...prev, item_quantity: data.count }));
        //console.log(data.count);
      })
      .catch((err) => console.log(err));
    // console.log(itemNum);
  }, [rendr, cartData]);

  useEffect(() => {
    fetch(`http://localhost:8081/shopping_cart/totalPrice/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const totalPrice = Math.floor(data.totalPrice);
        setSubTotal(totalPrice);
        const taxAmount = Math.floor((totalPrice / 100) * 8.5);
        setTax(taxAmount);
        setFormData((prev) => ({
          ...prev,
          amount: totalPrice + taxAmount,
          tax: taxAmount,
        }));
        setTotalPrice(totalPrice + taxAmount);
        // console.log(taxAmount, totalPrice, subTotal);
      })
      .catch((err) => console.log(err));
  }, [rendr, cartData]);

  useEffect(() => {
    fetch(pathToPage +"/userdata")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Convert the response to JSON
      })
      .then((data) => {
        // console.log(data[0].profile_pic);
        if (data.length > 0) {
          setCustomer(data[0]); // Log the actual data
          //console.log(customer.address,data[0]);
          setFormData((prev) => ({
            ...prev,
            address: data[0].address,
            name: data[0].full_name,
            email: data[0].email,
            mobile: data[0].mobile,
            u_id: data[0].user_id,
          }));
        } else {
          setCustomer(Guest[0]);
        }
      })
      .catch((err) => {
        console.log("Error fetching data:", err); // Handle any errors
      });
      window.scrollTo(0, 0);

    //console.log(profileData);
  }, []); // Empty dependency array means this will only run once after the initial render

  function increaseClick(item_id, user_id, cart) {
    //let currentItemNum = cart;
    let increaseItemNum = cart + 1;
    if (10 > cart) {
      axios
        .put(pathToPage +`/shopping_cart/increase`, {
          item_id,
          user_id,
          increaseItemNum,
        })
        .then((res) => {
          //res.json();
          //console.log(res.data.message)
          if (res.data.message == "Quantity Updated successfully") {
            setRendr(rendr + 1);
          }
        })
        .catch((err) => console.log(err));
    }
  }
  function decreaseClick(item_id, user_id, cart) {
    if (cart > 0)
      axios
        .put(pathToPage +`/shopping_cart/decrease`, {
          item_id,
          user_id,
        })
        .then((res) => {
          //console.log(res)
          if (res.data.message == "Quantity Updated successfully") {
            setRendr(rendr + 1);
          }
        })
        .catch((err) => console.log(err));
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        pathToPage +"/order/new_order",
        formData
      );
      console.log(response.data.message);
      if (response.data.orderId) {
        setOrderConfirm(true);
        setOrderId(response.data.orderId);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
    }
    //console.log(formData);
  };
  //order_status :('Pending', 'Shipped', 'Delivered', 'Cancelled') NOT NULL
  const inputClas = `${
    isDarkMode ? "bg-slate-200 text-black" : "bg-slate-300 text-black"
  } px-2 rounded w-full py-1 border-b-gray-300 border-b-2`;
  
  
  return (
    <div
      className={`w-full h-auto ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
      }  flex justify-evenly items-start flex-row flex-wrap`}
    >
      {!isOrderPlaced ? (
        <div className="w-full h-auto flex justify-evenly items-start flex-row sm:flex-nowrap md:flex-nowrap lg:flex-nowrap flex-wrap">
          <div className=" sm:w-full md:w-full lg:w-3/6 w-full max-w-100 rounded h-screen pb-8 overflow-y-auto hide-scrollbar  py-3 flex justify-start items-start gap-2 px-3 flex-col">
            <p
              className={`${
                isDarkMode ? "bg-slate-900" : "bg-white"
              }  w-full px-3 text-lg font-normal flex justify-between rounded-md`}
            >
              <span>Your product list</span>
              <span>{itemNum} Items</span>
            </p>
            {cartData.length ? (
              userId == null || userId == 0 ? (
                <p className="h-32 w-full flex items-center flex-col px-5 text-2xl text-white rounded bg-orange-600">
                  Please Login to Add Items to Cart
                  <a
                    href="/aaminshop/login"
                    className="bg-white px-4 hover:text-orange-500 text-black rounded "
                  >
                    Login
                  </a>
                </p>
              ) : (
                ""
              )
            ) : (
              <p className="h-32 w-full flex flex-col items-center px-5 text-2xl text-white rounded bg-orange-600">
                No Items Here Add Items to Cart
                <a
                  href="/aaminshop/shop"
                  className="bg-white px-4 hover:text-orange-500 text-black rounded "
                >
                  Add Items
                </a>
              </p>
            )}
            {/* {
            userId == null || userId == 0 ? (
            <p className="h-32 w-full flex items-center flex-col px-5 text-2xl text-white rounded bg-orange-600">
              Please Login to Add Items to Cart
              <a href="/" className="bg-white px-4 hover:text-orange-500 text-black rounded ">Login</a>
               </p>) : ''
          } */}
            {cartData.map((d, i) => (
              <div
                className={`  ${
                  isDarkMode ? "bg-gray-700" : "bg-white"
                } w-full h-24 py-3 rounded-md flex justify-center items-center flex-row`}
                key={i}
              >
                <div className="h-24 w-24 flex justify-center items-center mx-1 ">
                  <img
                    className="rounded-md h-20 w-24 transform hover:scale-105"
                    src={pathToPage +`/images/${d.image_path}`}
                    alt={d.image_path}
                    onClick={()=>{
                      productClicked(
                      d.product_name,
                      d.image_path,
                      d.price,
                      d.brand,
                      d.category,
                      d.productId,
                    )}} />
                </div>
                <div className="w-full h-24 flex justify-center items-start flex-col">
                  <div className="flex justify-between w-full items-center font-sans font-semibold px-2 py-1">
                    <p className="h-auto">{d.product_name}</p>
                    <p
                      className={`${
                        isDarkMode
                          ? "hover:bg-blue-500 text-slate-100"
                          : "hover:bg-blue-300 text-slate-800"
                      }  cursor-pointer active:bg-slate-100 text-xl`}
                      onClick={() => {
                        removetocart(d.p_id, d.u_id);
                      }}
                    >
                      <RxCross2 />
                    </p>
                  </div>
                  <div className="flex w-full justify-between items-center font-sans px-2 py-1 font-semibold">
                    <p className="flex justify-between items-center flex-row font-sans">
                      <span
                        className={` w-6 h-6 pb-2 mr-2 flex justify-center items-center ${
                          isDarkMode
                            ? "hover:bg-blue-400 bg-slate-500"
                            : "hover:bg-blue-300 bg-slate-200"
                        }  cursor-pointer active:bg-slate-100 font-semibold text-2xl`}
                        onClick={() => {
                          decreaseClick(d.p_id, d.u_id, d.cart);
                        }}
                      >
                        -
                      </span>
                      <span className="px-1 mr-3 font-semibold ">{d.cart}</span>
                      <span
                        className={` w-6 h-6 pb-2 mr-2 flex justify-center items-center ${
                          isDarkMode
                            ? "hover:bg-blue-400 bg-slate-500"
                            : "hover:bg-blue-300 bg-slate-200"
                        }  cursor-pointer active:bg-slate-100 font-semibold text-2xl`}
                        onClick={() => {
                          increaseClick(d.p_id, d.u_id, d.cart);
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
            <div
              className={`${
                isDarkMode ? "bg-slate-600 " : "bg-white"
              }  w-full rounded-md flex justify-center items-start flex-col py-4`}
            >
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
                  <td className="font-bold text-right px-1 flex justify-between w-full items-center flex-row ">
                    <span>$</span> <span>{subTotal}</span>{" "}
                  </td>
                  <td className="font-bold text-right px-1 flex justify-between items-center flex-row w-full">
                    <span>$</span>
                    <span>{tax}</span>
                  </td>
                  <td className="font-bold text-right px-1 flex justify-between items-center flex-row w-full">
                    <span>$</span>
                    <span>0</span>
                  </td>
                  <td className="font-bold text-right px-1 flex justify-between items-center flex-row w-full border-t-2 my-1  border-0 border-black">
                    <span>$</span> <span>{totalPrice}</span>
                  </td>
                </tbody>
              </table>
              <p className="w-full px-2 ">
                <button
                  onClick={() => {
                    setIsOrderPlaced(true);
                  }}
                  className={`w-full ${
                    isDarkMode ? "bg-white text-black" : "bg-black text-white"
                  }  rounded-md my-1 px-3 py-1 text-center `}
                >
                  Order Now
                </button>
              </p>
            </div>
          </div>
        </div>
      ) : !orderConfirm ? (
        <div
          className={`w-full  p-6 ${
            isDarkMode ? "bg-slate-900" : "bg-slate-200"
          }`}
        >
          <div>
            <ul className="flex justify-center w-full items-center flex-row h-32 bg-sky-100 gap-3">
              {cartData.map((d, i) => (
                <li className="w-36 bg-slate-500 rounded-md h-16 flex shadow-md shadow-black">
                  <img
                    src={pathToPage +`/images/${d.image_path}`}
                    alt={d.product_name}
                     onClick={()=>{
                      productClicked(
                      d.product_name,
                      d.image_path,
                      d.price,
                      d.brand,
                      d.category,
                      d.productId,
                    )}}
                    className="h-16 rounded-md w-16"
                  />
                  <div className="flex  rounded-md  flex-col">
                    <p className=" h-6 overflow-hidden">{d.product_name}</p>

                    <p className="w-6 py-1 text-white">${d.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={`w-full  p-6 ${
              isDarkMode ? "bg-sky-700" : "bg-slate-200"
            }  flex justify-center items-center flex-row flex-wrap`}
          >
            <div className="flex justify-center md:w-3/6 w-full items-center flex-col">
              <table
                className={`w-full ${isDarkMode ? "bg-sky-800" : "bg-sky-200"}`}
              >
                <thead className="border-collapse">
                  <tr>
                    <th
                      className={`font-medium p-1 border ${
                        isDarkMode
                          ? "bg-white text-black border-white"
                          : "bg-black text-white border-black"
                      }`}
                    >
                      YOUR NAME
                    </th>
                    <th
                      className={`font-medium p-1 border ${
                        isDarkMode
                          ? "bg-white text-black border-white"
                          : "bg-black text-white border-black"
                      }`}
                    >
                      PRODUCTS NAME
                    </th>
                    <th
                      className={`font-medium p-1 border ${
                        isDarkMode
                          ? "bg-white text-black border-white"
                          : "bg-black text-white border-black"
                      }`}
                    >
                      QUANTITY
                    </th>
                    <th
                      className={`font-medium p-1 border ${
                        isDarkMode
                          ? "bg-white text-black border-white"
                          : "bg-black text-white border-black"
                      }`}
                    >
                      PRICE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((d, i) => (
                    <tr key={i}>
                      <td className="p-2 text-center">{formData.name}</td>
                      <td className="p-2 text-center">{d.product_name}</td>
                      <td className="p-2 text-center">{d.cart}</td>
                      <td className="p-2 text-center">${d.price}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      className="border-t-gray-400 border-t-2 font-medium p-1 text-center"
                      colSpan={2}
                    >
                      Sub-Total
                    </td>
                    <td
                      className="border-t-gray-400 border-t-2 font-medium p-1 text-center"
                      colSpan={2}
                    >
                      ${subTotal}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="border-t-gray-400 font-medium p-1 text-center"
                      colSpan={2}
                    >
                      Tax
                    </td>
                    <td
                      className="border-t-gray-400 font-medium p-1 text-center"
                      colSpan={2}
                    >
                      ${tax}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="border-t-gray-400 border-t-2 text-lg font-semibold p-1 text-center"
                      colSpan={2}
                    >
                      Total
                    </td>
                    <td
                      className="border-t-gray-400 border-t-2 text-lg font-medium p-1 text-center"
                      colSpan={2}
                    >
                      ${totalPrice}
                    </td>
                  </tr>
                </tfoot>
              </table>

            </div>
  {/*  Fill Order Detail form */}
            <div className="flex justify-center md:w-3/6 mt-7 sm:mt-2 w-full items-center flex-col">
              <h3 className="text-2xl">Fill your details to place order</h3>
              <form
                className="w-full  flex justify-evenly items-start px-7 flex-col gap-3"
                onSubmit={handleSubmit}
              >
                <div className="flex justify-center flex-col w-full">
                  <label>Name</label>
                  <input
                    type="text"
                    className={inputClas}
                    name="name"
                    required
                    placeholder="Enter your Full Name.."
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-center flex-col w-full">
                  <label>Address</label>
                  <input
                    type="text"
                    className={inputClas}
                    name="address"
                    required
                    placeholder="Enter your address.."
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-center flex-col w-full">
                  <label>Email</label>
                  <input
                    type="email"
                    className={inputClas}
                    name="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-center flex-col w-full">
                  <label>Mobile</label>
                  <input
                    type="tel"
                    className={inputClas}
                    name="mobile"
                    required
                    placeholder="00000 00000"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex justify-center flex-col w-full">
                  <label>PinCode</label>
                  <input
                    type="text"
                    className={inputClas}
                    name="pin_code"
                    required
                    placeholder="Enter your Pincode.."
                    value={formData.pin_code}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-center flex-row gap-4 my-2">
                  <p
                    className={`w-36 flex justify-center items-center h-6 gap-1 ${
                      isDarkMode ? "bg-orange-200 " : "bg-orange-300 "
                    } rounded`}
                  >
                    <label htmlFor="cash">Cash on Delivery</label>
                    <input
                      type="radio"
                      id="cash"
                      required
                      name="order_type"
                      className="cursor-pointer"
                      placeholder="Enter your Full Name.."
                      value={"cash_on_delivery"}
                      onChange={handleChange}
                    />
                  </p>
                  <p
                    className={`w-36 flex justify-center items-center h-6 gap-1 ${
                      isDarkMode ? "bg-orange-200 " : "bg-orange-300 "
                    } rounded`}
                  >
                    <label htmlFor="cash">Online</label>
                    <input
                      type="radio"
                      id="online"
                      required
                      name="order_type"
                      className="cursor-pointer"
                      placeholder="Enter your Full Name.."
                      value={"online"}
                      onChange={handleChange}
                    />
                  </p>
                </div>
                <button
                  type="submit"
                  className="bg-sky-400 px-3 rounded-sm py-1 w-full my-2"
                >
                  Place Order
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        
        <div className="w-full h-auto flex justify-center items-center flex-col  gap-3 sm:gap-3">
        {/*   Order Confirmation message */}
          <div
            className={`w-3/4 h-auto flex justify-center items-center flex-col`}
          >
            <p
              className={`text-9xl font-thin ${
                isDarkMode ? " text-gray-400" : " text-gray-600"
              }`}
            >
              <IoCheckmarkCircleOutline />
            </p>
            <p className="text-2xl font-semibold text-center">
              Thank you for placing your order with our store!
            </p>
            <p className="text-lg">
              This is confirmation message of your recent order. Your <b>Order Id </b> is <b>{orderId}</b>
            </p>
          </div>
          <div className={`w-full p-6 `}>
            <table
              className={`w-full ${isDarkMode ? "bg-sky-800" : "bg-sky-200"}`}
            >
              <thead className="border-collapse">
                <tr>
                  <th
                    className={`font-medium p-1 border border-collapse ${
                      isDarkMode
                        ? "bg-white text-black  border-white"
                        : "bg-black text-white  border-black"
                    }`}
                  >
                    Name
                  </th>
                  <th
                    className={`font-medium p-1 border border-collapse ${
                      isDarkMode
                        ? "bg-white text-black  border-white"
                        : "bg-black text-white  border-black "
                    }`}
                  >
                    Mobile
                  </th>
                  <th
                    className={`font-medium p-1 border border-collapse ${
                      isDarkMode
                        ? "bg-white text-black  border-white"
                        : "bg-black text-white  border-black "
                    }`}
                  >
                    Address
                  </th>
                  <th
                    className={`font-medium p-1 border border-collapse ${
                      isDarkMode
                        ? "bg-white text-black  border-white"
                        : "bg-black text-white  border-black "
                    }`}
                  >
                    Products
                  </th>
                  <th
                    className={`font-medium p-1 border border-collapse ${
                      isDarkMode
                        ? "bg-white text-black  border-white"
                        : "bg-black text-white  border-black "
                    }`}
                  >
                    Quantity
                  </th>
                  <th
                    className={`font-medium p-1 border border-collapse ${
                      isDarkMode
                        ? "bg-white text-black border-white"
                        : "bg-black text-white border-black "
                    }`}
                  >
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={`p-2 text-center`}>{formData.name}</td>
                  <td className={`p-2 text-center border-l-2 border-black`}>{formData.mobile}</td>
                  <td className={`p-2 text-center border-l-2 border-black`}>{formData.address}</td>

                  <td className="text-center  border-l-2 border-black">
                    <div className="flex flex-col items-start">
                      {cartData.map((d, i) => (
                        <span key={i}>{d.product_name}</span>
                      ))}
                    </div>
                  </td>
                  <td className="text-center  border-l-2 border-black">
                    <div className="flex flex-col items-start">
                      {cartData.map((d, i) => (
                        <span key={i}>{d.cart}</span>
                      ))}
                    </div>
                  </td>
                  <td className="text-center  border-l-2 border-black">
                    <div className="flex flex-col items-start">
                      {cartData.map((d, i) => (
                        <span key={i}>${d.price}</span>
                      ))}
                    </div>
                  </td>
                  
                </tr>
              </tbody>
              <tfoot>
                <tr className="w-full">
                  <td colSpan={3}
                    className={`border-t-gray-400  border-t-2  border-0 font-medium p-1 text-center `}
                  >
                    Sub-Total
                  </td>
                  <td colSpan={3}
                    className={`border-t-gray-400  border-t-2 border-0 font-medium p-1 text-center `}
                  >
                    ${subTotal}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}
                    className={`border-t-gray-400   border-0 font-medium p-1 text-center `}
                  >
                    Tax
                  </td>
                  <td colSpan={3}
                    className={`border-t-gray-400   border-0 font-medium p-1 text-center `}
                  >
                    ${tax}
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}
                    className={`border-t-gray-400  border-t-2 text-lg border-0 font-semibold p-1 text-center `}
                  >
                    Total
                  </td>
                  <td colSpan={3}
                    className={`border-t-gray-400  border-t-2 text-lg border-0 font-medium p-1 text-center `}
                  >
                    ${totalPrice}
                  </td>
                </tr>
              </tfoot>
            </table>

            <button onClick={()=>{
              setIsOrderPlaced(false);
              setOrderConfirm(false);
            }} className="px-5 bg-yellow-500 rounded my-3">Go Back to Cart</button>
          </div>
        </div>
      )}
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
