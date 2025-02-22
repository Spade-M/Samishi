import React, { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
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
    <div className="container mt-4">
      <h2>User Information</h2>
      {error && <p className="text-danger">{error}</p>}
      {user ? (
        <div className="card p-3">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
};

export default Posts;
