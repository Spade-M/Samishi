import { useState, useEffect } from "react";
import Logo from "/logo.png";
import axios from "axios";

const Header = () => {
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

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "http://localhost:8000/api/logout/",
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      window.location.href = "/";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <nav
        className="navbar navbar-pink bg-pink fixed-top"
        style={{ backgroundColor: "rgb(255, 236, 195)" }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <a className="navbar-brand" href="/">
              <img
                src={Logo}
                alt="Logo"
                width="40"
                height="40"
                className="d-inline-block align-text-top"
              />
            </a>
            <h4 className="navbar-text mb-0 ms-2" style={{ color: "purple" }}>
              Samishi Community
            </h4>
          </div>

          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link text-black" href="/posts">
                Posts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-black" href="/facts">
                Cats Facts
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-black" href="/about">
                About Us
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-black" href="/adoption">
                Adoption Center
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-black" href="/userinfo">
                User Info
              </a>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-dark ms-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
