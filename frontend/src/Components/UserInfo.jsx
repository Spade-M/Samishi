import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "/logo6.png";
import cat1 from "/cat1Logo.png";
import cat2 from "/cat2Logo.png";
import ball from "/ballLogo.png";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user/", {
          withCredentials: true, // Ensure cookies are sent
        });
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error("Error fetching user info:", err);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      <div>
        <img
          src={ball}
          alt="ball"
          className="img-fluid"
          style={{ width: "100px" , top: "-60px", left: "25%", position: "relative"}}
        />
      </div>
      <div className="d-flex align-items-center">
        {/* Left empty div for image */}
        <div style={{ width: "200px" }}>
          <img
            src={cat1}
            alt="Peeking Cat"
            className="img-fluid"
            style={{ width: "200px" }}
          ></img>
        </div>

        <div
          className="card p-4 shadow position-relative"
          style={{
            width: "350px",
            borderRadius: "15px",
            border: "none",
            overflow: "hidden",
            background: "rgb(246, 212, 247)",
          }}
        >
          <div
            className="text-center"
            style={{
              position: "absolute",
              top: "-5px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <img
              src={logo}
              alt="Peeking Cat"
              className="img-fluid"
              style={{ width: "100px" }}
            />
          </div>
          <br />
          <h2 className="text-center mt-5">User Information</h2>
          <br />
          {error && <p className="text-danger text-center">{error}</p>}
          {user ? (
            <div className="text-center">
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
          ) : (
            <p className="text-center">Loading user info...</p>
          )}
          <div className="text-center mt-3">
            <a href="/edit">
              <button>Edit Info</button>
            </a>
          </div>
        </div>

        {/* Right empty div for image */}
        <div style={{ width: "200px" }}>
          <img
            src={cat2}
            alt="Peeking Cat"
            className="img-fluid"
            style={{ width: "200px" }}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
