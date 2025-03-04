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
import More from "./Components/More";
import Feeds from "./Components/Feeds";
import "./App.css";
import { createBrowserRouter, RouterProvider} from "react-router-dom";


function App() {
  const router = createBrowserRouter([
    {
      path : "/",
      element : <Home/>
    },
    {
      path : "/feeds",
      element: <Feeds/>
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
    {
      path : "/more",
      element : <More/>
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
