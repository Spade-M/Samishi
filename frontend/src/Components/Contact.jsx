import React, { useEffect, useState } from "react";
import axios from "axios";

const Contact = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in.");
          return;
        }

        const response = await axios.get("http://localhost:8000/api/user/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error("Error fetching user info:", err);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = {
      username: user.username,
      email: user.email,
      postid: document.getElementById("postid").value,
      address: document.getElementById("address").value,
      message: document.getElementById("message").value,
    };
  
    try {
      const response = await axios.post("http://localhost:8000/api/contact/", formData);
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert(error.response?.data?.error || "Failed to send your message.");
    }
  };

  return (
    <div className="container mt-5 mb-5">
<br />
      <div className="d-flex align-items-center">
      {error && <p className="text-danger text-center">{error}</p>}

      {user ? (
        <div
          className="card p-4 shadow"
          style={{
            width: "450px",
            borderRadius: "15px",
            border: "none",
            overflow: "hidden",
            background: "rgb(246, 212, 247)",
          }}
        >
          <h2 className="text-center">Contact Us For Adoption</h2>
          <br />
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username/Name
              </label>
              <input type="text" className="form-control" id="username" value={user.username} />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="email" value={user.email}/>
            </div>

            <div className="mb-3">
              <label htmlFor="postid" className="form-label">
                Post ID
              </label>
              <input type="text" className="form-control" id="postid" required />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input type="text" className="form-control" id="address" required/>
            </div>
            <div className="mb-3">
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                style={{
                  backgroundColor: "#ffffff",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  width: "100%",
                  minHeight: "80px",
                  resize: "vertical",
                  color: "black",
                }}
                placeholder="Enter your message here"
              />
            </div>

            <button type="submit">Submit</button>

          </form>
        </div>
         ) : (
          !error && <p className="text-center">Loading user info...</p>
        )}

        
      </div>
    </div>
  );
};

export default Contact;
