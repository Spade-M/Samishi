import { useState, useEffect } from "react";
import axios from "axios";
import cat1 from "/peakingLogo.png";
import Sidebar from "./Sidebar";

const API_URL = "http://localhost:8000/api";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [caption, setCaption] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  // For comment inputs, keyed by post id
  const [commentInputs, setCommentInputs] = useState({});

  // Clear notifications after 3 seconds
  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  // Fetch posts and user info on mount
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts/`, {
          withCredentials: true,
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts", error);
        setErrorMessage("Error fetching posts.");
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/`, {
          withCredentials: true,
        });
        setCurrentUser(res.data.username);
      } catch (error) {
        console.error("Error fetching user info", error);
        setErrorMessage("Error fetching user info.");
      }
    };

    fetchPosts();
    fetchUser();
  }, []);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validImageFiles = [];
    const previews = [];

    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        validImageFiles.push(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result);
          if (previews.length === validImageFiles.length) {
            setImagePreviews(previews);
          }
        };
        reader.readAsDataURL(file);
      } else {
        console.warn("File is not an image:", file.name);
      }
    });

    setSelectedFiles(validImageFiles);
    if (files.length === 0) {
      setImagePreviews([]);
    }
  };

  // Function to remove a selected image
  const handleRemoveImage = (indexToRemove) => {
    const updatedFiles = selectedFiles.filter(
      (_, index) => index !== indexToRemove
    );
    const updatedPreviews = imagePreviews.filter(
      (_, index) => index !== indexToRemove
    );
    setSelectedFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Client-side validation:
    if (selectedFiles.length === 0) {
      setErrorMessage("Please select at least one image file.");
      return;
    }
    if (!caption.trim()) {
      setErrorMessage("Please enter a caption for your post.");
      return;
    }
    const invalidFiles = selectedFiles.filter(
      (file) => !file.type.startsWith("image/")
    );
    if (invalidFiles.length > 0) {
      setErrorMessage("One or more selected files are not valid images.");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(`${API_URL}/posts/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      // Prepend the new post to the feed
      setPosts([response.data, ...posts]);
      setSelectedFiles([]);
      setImagePreviews([]);
      setCaption("");
      setSuccessMessage("Post uploaded successfully!");
      setIsModalOpen(false); // Close modal after successful upload
    } catch (error) {
      console.error("Error uploading post", error);
      setErrorMessage("Error uploading post. Please try again.");
    }
  };

  // Like/Unlike a post
  const handleLike = async (postId) => {
    try {
      // Assumes backend toggles like state and returns updated post data
      const response = await axios.post(
        `${API_URL}/posts/${postId}/like/`,
        {},
        { withCredentials: true }
      );
      const updatedPost = response.data;
      setPosts(posts.map((post) => (post.id === postId ? updatedPost : post)));
    } catch (error) {
      console.error("Error liking post", error);
      setErrorMessage("Error liking post.");
    }
  };

  // Handle comment submission for a specific post
  const handleCommentSubmit = async (event, postId) => {
    event.preventDefault();
    const commentText = commentInputs[postId] || "";
    if (!commentText.trim()) return;
    try {
      const response = await axios.post(
        `${API_URL}/posts/${postId}/comments/`,
        { text: commentText },
        { withCredentials: true }
      );
      const newComment = response.data;
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return { ...post, comments: [...post.comments, newComment] };
          }
          return post;
        })
      );
      // Clear comment input for this post
      setCommentInputs({ ...commentInputs, [postId]: "" });
    } catch (error) {
      console.error("Error adding comment", error);
      setErrorMessage("Error adding comment.");
    }
  };

  // Update comment input for a specific post
  const handleCommentChange = (postId, value) => {
    setCommentInputs({ ...commentInputs, [postId]: value });
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${API_URL}/posts/${postId}/`, {
        withCredentials: true,
      });
      setPosts(posts.filter((post) => post.id !== postId));
      setSuccessMessage("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post", error);
      setErrorMessage("Error deleting post. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-3">
      
      <div
        style={{
          width: "100px",
          position: "relative",
          top: "0px",
          left: "44.5%",
        }}
      >
        <img
          src={cat1}
          alt="Peeking Cat"
          className="img-fluid"
          style={{
            width: "250%",
          }}
        />
      </div>

      {/* Notifications */}
      {errorMessage && (
        <div style={{ color: "red", marginBottom: "15px", fontWeight: "bold" }}>
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div
          style={{ color: "green", marginBottom: "15px", fontWeight: "bold" }}
        >
          {successMessage}
        </div>
      )}

      {/* Create Post Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-full mb-5"
      >
        Create Post
      </button>

      {/* Create Post Modal */}
      {isModalOpen && (
        <div>
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
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
              Create Post
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="files"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
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
                <label
                  htmlFor="caption"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Caption:
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
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
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
                  Cancel
                </button>
              </div>
            </form>
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
                    position: "relative",
                    margin: "5px",
                    width: "100px",
                    height: "100px",
                    overflow: "hidden",
                    borderRadius: "8px",
                    boxShadow: "0 4px 8px rgba(234, 169, 238, 0.5)",
                  }}
                >
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    style={{
                      position: "absolute",
                      top: "2px",
                      right: "2px",
                      background: "rgba(0, 0, 0, 0.6)",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      fontSize: "12px",
                      lineHeight: "20px",
                      textAlign: "center",
                    }}
                    title="Remove image"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="d-flex align-items-center">
        {/* Left empty div for image */}
        <div style={{ width: "200px", backgroundColor: "red" }}>
          <Sidebar/>
        </div>

        {/* Feed */}
        <div>
          <h2 className="text-lg font-bold text-center mb-3">Feed</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading posts...</p>
          ) : (
            <div
              style={{
                padding: "20px",
                alignItems: "center",
                justifyItems: "center",
                backgroundColor: "pink",
                maxWidth: "600px",
              }}
            >
              {posts.length === 0 && (
                <p className="text-center text-gray-500">No posts yet!</p>
              )}
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="p-3 rounded-lg shadow-lg"
                  style={{
                    alignItems: "center",
                    width: "70%",
                    background: "rgb(246, 212, 247)",
                    borderRadius: "12px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    overflow: "hidden",
                    marginBottom: "20px",
                  }}
                >
                  {/* Images */}
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
                        src={image.image}
                        alt={`Post ${post.id}`}
                        style={{
                          width: "400px",
                          height: "300px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    ))}
                  </div>
                  {/* Caption, Username & Timestamp */}
                  <div className="mt-2 text-center">
                    <p className="text-gray-700 text-sm">{post.caption}</p>
                    <p className="text-xs text-gray-500">
                      Posted by {post.user} on {post.created_at}
                    </p>
                    {/* Like Button */}
                    <button
                      onClick={() => handleLike(post.id)}
                      style={{
                        marginTop: "5px",
                        padding: "5px 10px",
                        backgroundColor: post.is_liked ? "#ff5c5c" : "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      title="Like/Unlike"
                    >
                      {post.is_liked ? "Unlike" : "Like"} ({post.likes_count})
                    </button>

                    {/* Comments Section */}
                    <div className="mt-3">
                      {post.comments && post.comments.length > 0 && (
                        <div
                          style={{ textAlign: "left", marginBottom: "10px" }}
                        >
                          {post.comments.map((comment) => (
                            <div
                              key={comment.id}
                              style={{
                                marginBottom: "5px",
                                fontSize: "0.85em",
                              }}
                            >
                              <strong>{comment.user}:</strong> {comment.text}
                              <span
                                style={{
                                  fontSize: "0.7em",
                                  color: "#555",
                                  marginLeft: "5px",
                                }}
                              >
                                ({comment.created_at})
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      <form onSubmit={(e) => handleCommentSubmit(e, post.id)}>
                        <input
                          type="text"
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            handleCommentChange(post.id, e.target.value)
                          }
                          placeholder="Add a comment..."
                          style={{
                            width: "100%",
                            padding: "6px 8px",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            fontSize: "0.9em",
                          }}
                        />
                      </form>
                    </div>
                    {/* Delete button visible only for the post owner */}
                    {currentUser === post.user && (
                      <button
                        onClick={() => handleDelete(post.id)}
                        style={{
                          marginTop: "5px",
                          padding: "5px 10px",
                          backgroundColor: "#e3342f",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Delete Post
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Left empty div for image */}
        <div style={{ width: "200px" }}>Hello</div>
      </div>
    </div>
  );
};

export default Posts;
