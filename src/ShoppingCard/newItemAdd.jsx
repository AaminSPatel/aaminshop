import React, { useContext, useState } from "react";
import ShoppingAppContext from "../ShoppingAppContext";
import axios from "axios";
export default function AddItem(props) {
  const [formData, setFormData] = useState({
    name: "",
    price:null,
    brand: "",
    category: "",
    image: "",
  });

  const handleSubmitNewItem = (event) => {
    event.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
        form.append('price', formData.price);
        form.append('brand', formData.brand);
        form.append('category', formData.category);
        form.append('image', formData.image);

    axios.post(pathToPage +'/shopping/addNewItem',form)
    .then(res=>{
        console.log(res.data);
        //setFormData({...formData,image:res.data.data})
    })
    .catch(err=>{console.log(err);
    })
}

  const { isDarkMode  ,pathToPage} = useContext(ShoppingAppContext);
  const inpDiv = `flex w-full gap-1 justify-center items-start flex-col`;
  const inputCls = `w-full  flex justify-center items-start flex-col p-1 rounded`;
  const inputLableCls = `font-semibold`;
  return (
    <div
      className={`${
        isDarkMode ? "bg-teal-800 text-white" : "bg-teal-300 text-black"
      }   h-auto w-full py-8`}
    >
      <div className={`flex justify-center items-center flex-row flex-wrap`}>
        <div className="w-full h-auto flex justify-center items-center ">
          <div
            className={`w-96 h-[300px] flex justify-center rounded-xl items-center m-7 gap-3 md:w-3/6 shadow-md shadow-black ${
              isDarkMode ? "bg-slate-600 text-white" : "bg-white text-black"
            }`}
          >
            <div className={`w-48 h-48 hover:scale-105 rounded-md overflow-hidden`}>
              <img
                src={pathToPage +`/images/${formData.image}` || "./assets/w4.webp"}
                alt={formData.image}
              />
            </div>
            <div className={``}>
              <p className="text-lg">{formData.name}</p>
              <p className="text-lg">{formData.brand}</p>
              <p className="text-lg">{formData.category}</p>
              <p className="text-lg font-semibold">${formData.price}</p>
            </div>
          </div>
        </div>

        <div
          className={`w-full h-[400px] flex justify-center items-center md:w-3/6`}
        >
          <form
            action=""
            onSubmit={handleSubmitNewItem}
            className={`w-3/4 flex justify-center items-start flex-col gap-3`}
          >
            <div className={inpDiv}>
              <label htmlFor="" className={inputLableCls}>
                {" "}
                Item Name
              </label>
              <input
                type="text"
                value={formData.name}
                placeholder="Enter item Name.."
                className={inputCls}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            </div>
            <div className={inpDiv}>
              <label htmlFor="" className={inputLableCls}>
                {" "}
                Item Brand
              </label>
              <input
                type="text"
                value={formData.brand}
                placeholder="Enter item Brand.."
                className={inputCls}
                onChange={(e) => {
                  setFormData({ ...formData, brand: e.target.value });
                }}
              />
            </div>
            <div className={inpDiv}>
              <label htmlFor="" className={inputLableCls}>
                {" "}
                Item Category
              </label>
              <input
                type="text"
                value={formData.category}
                placeholder="Enter item Category.."
                className={inputCls}
                onChange={(e) => {
                  setFormData({ ...formData, category: e.target.value });
                }}
              />
            </div>
            <div className={inpDiv}>
              <label htmlFor="" className={inputLableCls}>
                {" "}
                Item Price
              </label>
              <input
                type="number"
                value={formData.price}
                placeholder="Enter item Price.."
                className={inputCls}
                onChange={(e) => {
                  setFormData({ ...formData, price: e.target.value });
                }}
              />
            </div>
            <div className={inpDiv}>
              <label htmlFor="" className={inputLableCls}>
                {" "}
                Item Image
              </label>
              <input
                type="file"
                
                placeholder="Select item Image"
                className={inputCls}
                onChange={(e) => {
                  setFormData({ ...formData, image: e.target.files[0] });
                }}
              />
            </div>
            <button
              type="submit"
              className="bg-green-400 px-4 py-1 rounded-md hover:bg-green-200"
            >
              Add Item
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
