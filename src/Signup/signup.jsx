import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import useTools from "../ShoppingCard/tools.jsx";
export default function Signup (props) {
  /* const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [username, setUsername] = useState("");*/
  const navigate = useNavigate(); 
  const {handleSubmitSignup, setSignupPassword, setSignupEmail, setUsername,signupEmailCheck}  = useTools();
 
  return (
      
    <div className="w-full h-screen   py-4 p-2 ">
      <div className=" py-5 mt-5  flex justify-center items-center flex-col">
      
         <form
                className="bg-gray-800 w-64 p-5 m-auto rounded-md flex justify-center items-start flex-col gap-4"
                onSubmit={handleSubmitSignup}
              >
                <p className="flex justify-center items-start flex-col w-full gap-1">
                  <label htmlFor="" className="text-xl text-white">
                    Username 
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter username"
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    className="py-1 shadow-xl shadow-slate-800 px-2 border-b-2 border-b-gray-500 w-56"
                  />
                </p>
                <p className="flex justify-center items-start flex-col w-full gap-1">
                  <label htmlFor="" className="text-xl text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="example@gmail.com"
                    required
                    onChange={(e) => {
                      setSignupEmail(e.target.value);
                    }}
                    className="py-1 shadow-xl shadow-slate-800 px-2 border-b-2 border-b-gray-500 w-56"
                  />
                </p>
                <p className="flex justify-center items-start flex-col w-full gap-1">
                  <label htmlFor="" className="text-xl text-white">
                    Password
                  </label>
                  <input
                  required
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setSignupPassword(e.target.value);
                    }}
                    className="py-1 shadow-xl shadow-slate-800 px-2 border-b-2 border-b-gray-500 w-56"
                  />
                </p>
                <p className="flex  justify-center items-start flex-col w-full gap-1">
                  <button type="submit" className="bg-slate-100 font-medium py-1 px-3 rounded-sm">
                    Sign Up
                  </button>
                </p>
              </form>
              <div className=" h-auto text-white gap-4 rounded-md py-2 w-96 flex justify-center items-center flex-col">
               {signupEmailCheck ? '' :  <p className="bg-white px-3 py-1 rounded-md text-red-500">Email already in use. Please enter a unique email address.</p>}
        <p>Already have an account</p>
          <button
            className="bg-slate-800 px-3 py-1 rounded-md shadow-md shadow-slate-700 active:bg-yellow-400"
            onClick={() => {
              navigate('/aaminshop/login');
            }}
          >
            Login
          </button>
        </div>
             
      </div>
    </div>
  )
};