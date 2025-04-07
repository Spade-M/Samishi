import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Here you can also send it to your backend if needed
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" }); // Clear form
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      {submitted ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Thank you for contacting us! We'll get back to you soon.
          <br />
          <a href="/">go back to home</a>
        </div>
      ) : (
        <>
          <p className="mb-6 text-gray-700">
            Have questions about adopting an animal? Reach out to us!
          </p>
          <div
            style={{
              maxWidth: "400px",
              margin: "0 auto",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "20px",
              background: "rgb(246, 212, 247)",
            }}
          >
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Your Name:
                </label>
                <input
                  htmlFor="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    width: "100%",
                    boxSizing: "border-box",
                    background: "#eaa9ee",
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Email:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    width: "100%",
                    boxSizing: "border-box",
                    background: "#eaa9ee",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="caption"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Message:
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write something..."
                  style={{
                    backgroundColor: "#eaa9ee",
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    width: "100%",
                    minHeight: "80px",
                    resize: "vertical",
                    color: "black",
                  }}
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </>
      )}
      <br />
      <div className="flex justify-between">
        <a href="/">Go Back to Home</a>
      </div>
    </div>
  );
}

export default Contact;
