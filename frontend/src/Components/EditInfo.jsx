import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "/logo7.png";

const EditInfo = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setMessage("You must be logged in.");
      return;
    }

    axios
      .get("http://localhost:8000/api/user/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setUsername(res.data.username);
        setEmail(res.data.email);
        if (res.data.profile_picture) {
          setPreviewUrl(res.data.profile_picture); // show current profile pic
        }
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
        setMessage("Error fetching user details.");
      });
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    if (password) formData.append("password", password);
    if (profilePic) formData.append("profile_picture", profilePic);

    try {
      const res = await axios.put("http://localhost:8000/api/user/", formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage("User updated successfully.");
      window.location.href = "/";
    } catch (error) {
      console.error("Error updating user:", error);
      setMessage("Error updating user.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file)); // show new preview
    }
  };

  const handleClear = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setProfilePic(null);
    setPreviewUrl(null);
    setMessage("");
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      axios
        .delete("http://localhost:8000/api/user/", {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          setMessage("User deleted.");
          localStorage.removeItem("token");
          window.location.href = "/";
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
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
        {message && <div className="alert alert-info text-center">{message}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3 text-center">
            <label className="form-label"><strong>Profile Picture</strong></label>
            <div>
              <img
                src={
                  previewUrl ||
                  "https://via.placeholder.com/100x100.png?text=No+Image"
                }
                alt="Profile"
                className="rounded-circle mb-2"
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  border: "2px solid #ccc",
                }}
              />
              <input
                type="file"
                accept="image/*"
                className="form-control mt-2"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="username" className="form-label"><strong>Username</strong></label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label"><strong>Email</strong></label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label"><strong>Password</strong></label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              style={{ backgroundColor: "#4CB7A5" }}
              className="me-2"
            >
              Save Changes
            </button>
            <button
              type="button"
              style={{ backgroundColor: "#FF6B6B" }}
              onClick={handleClear}
              className="me-2"
            >
              Clear
            </button>
            <button
              type="button"
              style={{ backgroundColor: "#C2185B" }}
              onClick={handleDelete}
            >
              Delete User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditInfo;
