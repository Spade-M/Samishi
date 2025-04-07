import React from "react";
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
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Contact from "./Components/Contact"
import Adoption from "./Components/Adoption";

function App() {
  // Create a router that uses the Layout component as a wrapper for your routes
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/about", element: <AboutUs /> },
        {path: "/contact", element: <Contact /> },
        { path: "/facts", element: <Facts /> },
        { path: "/posts", element: <Posts /> },
        { path: "/adoption", element: <Adoption /> },
        { path: "/login", element: <Login /> },
        { path: "/SignUp", element: <SignUp /> },
        { path: "/userinfo", element: <User /> },
        { path: "/userquery", element: <UserQuery /> },
        { path: "/edit", element: <Edit /> },
        { path: "/more", element: <More/> },
      ],
    },
  ]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check user authentication status when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/", { withCredentials: true })
      .then((response) => {
        // If the request is successful, the user is authenticated
        setIsLoggedIn(true);
      })
      .catch((error) => {
        // If the request fails (e.g., 401 Unauthorized), the user is not logged in
        console.error("User is not logged in:", error);
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <>
    {isLoggedIn && (
      <Header />
    )}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
