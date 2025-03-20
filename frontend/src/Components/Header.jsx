import { useState, useEffect } from "react";
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
      <nav className="navbar navbar-pink bg-pink fixed-top">
        <div className="container-fluid" >
          <a className="navbar-brand" href="/" >
            {/* Insert your brand/logo here */}
          
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
            className="offcanvas offcanvas-end"
            id="offcanvasLightNavbar"
            aria-labelledby="offcanvasLightPinkNavbarLabel"
            style={{ backgroundColor: "#eaa9ee" }} // Set pink background here
          >
            <div className="offcanvas-header">
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                {!isLoggedIn && (
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">
                      Home
                    </a>
                  </li>
                )}
                {isLoggedIn && (
                  <li className="nav-item">
                    <a className="nav-link" href="/posts">
                      Posts
                    </a>
                  </li>
                )}
                <li className="nav-item">
                  <a className="nav-link" href="/about">
                    About Us
                  </a>
                </li>
                
                {isLoggedIn && (
                  <li className="nav-item">
                    <a className="nav-link" href="/userinfo">
                      User Information
                    </a>
                  </li>
                )}
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
              <br />
              {isLoggedIn && (
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
              <br />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
