import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Home from "./Pages/Home/home";
import Header from "./Components/Navbar/Header";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/login" Component={Login} />
        <Route exact path="/register" Component={Register} />
      </Routes>
    </>
  );
};

export default App;
