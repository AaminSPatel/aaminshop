import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useTools from "../ShoppingCard/tools.jsx";
import ShoppingAppContext from "../ShoppingAppContext.jsx";
//import { ShoppingAppContext } from "../ShoppingAppContext.jsx";
export default function Login(props) {
  //const [email, setEmail] = useState("");
 //
 // const [username, setUsername] = useState("");
 const { navigate} = useTools();
 const { isLogin,handleSubmitLogin,setIsLogin,userId,setEmail,setPassword} = useContext(ShoppingAppContext)

 useEffect(()=>{
  setIsLogin(null);
 },[])

 
 if(isLogin){
  navigate('/home');
  console.log(isLogin,userId);
 }
 else{
  console.log('try',isLogin,userId);
  
 }
 
  return (


    <div className="w-full h-screen  mt-7">
      <div className="  py-5 h-3/4 flex justify-center items-center flex-col">

                 <form
                 className="bg-gray-800 w-64 p-5 m-auto rounded-md flex justify-center items-start flex-col gap-4"
                 onSubmit={handleSubmitLogin}
               >
                 <p className="flex justify-center items-start flex-col w-full gap-1">
                   <label htmlFor="" className="text-xl text-white">
                     Email
                   </label>
                   <input
                     type="email"
                     placeholder="example@gmail.com"
                     onChange={(e) => {
                       setEmail(e.target.value);
                     }}
                     className="py-1 shadow-lg shadow-slate-700 px-2 border-b-2 border-b-gray-500 w-56"
                   />
                 </p>
                 <p className="flex justify-center items-start flex-col w-full gap-1">
                   <label htmlFor="" className="text-xl text-white">
                     Password
                   </label>
                   <input
                     type="password"
                     placeholder="Password"
                     onChange={(e) => {
                       setPassword(e.target.value);
                     }}
                     className="py-1 shadow-lg shadow-slate-700 px-2 border-b-2 border-b-gray-500 w-56"
                   />
                 </p>
                 <p className="flex justify-center items-start flex-col w-full gap-1">
                   <button type="submit" className="bg-slate-100 font-medium py-1 px-3 rounded-sm">
                     Login
                   </button>
                 </p>
               </form>
               <div className=" h-auto  px-4 rounded-sm py-2 w-auto flex justify-center items-center flex-col">
                {isLogin ?' ' : ( <p className="bg-white px-3 py-1 rounded-md text-red-500">Login failed. Please check your email and password. Try again...</p>)}
        <p className="text-white py-1">Don't have Account, Create account</p>
          <button
            className="bg-slate-800 text-white px-3 py-1 rounded-md shadow-md shadow-slate-700 active:bg-yellow-400"
            onClick={() => {
              navigate('/signup');
            }}
          >
            Sign Up 
          </button>
          {
            userId ? (
              <div className="h-16 mt-4 shadow-md shadow-orange-300 bg-slate-500 flex items-center text-lg text-white rounded">
                <p>You Already logged In Go to Profile
                  <a href="/profile" className="px-3 py-1 m-1 bg-orange-400 rounded">Profile</a>
                </p>
              </div>
            ):'aamin'
          }
        </div>
      </div>
    </div>
  );
}
