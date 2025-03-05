import React, { useState } from "react";
import axios from "axios";
import logo from "/logo5.png";
import cat1 from "/playingLogo.png";
import cat2 from "/sleepingLogo.png";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Added email field
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post("http://localhost:8000/api/signup/", {
        username,
        password,
        email, // Send email in the request
      });

      console.log("Signup successful:", response.data);
      setSuccess(true);
      // Optionally redirect or update UI
      window.location.href = "/login"; // Redirect to login page after signup
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error || "Signup failed";
        setError(errorMessage);
        console.error("Signup failed:", error.response.data);
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
          top: "15px",
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
      <div className="d-flex align-items-center">
        {/* Left empty div for image */}
        <div style={{ width: "400px" }}></div>
        <div
          className="card p-4 shadow"
          style={{
            width: "350px",
            borderRadius: "15px",
            border: "none",
            overflow: "hidden",
            background: "rgb(246, 212, 247)",
          }}
        >
          <h2 className="text-center">SignUp</h2>
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
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button type="submit">SignUp</button>
            <p className="or">
              or
              <br />
              <a href="/Login">Login</a>
            </p>
            {error && <p className="text-danger mt-2 text-center">{error}</p>}
            {success && (
              <p className="text-success mt-2 text-center">
                Signup successful!
              </p>
            )}
          </form>
        </div>
        {/* Right empty div for image */}
        <div style={{ width: "400px", }}>
          <img
            src={cat2}
            alt="Sleeping Cat"
            className="img-fluid"
            style={{
              width: "300px",
              bottom: "-100px",
              left: "-50%",
              position: "relative",
            }}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Signup;
