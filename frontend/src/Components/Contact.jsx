import React from "react";

const Contact = () => {
  return (
    <div className="container mt-5 mb-5">
<br />
      <div className="d-flex align-items-center">

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
          <form encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username/Name
              </label>
              <input type="text" className="form-control" id="username" />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="email" />
            </div>

            <div className="mb-3">
              <label htmlFor="postid" className="form-label">
                Post ID
              </label>
              <input type="text" className="form-control" id="postid" />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input type="text" className="form-control" id="address" />
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
        
      </div>
    </div>
  );
};

export default Contact;
