import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa6';
import ShoppingAppContext from '../ShoppingAppContext';
import { useNavigate } from 'react-router-dom';
import useTools from '../ShoppingCard/tools';

const UserProfileDashboard = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData,setProfileData] = useState([]);
  const [profileImage,setProfileImage] = useState([]);
  const [favItems,setFavItems] = useState([]);
  
  const navigate = useNavigate()
  const Guest = [{
    name: 'Guest',
    email:  'No data',
    phone:  0,
    address:'Somewhere',
    bio:  'You are nobody',
    profilePicture: 'guest.avif', 
    username :  'Guest',
    dob : null,
  }]
  const [profile, setProfile] = useState({
    name: profileData.full_name,
    email:  profileData.email,
    phone:  profileData.mobile,
    address:  profileData.address,
    bio:  profileData.bio,
    profilePicture: profileData.profile_pic,
    username :  profileData.user_name,
    dob : profileData.dob,
    favorites: [
         ],
      cartItems: [
        ],
    orderHistory: [
       ]
  });
  const {setUserId ,isDarkMode,pathToPage, userId,setOpenOrderDetailId} = useContext(ShoppingAppContext)
    
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    orders: 0,
    revenue: 0,
    visitors:0,
});

// Fetch Favorite Items List
  useEffect(() => {
   const handler = setTimeout(()=>{
    fetch(pathToPage +`/shopping/fav/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      setFavItems(data);
      //console.log(data);
      //setProfile({ ...profile, favorites: data })
    })
    .catch((err) => console.log(err));
  
   },99);
   return () => {
    clearTimeout(handler);
  };
         //console.log(cartData); 
},[profile]);

//Order Details Fetch
  useEffect(() => {
    fetch(pathToPage +`/order/detail/${userId}`)
    .then((res) => res.json())
    .then((data) => {
      //setFavItems(data);
      //console.log(data);
      setProfile({ ...profile, orderHistory: data })
    })
    .catch((err) => console.log(err));
  
  
         //console.log(cartData); 
},[userId]);

//Cart Details Fetch
useEffect(()=>{
  const handle = setTimeout(()=>{
    fetch(pathToPage +`/shopping/cart/${userId}`)
    //.then((res) => {console.log(res)})
    .then((res) => res.json())
    .then((data) => {setProfile({ ...profile, cartItems: data })})
    .catch((err) => console.log(err));

    
  
   },100);
   return () => {
    clearTimeout(handle);
  };
     
},[profile]); 

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = (profileImage, mobile, fullName, address, userName, bio, dob, email, uid) => {
    setIsEditing(false);

    const formData = new FormData();
    formData.append('image', profileImage);
    formData.append('full_name', fullName);
    formData.append('address', address);
    formData.append('user_name', userName);
    formData.append('bio', bio);
    formData.append('mobile', mobile);
    formData.append('dob', dob);
    formData.append('email', email);
    formData.append('uid', uid);

    axios.post(pathToPage +'/upload/user', formData)
        .then((res) => {
            console.log('Response:', res.data);
            if (res.data.message) {
                // Handle success, use the updated data as needed
                const updatedUserData = res.data.updatedData;
                console.log('Updated User Data:', updatedUserData);
                setProfileData(updatedUserData);
                // You can update the state or UI with the new data here
                // For example:
                // setUserProfile(updatedUserData);
            } else {
                console.error('Failed to update user information');
            }
        })
        .catch((err) => {
            console.error('Error:', err);
        });
};

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file)
    //console.log(profileImage,file);
    
    //setProfile({ ...profile, profilePicture: URL.createObjectURL(file) });
  };

// to fetch Logged in user details
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await fetch(pathToPage + '/userdata');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data[data.length - 1]);

      if (data.length > 0) {
        setProfileData(data[data.length - 1]);
      } else {
        setProfileData(Guest[0]);
      }
    } catch (err) {
      console.log('Error fetching data:', err);
      setProfileData(Guest[0]); // Fallback to guest profile on error
    }

    // Scroll to the top after fetching data
    window.scrollTo(0, 0);
    console.log('userId =', userId); // Log userId if necessary
  };

  fetchUserData(); // Call the async function

}, []); // Empty dependency array means this will only run once after the initial render

 // console.log(profileData[0].user_name);
 function LogOut(uid) {
  axios.delete(pathToPage +`/userdata/logOut`, {
      data: { userId: uid }  // Include userId in the data object
  })
  .then(res => {
      console.log(res.data.message);
      setUserId(null);
  })
  .catch(err => console.log(err));
}



useEffect(() => {
    const fetchStats = async () => {
        try {
            const usersResponse = await axios.get(pathToPage +'/login');
            const productsResponse = await axios.get(pathToPage +'/shopping');
            const ordersResponse = await axios.get(pathToPage +'/orders');
            const visitorsResponse = await axios.get(pathToPage +'/track-visitor');
            const revenueResponse = await axios.get(pathToPage +'/orders/totalPrice'); // Needs a user_id parameter

            setStats({
                users: usersResponse.data.length,
                products: productsResponse.data.length,
                orders: ordersResponse.data.length,
                visitors: visitorsResponse.data.allVisitors.length,
                revenue: revenueResponse.data.totalRevenue || 0,
            });
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    fetchStats();
}, []);

  return (
    <div className={`${isDarkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-black'}  w-full  p-8 rounded-lg`}>
      <div className="flex items-center mb-8 justify-center flex-col">
        <div className="mr-4 mb-5">
          <img
            src={pathToPage +'/images/' + profileData.profile_pic || 'https://via.placeholder.com/150'}
            alt="Profile"
            className={`w-48 h-48 ${userId === 1 ? 'shadow-xl border-8 border-slate-700 shadow-sky-300  hover:border-4 transition-all' :''}  rounded-full object-cover`}
          />
        </div>
        <div>
          <h1 className="text-3xl">{profileData.full_name}</h1>
          <p>{profileData.name}</p>
          <button onClick={handleEditClick} className="mt-4 bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600">
            Edit Profile
          </button>
        </div>
      </div>

      {isEditing && (
        <div className="mb-8">
          <h2 className="text-2xl mb-4">Edit Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="p-2 rounded bg-slate-700"
              placeholder="Full Name"
            />
             <input
              type="text"
              value={profile.username}
              onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              className="p-2 rounded bg-slate-700"
              placeholder="Username"
            />
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="p-2 rounded bg-slate-700"
              placeholder="Phone Number"
            />
            <input
              type="text"
              value={profile.address}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="p-2 rounded bg-slate-700"
              placeholder="Address"
            />
            <input
              type="date"
              value={profile.dob}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
              className="p-2 rounded bg-slate-700"
              placeholder="Date of birth"
            />
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="p-2 rounded bg-slate-700"
              placeholder="Bio"
            />
            <input
              type="file"
              onChange={(e)=>{handleProfilePictureChange(e)}}
              className="p-2 rounded bg-slate-700"
            />
          </div>
          <button onClick={()=>{handleSaveClick(profileImage,profile.phone,profile.name,profile.address,profile.username,profile.bio,profile.dob,profileData.email,profileData.user_id)}} className="mt-4 bg-yellow-500 px-4 py-2 rounded-lg hover:bg-yellow-600">
            Save Changes
          </button>
        </div>
      )}

   {/*   details  For Admin  */}
      {
        userId === 1 ? (
          <div className={`w-full h-auto ${isDarkMode ? 'bg-slate-600 ' :'bg-slate-300'}`}>
            <h1 className='w-full px-7 text-2xl font-semibold'>Only for Admin :: <span className='text-orange-500'>AAMIN PATEL</span> </h1>
              <table className='w-full text-center border-2 border-black border-collapse'>
                <tbody>
                  
                  <tr className='border-2 border-black'>
                  <td  className='border-r-2 border-r-black p-2'> <b>Users</b> </td>
                  <td>{stats.users}</td>
                  </tr>

                   <tr className='border-2 border-black'>
                   <td className='border-r-2 border-r-black p-2' > <b>Orders</b> </td>
                  <td>{stats.orders}</td>
                  </tr>
                   <tr className='border-2 border-black'>
                   <td className='border-r-2 border-r-black p-2'> <b>Products</b> </td>
                  <td>{stats.products}</td>
                  </tr>
                   <tr className='border-2 border-black'>
                   <td className='border-r-2 border-r-black p-2' > <b>Revenue</b> </td>
                  <td>${stats.revenue}</td>
                  </tr>
                  <tr>
                   <td className='border-r-2 border-r-black p-2' > <b>Visitors</b> </td>
                  <td>{stats.visitors}</td>
                  </tr>
                  
                </tbody>
              </table>
              <button className='bg-orange-500 text-white px-3 p-1 rounded-md m-2' onClick={()=>{navigate('/aaminshop/admin')}}>Go to Admin Panel</button>
              <button className='bg-orange-500 text-white px-3 p-1 rounded-md m-2' onClick={()=>{navigate('/aaminshop/additem')}}>Add New Item to Shop</button>
          </div>
        ):''
      }
      
     {/*  Favorite Items  */}
      <div className={`mb-8 items-center flex flex-col gap-3 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}  p-1 rounded`}>
        <h2 className="text-2xl mb-4">Favorite Items</h2>
        <ul className=' flex flex-row flex-wrap justify-center items-center'>
          { !userId ?  ( <p>Please Login to add items to your Favorite list.
            <span onClick={()=>{navigate("/aaminshop/login")}} className='m-2 px-2 bg-orange-500 rounded cursor-pointer'>Login</span>
          </p>)
         :
            favItems.length ? (
             ''
            ) : ( <p>No items in your fav items list.</p>)
          }
          {favItems.slice(0,6).map((item, index) => (
            <FavoriteItemCard key={index} image={item.image_path} name={item.product_name} category={item.category} brand={item.brand} price={item.price} productId = {item.productId}/>
        ))}
        </ul>
        <p className='text-right w-full flex justify-end'>
         {favItems.length ? (
          <span  onClick={()=>{navigate("/aaminshop/shopFav")}}  className='flex justify-center bg-white rounded w-32 flex-row items-center gap-2 text-orange-500 hover:text-orange-300 cursor-pointer'>Go To Fav <FaArrowRight/></span>

         ) : (
          <span  onClick={()=>{navigate("/aaminshop/shop")}}  className='flex justify-center bg-white rounded w-32 flex-row items-center gap-2 text-orange-500 hover:text-orange-300 cursor-pointer'>Go To Shop <FaArrowRight/></span>

         )}
          </p>

      </div>

{/* Cart Items */} 
     <div className={`mb-8 items-center flex flex-col gap-3 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}  rounded p-1`}>
        <h2 className="text-2xl mb-4">Cart Added Items</h2>
        <ul className=' flex flex-row flex-wrap justify-center items-center'>
        { !userId ?  ( <p>Please Login to add items to your Cart.
            <span onClick={()=>{navigate("/aaminshop/login")}} className='m-2 px-2 bg-orange-500 rounded cursor-pointer'>Login</span>
          </p>)
         :
         profile.cartItems.length ? (
             ''
            ) : ( <p>No items in your Cart.</p>)
          }
          {profile.cartItems.slice(0,6).map((item, index) => (
            <CartItemCard key={index} image={item.image_path} name={item.product_name} category={item.category} brand={item.brand} price={item.price} productId = {item.productId} />
        ))}
        </ul>
        <p className='text-right w-full flex justify-end'>
        {profile.cartItems.length ? (
          <span  onClick={()=>{navigate("/aaminshop/shopcart")}}  className='flex justify-center bg-white rounded w-32 flex-row items-center gap-2 text-orange-500 hover:text-orange-300 cursor-pointer'>Go To Cart <FaArrowRight/></span>

         ) : (
          <span  onClick={()=>{navigate("/aaminshop/shop")}}  className='flex justify-center bg-white rounded w-32 flex-row items-center gap-2 text-orange-500 hover:text-orange-300 cursor-pointer'>Go To Shop <FaArrowRight/></span>

         )}
         </p>
      </div>

     {/*  Order History Section */}
      <div className="mb-8">
  <h2 className="text-2xl mb-4 text-center">Order History</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {
      profile.orderHistory.length ? '':
      (
        <p>No any orders yet</p>
      )
    }
    {profile.orderHistory.map((order, index) => (
      <div key={index} className={`p-4 ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'} rounded-lg`} onClick={()=>{setOpenOrderDetailId(order.orderId); navigate('/aaminshop/order')}}>
        <h3 className="text-lg font-semibold">Amount : ${order.amount}</h3>
        <h3 className="text-lg font-semibold">Quantity : {order.item_quantity}</h3>
        <p className="text-sm text-gray-400">{order.date}</p>
        <p className="text-sm text-gray-400">Order Id: {order.orderId}</p>
      </div>
    ))}
  </div>
</div>

      <div className="mb-8">
        <h2 className="text-2xl mb-4">Security Settings</h2>
        <button className="bg-yellow-500 font-medium px-4 py-2 rounded-lg hover:bg-yellow-600">Change Password</button>
      </div>

      <div>
        <button className="bg-yellow-500 font-medium px-4 py-2 rounded-lg hover:bg-yellow-600" onClick={()=>{LogOut(userId)}}>Logout</button>
      </div>
    </div>
  );
};
const CartItemCard = ({ image, name, price,brand,category,productId }) => {
  const {productClicked} = useTools();
  const {pathToPage} = useContext(ShoppingAppContext)
    return (
        <div className="bg-slate-900 m-2 text-white p-4 rounded-lg shadow-lg w-44 flex flex-col justify-between hover:bg-slate-600 hover:scale-105 transition-all"
        onClick={()=>{
          productClicked(
          name,
          image,
          price,
          brand,
          category,
          productId,
        )}} 
        >
        <img src={pathToPage + `/images/${image}` || 'https://via.placeholder.com/150'} alt={name} className="w-full h-32 object-cover rounded mb-4" />
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <p className="text-lg font-bold">${price}</p>
        </div>
      </div>
    );
  };
  const FavoriteItemCard = ({ image, name, price,brand,category,productId }) => {
    const {productClicked} = useTools();
    const {pathToPage} = useContext(ShoppingAppContext)

    return (
      <div className="bg-slate-900 m-2 text-white p-4 rounded-lg h-64 w-44 flex flex-col items-center justify-between shadow-lg hover:bg-slate-600 hover:scale-105 transition-all"
      onClick={()=>{
        productClicked(
        name,
        image,
        price,
        brand,
        category,
        productId,
      )}} 
      >
        <img src={pathToPage + `/images/${image}` || 'https://via.placeholder.com/150'} alt={name} className="w-32 h-40 object-cover rounded-xl" />
        <h3 className="text-lg font-semibold text-center">{name}</h3>
        <h3 className="text-slate-100 text-center">{category}</h3>
      </div>
    );
  };
export default UserProfileDashboard;

