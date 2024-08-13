import React from 'react';// import react library for managing the react componenet and component lifecycle
import ReactDOM from 'react-dom/client'; // import reactDOM library used to intract with the DOM 
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// use top measure the performance of ur application, use to measure load time and other function 
import { RouterProvider } from 'react-router-dom';// used to set up routing in your React application.
import router from './routes';
import { Provider  } from 'react-redux';
// provider act as bridge between react app. and the redux
// its primary goal is: Redux store available to all components in your React application
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));// It attaches your React app to the DOM element with the ID of root, which is typically defined in your index.html file.

root.render(
  // <React.StrictMode>
    <Provider store={store}> 
  {/* // The Provider component from react-redux is used here to wrap your entire application. By passing the store as a prop, it ensures that the Redux store is available to all components within your app, allowing them to access the global state or dispatch actions. */}
  {/* prop is use to send the data from one component to another or from parent component to child component */}
      <RouterProvider router={router}/>
    </Provider>
  // </React.StrictMode>
);
reportWebVitals();
