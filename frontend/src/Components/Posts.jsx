import React, { useState } from "react";

const Posts = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to Array
    setSelectedFiles(files);

    const previews = [];
    files.forEach((file) => {
      if (file.type.startsWith("image/")) { // Check if file is an image
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result); // reader.result is the data URL
          if (previews.length === files.length) {
            setImagePreviews(previews); // Update state after all previews are loaded
          }
        };
        reader.readAsDataURL(file); // Read file as Data URL
      } else {
        // Handle non-image files (optional: display error, ignore, etc.)
        console.warn("File is not an image:", file.name);
        // Optionally, you could remove the non-image file from selectedFiles and previews
      }
    });
    if (files.length === 0) {
      setImagePreviews([]); // Clear previews if no files are selected
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission (for client-side handling)
    // In a real application, you would handle form submission here
    // e.g., using fetch or axios to send data to the server
    console.log("Form submitted with files:", selectedFiles);
    console.log("Caption:", event.target.caption.value);
    // You would typically FormData to send files and caption in a real scenario
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create Post</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="files" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Upload Images:
          </label>
          <input
            type="file"
            name="file" // Changed to "file" instead of "file[]" for single file upload
            id="files"
            multiple // Keep multiple if you want multiple image upload
            onChange={handleFileChange}
            accept="image/*" // Optional: restrict to image files
            style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px", width: "100%", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="caption" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Caption:
          </label>
          <textarea
            name="caption"
            id="caption"
            placeholder="Write Something..."
            style={{
              backgroundColor: "#eaa9ee",
              color: "#333",
              padding: "8px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              width: "100%",
              boxSizing: "border-box",
              minHeight: "80px",
              resize: "vertical",
            }}
          />
        </div>
        <button
          type="submit" // Changed type to "submit" for form submission
          id="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Upload Post
        </button>
      </form>
      <div id="preview" style={{ marginTop: "20px", display: "flex", flexWrap: "wrap" }}>
        {imagePreviews.map((preview, index) => (
          <div key={index} style={{ margin: "5px", width: "100px", height: "100px", overflow: "hidden", borderRadius: "8px", boxShadow: "0 2px 4px rgb(255, 255, 255)" }}>
            <img
              src={preview}
              alt={`Preview ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;