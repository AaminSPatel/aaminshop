import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import useTools from "./ShoppingCard/tools";
const ShoppingAppContext = createContext({});

const ShoppingAppProvider = ({ children }) => {
  const [allShoppingItemsData, setAllShoppingItemsData] = useState([]);
  const [productDataToShow, setProductDataToShow] = useState([]);
  const [productDataTo, setProductDataTo] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRender, setSearchRender] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch shopping data on component mount
  //const {navigate} = useTools()
  const [isDarkMode, setIsDarkMode] = useState(false);
 
  const toggleTheme = () => {
          setIsDarkMode(!isDarkMode);
  };


  useEffect(() => {
    fetch('http://localhost:8081/userdata')
        .then(res => res.json()) // Convert the response to JSON
        .then(data => {
          if(data.length > 0){
                      setUserId(data[0].user_id);

          }
          else{
            
          }
              //    console.log(userId,data[0].user_id);

        }) // Log the data to the console
        .catch(err => console.error('Error fetching data:', err)); // Handle any errors
        
}, [userId]);

  function handleSubmitLogin(event) {
    event.preventDefault();

    axios.post("http://localhost:8081/login", { email, password })
      .then((res) => {
        if (res.data && res.data.message === 'Login Successful') {
          setIsLogin(true);
          setUserId(res.data.user.Id);
          console.log('Login successful, userId = ', res.data.user);
        } else {
          setIsLogin(false);
          setUserId(null);
          console.log('Login failed: ', res.data.message || 'No data returned.');
          // Display an appropriate error message to the user
        }
      })
      .catch((err) => {
        console.log('Error occurred during login:', err);
        // Handle error, such as showing an error message to the user
      });
}
 // Debounced search function
  useEffect(() => {
    const handler = setTimeout(() => {
      searchItems(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  function searchItems(query) {
    if (!query) {
      setProductDataTo(allShoppingItemsData);
      setSearchRender(s=> s +1)
    // setProductDataToShow(allShoppingItemsData)
  
      // Reset to all items if query is empty
      return;
    }
    
    const newArray = allShoppingItemsData.filter((arr) => {
      return (
        arr.brand.toLowerCase().includes(query.toLowerCase()) ||
        arr.category.toLowerCase().includes(query.toLowerCase()) ||
        arr.product_name.toLowerCase().includes(query.toLowerCase()) ||
        arr.price.toString().includes(query)
      );
    });
    setProductDataTo(newArray);
   console.log(query,productDataTo);
        searchItems,
        setSearchRender(s => s + 1)
        //setProductDataToShow(newArray)
  }

  function handleChangeSearch(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <ShoppingAppContext.Provider
      value={{
        allShoppingItemsData,
        setAllShoppingItemsData,
        productDataToShow,setPassword,
        setProductDataToShow,setEmail,
        handleChangeSearch,handleSubmitLogin,loading, setLoading,
        searchItems,searchRender,isLogin,setIsLogin,setSearchQuery,
        userId,productDataTo,setProductDataTo,setSearchRender,searchRender,
        isDarkMode,toggleTheme,setUserId
      }}
    >
      {children}
    </ShoppingAppContext.Provider>
  );
};

export { ShoppingAppProvider };
export default ShoppingAppContext;
