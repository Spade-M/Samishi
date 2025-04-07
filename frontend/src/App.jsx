import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Posts from "./Components/Posts";
import AboutUs from "./Components/AboutUs";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import User from "./Components/UserInfo";
import UserQuery from "./Components/UserQuery";
import Edit from "./Components/EditInfo";
import More from "./Components/More";
import Layout from "./Components/Layout";
import Facts from "./Components/Facts";
import Contact from "./Components/Contact";
import Adoption from "./Components/Adoption";
import axios from "axios";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    axios
      .get("http://localhost:8000/api/user/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(() => setIsLoggedIn(true))
      .catch((error) => {
        console.error("User is not logged in:", error);
        setIsLoggedIn(false);
      });
  }, []);

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <AboutUs /> },
        { path: "/contact", element: <Contact /> },
        { path: "/facts", element: <Facts /> },
        { path: "/posts", element: <Posts /> },
        { path: "/adoption", element: <Adoption /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/userinfo", element: <User /> },
        { path: "/userquery", element: <UserQuery /> },
        { path: "/edit", element: <Edit /> },
        { path: "/more", element: <More /> },
      ],
    },
  ]);

  return (
    <>
      {isLoggedIn && <Header />}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
