import axios from "axios";
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Cars from "../ShoppingCard/shoppingHome";

export default function Home (props) {
    const [dat, setDat] = useState([]);
    const [name,setName] = useState('')
    const [clas,setClas] = useState('')
    const [rollNumber,setRollNumber] = useState()
    const [gender,setGender] = useState('')
  
  
    useEffect(() => {
      fetch("http://localhost:8081/students")
        .then((res) => res.json())
        .then((data) => setDat(data))
        .catch((err) => console.log(err));
    });

      function submitCLick(event){
            event.preventDefault();
            setClas('');
            setGender('');
            setName('');
            setRollNumber('');

            axios.post('http://localhost:8081/students/addRow',{name,clas,rollNumber,gender})
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            //console.log(name,clas,rollNumber,gender);
          }
  function deleteRow(na){
    let nam = na;
    axios.delete(`http://localhost:8081/students/delete/${nam}`)
    .then(res=>console.log(res))
     .catch(err=>console.log(err))
  }

   let tdclass = 'w-32 text-center  border-black border-b-2 border-r-2';
    const navigate = useNavigate()
  return (
    <div>
      <div className="h-auto py-2">
      <div className="fixed top-2 left-3 h-10  rounded-md  w-24 flex justify-center items-center flex-col">
          <button
            className="bg-yellow-300 px-3 py-1 rounded-md shadow-md shadow-slate-700 active:bg-yellow-400"
            onClick={() => {
              
              navigate('/signup');
            }}
          >
            Sign Up
          </button>
        </div>
        <div className="fixed top-2 left-24 h-10  rounded-md  w-24 flex justify-center items-center flex-col">
          <button
            className="bg-orange-400 px-3 py-1 rounded-md shadow-md shadow-slate-700 active:bg-yellow-400"
            onClick={() => {
              
              navigate('/shop');
            }}
          >
            Shop
          </button>
        </div>
        
<table className="p-3 m-5 bg-white border-black border-2 ">
  <thead className="bg-gray-300 max-w-lg" >
    <th className={tdclass}>Id</th>
    <th className={tdclass}>Name</th>
    <th className={tdclass}>Class</th>
    <th className={tdclass}>Roll No.</th>
    <th className={tdclass}>Gender</th>
    <th className={tdclass}>Edit</th>
  </thead>
  {/* <tbody>
    {dat.map((d, i) => (
      <tr key={i}>
        <td className={tdclass}>{d.id}</td>
        <td className={tdclass}>{d.name}</td> 
        <td className={tdclass}>{d.class}</td>
        <td className={tdclass}>{d.roll}</td>
        <td className={tdclass}>{d.gender}</td>
        <td className={tdclass}>
          <button className="bg-red-400 rounded px-3 m-1 active:bg-red-600"
            onClick={() => {
              deleteRow(d.name);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody> */}
</table>

</div>
<div className="w-full flex justify-center items-center py-5">
  <form className="bg-white shadow-xl shadow-slate-600 rounded-xl p-4" onSubmit={submitCLick}>
    <div className="m-2 ">
      <p >Name : </p>
      <input type="text" value={name} name="" id="1" onChange={e =>{setName(e.target.value)}} className="px-1 rounded-sm border-slate-600 shadow-xl shadow-slate-400 bg-slate-100 border-b-2"/>
    </div>
    <div className="m-2 ">
      <p >Class : </p>
      <input type="text" value={clas} name="" id="2" onChange={e =>{setClas(e.target.value)}}  className="px-1 rounded-sm border-slate-600 shadow-xl  shadow-slate-400 bg-slate-100 border-b-2"/>
    </div>
    <div className="m-2 ">
      <p >Roll No. : </p>
      <input type="text" value={rollNumber} name="" id="3" onChange={e =>{setRollNumber(e.target.value)}}  className="px-1 rounded-sm shadow-xl  shadow-slate-400 border-slate-600 bg-slate-100 border-b-2"/>
    </div>
    <div className="m-2 ">
      <p >Gender : </p>
      <input type="text" value={gender} name="" id="gend" onChange={e =>{setGender(e.target.value)}}  className="px-1 shadow-xl  shadow-slate-400 rounded-sm border-slate-600 bg-slate-100 border-b-2"/>
    </div>
    <button className="bg-yellow-200 px-3 py-1 rounded m-2 shadow-xl  shadow-slate-400 active:bg-yellow-400" onClick={e =>{submitCLick(e)}}>Submit</button>
  </form>
</div>
    </div>
  )
};