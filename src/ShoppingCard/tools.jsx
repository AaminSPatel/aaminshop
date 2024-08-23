import axios from "axios";
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import ShoppingAppContext from "../ShoppingAppContext";

export default function useTools (props) {

  const [addedCart, setAddedCart] = useState(false);
  const [productOpen,setProductOpen] = useState(false);
  const [productIdToOpen,setProductIdToOpen] = useState([]);
  const [isCartAdded, setIsCartAdded] = useState(false);
  const [isFavAdded, setIsFavAdded] = useState(false);
  const [arrayOfCartitems, setArrayOfCartitems] = useState([]);
  const [arrayOfFavitems, setArrayOfFavitems] = useState([]);
  const [product, setProduct] = useState({});
  const [favItems,setFavItems] = useState([]);
  const [IsDataPresent,setIsDataPresent] = useState();
 // const [email, setEmail] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  //  const [password, setPassword] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [username, setUsername] = useState("");
    const [allShoppingItemsData, setAllShoppingItemsData] = useState([]);
    const [productDataToShow, setProductDataToShow] = useState([]);
    const [cartData, setCartData] = useState([]);
    const [itemNum, setItemNum] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [tax, setTax] = useState(0);
    const [subTotal,setSubTotal] = useState(0);
    const [isLogin,setIsLogin] = useState(true);
    const [signupEmailCheck,setSignupEmailCheck] = useState(true);
   // const [userId,setUserId] = useState(null);
    const [rendr,setRendr] = useState(0)
  const navigate = useNavigate();
  const { pathToPage} = useContext(ShoppingAppContext)
/*   
  useEffect(() => {
    fetch("http://localhost:8081/shopping")
      .then((res) => res.json())
      .then((data) => {
        setAllShoppingItemsData(data), setProductDataToShow(data);
      })
      .catch((err) => console.log(err));

    console.log('ye run hua he mc');
  },[]);
  */
function handleSubmitSignup(event) {

  event.preventDefault();

  
    axios.post(pathToPage +"/signup/checkdata", { signupEmail})
    .then((data) => {
      // console.log('Data = ',data,'data.data = ',data.data);
       if(data.data){
           //console.log('Use another Email');
           setSignupEmailCheck(false);
       }
       else{
           axios.post(pathToPage +"/signup", { signupEmail, signupPassword ,username})
           .then((res) => {
             navigate('/')
             })
           .catch((err) => console.log(err)); 
           setSignupEmailCheck(true);
       }
              //navigate('/')
      })
    .catch((err) => console.log(err));
/*       */
}
/*  function handleSubmitLogin(event) {
   event.preventDefault();
     axios.post("http://localhost:8081/login", { email, password })
     .then((data) =>{
      if(data.data){
        navigate('/home');
        setIsLogin(true);
        console.log('login successfull , userId = ',data.data[0].userId);
        setUserId(data.data[0].userId)
      }
      else{
       // console.log('login failed , data = ',data.data);
        setIsLogin(false);
        setUserId(null)
      }
     })
     .catch((err) => console.log(err));
 }
 */
 function increaseClick(item_name, cart) {
   //let currentItemNum = cart;
   let increaseItemNum = cart + 1;
   if (10 > cart) {
     axios
       .put(pathToPage +`/shopping_cart/increase`, {
         item_name,
         increaseItemNum,
       })
       // .then((res)=>console.log(res))
       .catch((err) => console.log(err));
       setRendr(rendr+1)
   }
 }
 function decreaseClick(item_name, cart) {
   if (cart > 0)
     axios
       .put(pathToPage +`/shopping_cart/decrease/${item_name}`)
       //.then((res)=>console.log(res))
       .catch((err) => console.log(err));
       setRendr(rendr+1)
 }


 
      function addtocart(pid, uid) {
       axios.post(pathToPage +"/shopping_cart/addItem", {pid,uid })
       .then(res=>{console.log(res.data.message)})
       .catch(err=>console.log(err)
       )
       setRendr(rendr+1)
       if(uid == null || uid == 0){
        alert('Please Login to add item to Cart UserId =',uid)
       }
     }

     function removetocart(pid, uid) {
      axios.delete(pathToPage +`/shopping_cart/delete`, {
          params: {
              pid: pid,
              uid: uid
          }
      })
      .then(res => {
          console.log(res.data.message);
          // You may want to update state here, e.g., setIsCartAdded(false);
      })
      .catch(err => {
          console.log(err);
      });
  
  
      setRendr(rendr + 1); // Ensure setRendr is defined in your component
  }
  
  function toGetCartAndFavState(userId,product_id){
    axios.get(pathToPage +`/shopping_fav/checkFav`, {
      params: {
          uId: userId,
          product_id: product_id
      }
  })
  .then(response => {
      // Check if response data is true or false
      if (response.data) {
        setIsFavAdded(true)
      } else {
         // console.log('Item is not in favorites.');
          setIsFavAdded(false)
      }
  })
  .catch(err => console.log(err));

axios.get(pathToPage +`/shopping_cart/checkCart`, {
      params: {
          uId: userId,
          product_id: product_id
      }
  })
  .then(response => {
      // Check if response data is true or false
      if (response.data) {
        setIsCartAdded(true)
      } else {
         // console.log('Item is not in favorites.');
          setIsCartAdded(false)
      }
  })
  .catch(err => console.log(err));

  }
    
   
     function addtofav(pid,uid) {
       
         axios
           .post(pathToPage +"/shopping_fav/addItem", {
             pid,uid
           })
           .then(res=>{console.log(res.data.message)})
           .catch((err) => console.log(err));
         //setIsFavAdded(true);
       if(uid == null || uid == 0){
        alert('Please Login to add item to fav')
       }
       setRendr(rendr+1)
     }
     function removetofav(pid, uid) {
      axios.delete(pathToPage +'/shopping_fav/delete', {
          headers: {
              'Content-Type': 'application/json'
          },
          data: {
              pid: pid,
              uid: uid
          }
      })
      .then((res) => {
          console.log(res.data.message); // Logs the success message
          setRendr(rendr + 1); // Update state or UI as needed
      })
      .catch((err) => {
          console.error(err);
      });
  }
  
     async function productClicked(nam, img, pric, brand, category,product_id) {
       try {
         const response = await axios.post(pathToPage +'/product_page', {
           nam,
           img, 
           pric,
           brand,
           category,
           product_id,
         });
         //console.log(response.data.message);
         navigate('/aaminshop/product');
         
       } catch (error) {
         console.error(error);
       }
       setRendr(rendr+1)
     }
     function productCrossClicked(p_id) {
        
         axios.delete(
           pathToPage +`/product_page/delete/${p_id}`
         )
         .then(res =>{console.log(res.data.message);
           //window.history.go(-1);
           //navigate('/aaminshop/shop')
           window.history.back();
           setRendr(rendr+1)
         })
         .catch(err=>console.log(err)
         ) 
     }
   /*   function searchItems(query) {
       let newArray;
         newArray = allShoppingItemsData.filter((arr) => {
           if(arr.brand.toLowerCase().indexOf(query.toLowerCase()) !== -1){return true}
           else if(arr.category.toLowerCase().indexOf(query.toLowerCase()) !== -1){return true}
           else if(arr.product_name.toLowerCase().indexOf(query.toLowerCase()) !== -1){return true}
           else if(arr.price.toString().indexOf(query) !== -1){return true}
           else{    
            console.log('no data found');
                  
           }
         })
         setProductDataToShow(newArray);
         setRendr(rendr+1)
         console.log(query,productDataToShow);
         
     }
   
     function handleChangeSearch(e){
   
       
         searchItems(e.target.value)
      
       setRendr(rendr+1)
      // console.log(e.target.value);
       
     }
    */
      
  return {
    addedCart, setAddedCart,productOpen,setProductOpen,
    productIdToOpen,setProductIdToOpen,
    navigate,isCartAdded, setIsCartAdded,
    isFavAdded, setIsFavAdded,arrayOfCartitems, setArrayOfCartitems,arrayOfFavitems, setArrayOfFavitems,
    product, setProduct,favItems,setFavItems,IsDataPresent,setIsDataPresent,
    allShoppingItemsData, setAllShoppingItemsData,
    productDataToShow, setProductDataToShow,cartData, setCartData,itemNum, setItemNum,
    totalPrice, setTotalPrice,tax, setTax,subTotal,setSubTotal,
    signupEmailCheck,
    signupPassword, setSignupPassword,signupEmail, setSignupEmail,username, setUsername,
    productClicked,
    handleSubmitSignup,
    productCrossClicked, 
    toGetCartAndFavState,
    addtofav,
    removetocart,
    addtocart,
    decreaseClick,
    increaseClick,
    
    rendr,removetofav,setRendr
 } 
}