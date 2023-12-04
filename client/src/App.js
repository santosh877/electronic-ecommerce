import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Home from "./Pages/Home/home";
import Header from "./Components/Navbar/Header";
import RegisterCompletes from "./Pages/auth/RegisterComplete";

import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
     const unSubscribe = auth.onAuthStateChanged(async (user)=> {
        if(user) {
          const idTokenResult = await user.getIdTokenResult()
          console.log(user);
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              name: user.email,
              token: idTokenResult.token,
            }
          })
        }
     });

     //cleanUp
     return () => unSubscribe();
  });
  return (
    <>
      <Header />
      <ToastContainer />
  
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/register" Component={Register} />
        <Route exact path="/register/complete" Component={RegisterCompletes} />
      </Routes>
    </>
  );
};

export default App;
