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
import Feeds from "./Components/Feeds";
import Layout from "./Components/Layout";
import "./App.css";

function App() {
  // Create a router that uses the Layout component as a wrapper for your routes
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/feeds", element: <Feeds /> },
        { path: "/about", element: <AboutUs /> },
        { path: "/posts", element: <Posts /> },
        { path: "/login", element: <Login /> },
        { path: "/SignUp", element: <SignUp /> },
        { path: "/userinfo", element: <User /> },
        { path: "/userquery", element: <UserQuery /> },
        { path: "/edit", element: <Edit /> },
        { path: "/more", element: <More /> },
      ],
    },
  ]);

  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
