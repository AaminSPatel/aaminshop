import React, { useContext, useEffect, useState } from "react";
import ShoppingAppContext from "../ShoppingAppContext";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import axios from "axios";
import useTools from "../ShoppingCard/tools";

export default function Order(props) {
  const { isDarkMode ,pathToPage, userId, openOrderDetailId, setOpenOrderDetailId } =
    useContext(ShoppingAppContext);
  const [order, setOrder] = useState({});
  const [totalPrice, setTotalPrice] = useState();
  const [shopItems, setShopItems] = useState([]);
  const [orderId, setOrderId] = useState();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const {productClicked} = useTools();
  /* 
    useEffect(() => {
        axios.get(`http://localhost:8081/shopping`)
          //.then((res) => {console.log(res)})
          .then((data) => {
            //setOrder(data.data)
            console.log(data);
            //setShopItems(data.filter((item) => item.p_id))
          })
          .catch((err) => console.log(err));
          //console.log(cartData); 
    },[userId]);
 */
  useEffect(() => {
    setOrderId(openOrderDetailId);
    window.scrollTo(0, 0);

  }, [openOrderDetailId]);
  //let orderIdLocal = 6;

  useEffect(() => {
    fetch(pathToPage +`/order/det/${openOrderDetailId}`)
      .then((res) => res.json())
      .then((data) => {
        setOrder(data[0]);
        // console.log(data,openOrderDetailId);
      })
      .catch((err) => console.log(err));
  }, [userId, openOrderDetailId]);

  useEffect(() => {
    fetch(pathToPage +`order_items/detail/${openOrderDetailId}`)
      .then((res) => res.json())
      .then((data) => {
        setShopItems(data);
        //console.log(data);
      })
      .catch((err) => console.log(err));
  }, [userId, openOrderDetailId]);

  const dateObj = new Date(order.date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
  const day = String(dateObj.getDate()).padStart(2, "0");
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  // Format the date and time as needed
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}`;

  //console.log(`Date: ${formattedDate}, Time: ${formattedTime}`);
  // Output: Date: 2024-08-13, Time: 18:30

  const cls = {
    th: `font-medium p-1 border border-collapse ${
      isDarkMode
        ? "bg-white text-black  border-white"
        : "bg-black text-white  border-black"
    }`,
    ftd: `border-t-gray-400  border-t-2  border-0 font-medium p-1 text-center `,
  };
  return (
    <div
      className={`w-full p-2 py-6 ${
        isDarkMode ? "bg-slate-900 text-white" : "bg-slate-100 text-black"
      }`}
    >
     
        <div className="w-full mt-4 h-auto flex justify-center items-center flex-col sm:flex-row md:flex-row lg:flex-row gap-3 sm:gap-3">
          <div
            className={`w-3/4 h-auto  flex justify-center items-center flex-col`}
          >
            <div
              className={`my-3 w-full gap-3 flex justify-center  items-center flex-row flex-wrap`}
            >
              {shopItems.map((item, i) => (
                <div className={`w-36 h-44 shadow-md rounded-md shadow-black bg-sky-200 hover:scale-105 transition-all`}>
                  <div className="w-full h-28 overflow-hidden rounded-md">
                    <img className="" onClick={()=>{productClicked(item.product_name,item.image_path,item.price,item.brand,item.category,item.productId)}} src={`http://localhost:8081/images/${item.image_path}`} alt="" />
                  </div>
                  <div className="w-full  overflow-hidden">
                    <p className="">{item.product_name}</p>
                    {item.productId}
                    <p className="flex justify-between px-1">
                      <span className="">${item.price}</span>
                      <span className="">{item.item_quantity} items</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-2xl mt-4 font-semibold text-center text-gray-600">
              Thank you for placing your order with our store!
            </p>
            <p className="text-lg bg-slate-200 p-6 rounded-md">
              This order was placed by <strong>{order.full_name}</strong> on{" "}
              <strong>{formattedDate}</strong> at{" "}
              <strong>{formattedTime}</strong> from 
              <strong>
                {' '} {order.address}, {order.pin_code}{" "}
              </strong>
              . <br /> The order status is{" "}
              <strong>{order.order_status}.</strong>
              Order type was <strong>{order.order_type} </strong> .
            </p>
          </div>
          <div className={`w-full p-6 `}>
            <table
              className={`w-full ${isDarkMode ? "bg-sky-800" : "bg-sky-200"}`}
            >
              <thead className="border-collapse">
                <tr>
                  <th className={cls.th}>Order Id</th>
                  <th className={cls.th}>Products</th>
                  <th className={cls.th}>Brands</th>
                  <th className={cls.th}>Price</th>
                  <th className={cls.th}>Items</th>
                  <th className={cls.th}>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {
                  <tr>
                    <td className={` text-center`}>{order.orderId} </td>
                    <td className={`p-2 text-center`}>
                      {shopItems.map((item) => (
                        <div className="flex flex-col w-full h-8 overflow-hidden">
                          <span className="p-1">{item.product_name}</span>
                        </div>
                      ))}
                    </td>
                    <td className={`p-2 text-center`}>
                      {shopItems.map((item) => (
                        <div className="flex flex-col w-full h-8 overflow-hidden">
                          <span className="p-1">{item.brand}</span>
                        </div>
                      ))}
                    </td>

                    <td className={` text-center`}>
                      {shopItems.map((item) => (
                        <div className=" flex flex-col h-full  w-full">
                          <span className=" p-1 ">${item.price}</span>
                        </div>
                      ))}
                    </td>

                    <td className={`p-2 py-2 text-center`}>
                      {shopItems.map((item) => (
                        <div className=" flex flex-col h-full  w-full">
                          <span className=" p-1 ">{item.item_quantity}</span>
                        </div>
                      ))}
                    </td>
                    <td className={`p-2 py-2 text-center`}>
                      {shopItems.map((item) => (
                        <div className=" flex flex-col h-full  w-full">
                          <span className=" p-1 ">
                            ${item.item_quantity * item.price}
                          </span>
                        </div>
                      ))}
                    </td>
                  </tr>
                }
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan={3}
                    className={`border-t-gray-400   border-t-2 font-medium p-1 text-center `}
                  >
                    Tax
                  </td>
                  <td
                    colSpan={3}
                    className={`border-t-gray-400   border-t-2 font-medium p-1 text-center `}
                  >
                    ${order.tax}
                  </td>
                </tr>
                <tr>
                  <td
                    colSpan={3}
                    className={`border-t-gray-400  border-t-2 text-lg border-0 font-semibold p-1 text-center `}
                  >
                    Total
                  </td>
                  <td
                    colSpan={3}
                    className={`border-t-gray-400  border-t-2 text-lg border-0 font-medium p-1 text-center `}
                  >
                    ${order.amount}
                  </td>
                </tr>
              </tfoot>
            </table>

            <button></button>
          </div>
        </div>
    </div>
  );
}
