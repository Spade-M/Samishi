import React, { useState } from "react";
import axios from "axios";

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
      const response = await axios.post(
        "http://localhost:8000/api/login/",
        { username, password },
        { withCredentials: true } // Include cookies for session authentication
      );

      console.log("Login successful!", response.data);
      setSuccess(true);
      // Redirect to Posts.jsx page after login
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
    <div className="container mt-4">
      <h2>Login</h2>
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

        <button type="submit" className="btn btn-primary">
          Login
        </button>

        {error && <p className="text-danger mt-2">{error}</p>}
        {success && <p className="text-success mt-2">Login successful!</p>}
      </form>
    </div>
  );
};

export default Login;
