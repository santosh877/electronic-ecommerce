import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Header = () => {
  const [current, setCurrent] = useState("home");

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
      ],
    },
    {
      label: <Link to="/login">Login</Link>,
      key: "login",
      path: "/login",
      icon: <UserOutlined />,
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
