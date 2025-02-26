import React, { useState, useEffect } from "react";
import axios from "axios";

const EditInfo = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Fetch the current user info when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/", { withCredentials: true })
      .then((response) => {
        setUsername(response.data.username);
        setEmail(response.data.email);
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
        setMessage("Error fetching user details.");
      });
  }, []);

  // Update user info via the API
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:8000/api/user/",
        { username, email, password },
        { withCredentials: true }
      )
      .then((response) => {
        setMessage(response.data.message || "User updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
        setMessage("Error updating user details.");
      });
  };

  // Clear the form fields
  const handleClear = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setMessage("");
  };

  // Delete the user via the API
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      axios
        .delete("http://localhost:8000/api/user/", { withCredentials: true })
        .then((response) => {
          setMessage(response.data.message || "User deleted successfully.");
          // Optionally, redirect to a signup or homepage after deletion.
          window.location.href = "/";
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          setMessage("Error deleting user.");
        });
    }
  };

  return (
    <>
      <h1>Edit Information</h1>
      {message && <div className="alert alert-info">{message}</div>}
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
            placeholder="Enter new password if you want to change it"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button type="submit" className="btn btn-success">
          Save Changes
        </button>
        <button
          type="button"
          className="btn btn-primary ms-2"
          onClick={handleClear}
        >
          Clear
        </button>
        <button
          type="button"
          className="btn btn-danger ms-2"
          onClick={handleDelete}
        >
          Delete User
        </button>
      </form>
    </>
  );
};

export default EditInfo;
