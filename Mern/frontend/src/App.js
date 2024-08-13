
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch()           //  This constant is used to dispatch actions to the Redux store
  const [cartProductCount,setCartProductCount] = useState(0)

  const fetchUserDetails = async()=>{       //An asynchronous function that fetches the current user's details from the server.
      const dataResponse = await fetch(SummaryApi.current_user.url,{   //fetch: Makes an HTTP request to the API endpoint provided in SummaryApi.current_user.url.
        method : SummaryApi.current_user.method,  
        credentials : 'include'
      })

      const dataApi = await dataResponse.json()

      if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))
      }
  }

  const fetchUserAddToCart = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)
  }

  useEffect(()=>{  // useEffect: This hook runs when the component is mounted. It ensures that fetchUserDetails and fetchUserAddToCart are called when the component first loads.
    /**user Details */
    fetchUserDetails()
    /**user Details cart product */
    fetchUserAddToCart()

  },[])  //[]: The empty dependency array means that this effect runs only once
  return (
    <>
      <Context.Provider value={{
          fetchUserDetails, // user detail fetch 
          cartProductCount, // current user add to cart product count,
          fetchUserAddToCart
      }}>
        <ToastContainer 
          position='top-center'
        />
        
        <Header/>
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet/>
        </main>
        <Footer/>
      </Context.Provider>
    </>
  );
}

export default App;