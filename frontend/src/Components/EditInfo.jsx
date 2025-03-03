import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "/logo7.png";

const EditInfo = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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

  const handleClear = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setMessage("");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      axios
        .delete("http://localhost:8000/api/user/", { withCredentials: true })
        .then((response) => {
          setMessage(response.data.message || "User deleted successfully.");
          window.location.href = "/";
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          setMessage("Error deleting user.");
        });
    }
  };

  return (
    <div>
      <div
        className="card p-4 shadow position-relative"
        style={{
          width: "500px",
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
            top: "-10px",
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
        <h1 className="text-center mt-5">Edit Information</h1>
        <br />
        {message && (
          <div className="alert alert-info text-center">{message}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              <strong>Username</strong>
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
              <strong>Email</strong>
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
              <strong>Password</strong>
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
          <div className="text-center">
            <button type="submit"
            style={{ backgroundColor: "#4CB7A5" }}
            id="save"
              className="me-2">
              Save Changes
            </button>
            <button
              type="button"
              style={{ backgroundColor: "#FF6B6B" }}
              id="clear"
              className="me-2"
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              type="button"
              id="delete"
              style={{ backgroundColor: "#C2185B"}}
              onClick={handleDelete}
            >
              Delete User
            </button>
          </div>
          <br />
        </form>
      </div>
    </div>
  );
};

export default EditInfo;
