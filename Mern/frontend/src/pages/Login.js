import React, { useContext, useState } from 'react'
// useContext, useState: React hooks for managing state (useState) and accessing context (useContext).
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
// Link, useNavigate: React Router components for navigation.
import SummaryApi from '../common';
import { toast } from 'react-toastify'; // Used for showing notifications.

 import Context from '../context';

const Login = () => {
    
    //const [state, setState] = useState(initialValue):
    //array contains two elements: the current state value (state) and a function to update that value (setState).
    //These hooks (useState, useNavigate, useContext) are functions provided by React to manage state, perform navigation, and access shared data in a functional component.

    const [showPassword, setShowPassword] = useState(false);
    // these code uses the react hooks
    //This hook creates a piece of state called showPassword, which is initialized to false.
    //setShowPassword is a function used to update the value of showPassword.
    // use state: This state is typically used to control whether the password is visible in the input field (toggled between text and password types).

    const [data, setData] = useState({
        //setData is a function used to update the data object.
        //use state: This state is used to store the user's input for the email and password fields in the login form.
        email: "",
        password: ""
    });
     const navigate = useNavigate();
     // useNavigate(): This hook provides a function, navigate, that can be used to programmatically change the URL, effectively navigating the user to different routes within the application.
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);
    const generalContext = useContext(Context);
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        //e.target refers to the DOM element that triggered the event, usually an input field in a form.
        //  extract the name and value properties from e.target.
        setData((preve) => {
            //setData is a function provided by the useState hook to update the data state.
            //The function passed to setData is a callback that takes the previous state (preve) as its argument.
            return {
                ...preve,
                [name]: value
                //If name is "email", then the email field will be updated with the new value.
                //If name is "password", then the password field will be updated.

                // <input name="email" value={data.email} onChange={handleOnChange} />
                //  When the user types in the email field, the onChange event is triggered, calling handleOnChange with the event object (e).
                //The function extracts name = "email" and value = "user@example.com" (or whatever the user has typed).
            };
        });
    };

    const handleSubmit = async (e) => {
        //handleSubmit: This is the name of the function, which will be called when the form is submitted.
        // async: This keyword indicates that the function will contain asynchronous operations, allowing the use of await to pause execution until promises are resolved.
        e.preventDefault();
        //default action m page reload hota h which would intrupt the execution of js code. 
        // so, preventDefault function hame ensure krta h page relaod na while submiting the information.

        
       // const dataResponse = await fetch(SummaryApi.signIn.url,
       const dataResponse = await fetch(SummaryApi.signIn.url,{
        method : SummaryApi.signIn.method,
        credentials : 'include',
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify(data)
    })

        const dataApi = await dataResponse.json();

        if (dataApi.success) {
            toast.success(dataApi.message);
            navigate('/');
            fetchUserDetails();
            fetchUserAddToCart();
        }

        if (dataApi.error) {
            toast.error(dataApi.message);
        }
    };

    console.log("data login", data);

    return (
        <section id='login'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='login icons' />
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email : </label>
                            <div className='bg-slate-100 p-2'>
                                <input
                                    type='email'
                                    placeholder='enter email'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                            </div>
                        </div>

                        <div>
                            <label>Password : </label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='enter password'
                                    value={data.password}
                                    name='password'
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent' />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                                    <span>
                                        {showPassword ? (
                                            <FaEyeSlash />
                                        ) : (
                                            <FaEye />
                                        )}
                                    </span>
                                </div>
                            </div>
                            <Link to={'/forgot-password'} className='block w-fit ml-auto  text-gray-500 hover:text-gray-600 hover:underline'>
                                Forgot password?
                            </Link>
                        </div>

                        <button className='bg-gray-300 hover:bg-gray-400 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>

                    </form>

                    <p className='my-5'>Don't have an account? <Link to={"/sign-up"} className='text-gray-500 hover:text-gray-600 hover:underline'>Sign up</Link></p>
                </div>
            </div>
        </section>
    );
}

export default Login;
