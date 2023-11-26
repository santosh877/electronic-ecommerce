import React from "react";
import { Routes, Route } from "react-router-dom";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Home from "./Pages/Home/home";
import Header from "./Components/Navbar/Header";
import RegisterCompletes from "./Pages/auth/RegisterComplete";

const App = () => {
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
