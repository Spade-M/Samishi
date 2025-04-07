import { useState, useEffect } from "react";
import Logo from "/logo.png";
import axios from "axios";

const Header = () => {
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

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/api/logout/",
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      // Optionally, redirect to the homepage or update global state
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <nav
        className="navbar navbar-pink bg-pink fixed-top"
        style={{ backgroundColor: "rgb(255, 236, 195)" }} // Set pink background here
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            {/* Insert your brand/logo here */}
            <img
              src={Logo}
              alt="Logo"
              width="40"
              height="40"
              className="d-inline-block align-text-top"
              // Set pink background here
            />
          </a>
          <h4 className="navbar-text" style={{ color: "purple" }}>
            Samishi Community
          </h4>
          <ul className="nav justify-content-end flex-grow-1 pe-3">
            <li className="nav-item">
              <a
                className="nav-link text-black"
                aria-current="Posts"
                href="/posts"
              >
                Posts
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-black "
                aria-current="Cat Facts"
                href="/facts"
              >
                Cats Facts
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-black"
                aria-current="About us"
                href="/about"
              >
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-black"
                aria-current="About us"
                href="/adoption"
              >
                Adoption Center
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link text-black"
                aria-current="User Info"
                href="/userinfo"
              >
                User Info
              </a>
            </li>
          </ul>
          <button
            style={{ backgroundColor: "rgb(255, 236, 195)" ,
            color: "black"
          
            }}
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
