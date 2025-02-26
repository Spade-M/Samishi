import { useState } from "react";
import Home from "./Components/Home";
import Posts from "./Components/Posts";
import AboutUs from "./Components/AboutUs";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Header from "./Components/Header";
import User from "./Components/UserInfo";
import UserQuery from "./Components/UserQuery";
import Edit from "./Components/EditInfo";
import Logo from "/logo.png";
import "./App.css";
import { createBrowserRouter, RouterProvider} from "react-router-dom";


function App() {
  const router = createBrowserRouter([
    {
      path : "/",
      element : <Home/>
    },
    {
      path : "/about",
      element : <AboutUs/>
    },
    {
      path : "/posts",
      element : <Posts/>
    },
    {
      path : "/login",
      element : <Login/>
    },
    {
      path : "/SignUp",
      element : <SignUp/>
    },
    {
      path : "/userinfo",
      element : <User/>
    },
    {
      path : "/userquery",
      element : <UserQuery/>
    },
    {
      path : "/edit",
      element : <Edit/>
    },
  ])
  return (
    <>
    <Header/>
    <RouterProvider router={router} />    
  
     
    </>
  );
}

export default App;
