import React, { useState } from "react";
import cat1 from "/peakingLogo.png";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [caption, setCaption] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);

    const previews = [];
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result);
          if (previews.length === files.length) {
            setImagePreviews(previews);
          }
        };
        reader.readAsDataURL(file);
      } else {
        console.warn("File is not an image:", file.name);
      }
    });

    if (files.length === 0) {
      setImagePreviews([]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (imagePreviews.length > 0 || caption) {
      const newPost = { images: imagePreviews, caption };
      setPosts([newPost, ...posts]);
      setSelectedFiles([]);
      setImagePreviews([]);
      setCaption("");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-5">
      {/* Upload Section */}
      <div style={{ width: "300px" }}>
        <img
          src={cat1}
          alt="Peeking Cat"
          className="img-fluid"
          style={{
            width: "400px",
            top: "55px",
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </div>

      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "20px",
          background: "rgb(246, 212, 247)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create Post</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="files" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
              Upload Images:
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*"
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
            <label htmlFor="caption" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
              Caption:
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write Something..."
              style={{
                backgroundColor: "#eaa9ee",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                width: "100%",
                minHeight: "80px",
                resize: "vertical",
              }}
            />
          </div>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "1px solid transparent",
              borderRadius: "20px",
              cursor: "pointer",
              fontSize: "1em",
              fontWeight: "500",
            }}
          >
            Upload Post
          </button>
        </form>

        {/* Image Previews */}
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            flexWrap: "wrap",
            backgroundColor: "#f8dff8",
          }}
        >
          {imagePreviews.map((preview, index) => (
            <div
              key={index}
              style={{
                margin: "5px",
                width: "100px",
                height: "100px",
                overflow: "hidden",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(234, 169, 238, 0.5)",
              }}
            >
              <img src={preview} alt={`Preview ${index + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>
      </div>

      {/* Feed Section */}
      <div className="mt-5 w-full max-w-md">
        <h2 className="text-lg font-bold text-center mb-3">Feed</h2>
        <div className="flex flex-col items-center gap-5">
          {posts.length === 0 && <p className="text-center text-gray-500">No posts yet!</p>}
          {posts.map((post, index) => (
            <div
              key={index}
              className="p-3 rounded-lg shadow-lg"
              style={{
                width: "300px",
                background: "rgb(246, 212, 247)",
                borderRadius: "12px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                marginBottom: "20px", // Added gap between posts
              }}
            >
              {/* Scrollable Image Container */}
              <div
                style={{
                  display: "flex",
                  overflowX: "auto",
                  gap: "5px",
                  width: "100%",
                  paddingBottom: "5px",
                }}
              >
                {post.images.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={`Post ${index}`}
                    style={{
                      width: "300px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                ))}
              </div>
              {/* Caption */}
              <p className="mt-2 text-gray-700 text-sm text-center">{post.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
