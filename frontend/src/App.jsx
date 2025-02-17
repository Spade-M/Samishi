import { useState } from "react";
import Home from "./Components/Home";
import Posts from "./Components/Posts";
import AboutUs from "./Components/AboutUs";
import Login from "./Components/Login";
import Header from "./Components/Header";
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
    }
  ])
  return (
    <>
    <Header/>
    <RouterProvider router={router} />    
     
    </>
  );
}

export default App;
