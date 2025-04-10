import React, { useState } from "react";
import api from "../utils/api"; // Using the token-enabled axios instance
import logo from "/logo3.png";
import cat1 from "/playingLogo.png";
import Footer from "./Footer";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await api.post("login/", { username, password });

      // Store token for future authenticated requests
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log("Token stored:", token);
      

      setSuccess(true);
      // Redirect to posts page
      window.location.href = "/posts";
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Login failed");
        console.error("Login failed:", error.response.data);
      } else if (error.request) {
        setError("No response from the server.");
        console.error("No response:", error.request);
      } else {
        setError("An error occurred: " + error.message);
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <div
        className="text-center"
        style={{
          position: "relative",
          top: "16px",
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
      <div
        className="card p-4 shadow position-relative"
        style={{
          width: "350px",
          top: "16px",
          borderRadius: "15px",
          border: "none",
          overflow: "hidden",
          left: "35%",
          background: "rgb(246, 212, 247)",
        }}
      >
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <br />
          <button type="submit" >
            Login
          </button>
          <p className="or text-center mt-3">
            or<br />
            <a href="/SignUp">Sign Up</a>
          </p>
          {error && <p className="text-danger mt-2 text-center">{error}</p>}
          {success && (
            <p className="text-success mt-2 text-center">Login successful!</p>
          )}
        </form>
      </div>

      <div>
        <img
          src={cat1}
          alt="Playing Cat"
          className="img-fluid"
          style={{
            width: "250px",
            left: "-70%",
            bottom: "70px",
            position: "relative",
            rotate: "-48deg",
          }}
        />
      </div>
    </div>
  );
};

export default Login;
