import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  LoginOutlined
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";

const Header = () => {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();


  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      path: "/",
      icon: <AppstoreOutlined />,
    },
    {
      label: "User Name",
      key: "SubMenu",
      icon: <SettingOutlined />,
      children: [
        {
          label: "Option 1",
          key: "setting:1",
        },
        {
          label: "Option 2",
          key: "setting:2",
        },
        {
          label: "Logout",
          key: "log_out",
          icon: < LogoutOutlined/>,
          onClick: () => {getUserLogout()}
        },
      ],
    },
    {
      label: <Link to="/login">Login</Link>,
      key: "login",
      path: "/login",
      icon: <LoginOutlined />,
      style: {
        marginLeft: "auto",
      },
    },
    {
      label: <Link to="/register">Register</Link>,
      key: "register",
      path: "/register",
      icon: <UserAddOutlined />,
      style: {
       // marginLeft: "73%",
      },
    },
   
  ];
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const getUserLogout = () => {
    let auth = getAuth();
     auth.signOut();
     dispatch({
      type: "LOGOUT",
      payload: null,
     })
    window.location.href = '/login';
  }
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Header;
