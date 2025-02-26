import React from "react";
import Logo from "/logo.png";
import AboutUs from "./AboutUs";
const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-pink bg-pink fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
    
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasLightNavbar"
            aria-controls="offcanvasLightNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end text-bg-pink"
            tabindex="-1"
            id="offcanvasLightNavbar"
            aria-labelledby="offcanvasLightPinkNavbarLabel"
          >
            <div className="offcanvas-header" >
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body" >
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3" >
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about">
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/posts">
                    Posts
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/userinfo">
                    User Information
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/userquery">
                    User Query
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/more">
                    More About Cats
                  </a>
                </li>
               </ul>
              <br/>
                <button className="btn btn-danger" type="submit">
                  Log Out
                </button>
        
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
