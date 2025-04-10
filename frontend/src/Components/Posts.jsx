import { useState, useEffect } from "react";
import axios from "axios"; // Using the token-enabled axios instance
import cat1 from "/peakingLogo.png";
import like from "/likeemo1.png";
import unlike from "/likeemo2.png";

const API_URL = "http://localhost:8000/api";

// Default profile picture URLs for post authors and comment authors
const defaultProfilePic = "https://via.placeholder.com/30?text=PF";
const defaultCommentPic = "https://via.placeholder.com/20?text=PF";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [caption, setCaption] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});

  const token = localStorage.getItem("token");
  const authHeaders = token ? { Authorization: `Token ${token}` } : {};

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/posts/`, { headers: authHeaders });
        console.log("Fetched posts:", response.data.results);
        setPosts(response.data.results);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setErrorMessage("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/`, {
          headers: authHeaders,
        });
        // Assuming res.data contains a user object. Adjust if necessary.
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
      }
    });

    setSelectedFiles(validImageFiles);
    if (files.length === 0) {
      setImagePreviews([]);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedFiles = selectedFiles.filter((_, index) => index !== indexToRemove);
    const updatedPreviews = imagePreviews.filter((_, index) => index !== indexToRemove);
    setSelectedFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (selectedFiles.length === 0) {
      setErrorMessage("Please select at least one image file.");
      return;
    }
    if (!caption.trim()) {
      setErrorMessage("Please enter a caption for your post.");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await axios.post(`${API_URL}/posts/`, formData, {
        headers: { ...authHeaders, "Content-Type": "multipart/form-data" },
      });
      setPosts([response.data, ...posts]);
      setSelectedFiles([]);
      setImagePreviews([]);
      setCaption("");
      setSuccessMessage("Post uploaded successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error uploading post", error);
      setErrorMessage("Error uploading post. Please try again.");
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await axios.post(
        `${API_URL}/posts/${postId}/like/`,
        {},
        { headers: authHeaders }
      );
      const updatedPost = response.data;
      setPosts(posts.map((post) => (post.id === postId ? updatedPost : post)));
    } catch (error) {
      console.error("Error liking post", error);
      setErrorMessage("Error liking post.");
    }
  };

  const handleCommentSubmit = async (event, postId) => {
    event.preventDefault();
    const commentText = commentInputs[postId] || "";
    if (!commentText.trim()) return;
    try {
      const response = await axios.post(
        `${API_URL}/posts/${postId}/comments/`,
        { text: commentText },
        { headers: authHeaders }
      );
      const newComment = response.data;
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
      setCommentInputs({ ...commentInputs, [postId]: "" });
    } catch (error) {
      console.error("Error adding comment", error);
      setErrorMessage("Error adding comment.");
    }
  };

  const handleCommentChange = (postId, value) => {
    setCommentInputs({ ...commentInputs, [postId]: value });
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`${API_URL}/posts/${postId}/`, {
        headers: authHeaders,
      });
      setPosts(posts.filter((post) => post.id !== postId));
      setSuccessMessage("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post", error);
      setErrorMessage("Error deleting post. Please try again.");
    }
  };

  const handleDeleteComment = async (postId, commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await axios.delete(`${API_URL}/posts/${postId}/comments/${commentId}/`, {
        headers: authHeaders,
      });
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? { ...post, comments: post.comments.filter((comment) => comment.id !== commentId) }
            : post
        )
      );
      setSuccessMessage("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment", error);
      setErrorMessage("Error deleting comment.");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-10">
      <br />
      <br />
      <br />
      <div
        style={{
          width: "100px",
          position: "relative",
          top: "0px",
          left: "41%",
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
        <div style={{ color: "green", marginBottom: "15px", fontWeight: "bold" }}>
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
       
        {/* Feed */}
        <div>
          <h2 className="text-lg font-bold text-center mb-3">Feed</h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading posts...</p>
          ) : (
            <div
              style={{
                padding: "50px",
                alignItems: "center",
                justifyItems: "center",
                backgroundColor: "pink",
                maxWidth: "800px",
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
                    width: "100%",
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
                  {/* Caption, Username, Profile Picture & Timestamp */}
                  <div className="mt-2 text-center">
                    <p className="text-bold-700 text-sm">{post.caption}</p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img
                        src={(post.user && post.user.profile_picture) || defaultProfilePic}
                        alt="Profile"
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          marginRight: "5px",
                        }}
                      />
                      <p className="text-xs text-gray-500">
                        Posted by {post.user && post.user.username} on {post.created_at}
                      </p>
                    </div>
                    {/* Like Button */}
                    <button
                      onClick={() => handleLike(post.id)}
                      style={{
                        marginTop: "5px",
                        padding: "5px 10px",
                        backgroundColor: post.is_liked ? "#f6d4f7" : "#f6d4f7",
                        color: "black",
                        cursor: "pointer",
                      }}
                      title="Like/Unlike"
                    >
                      {post.is_liked ? (
                        <img src={like} alt="Unlike" width="40px" />
                      ) : (
                        <img src={unlike} alt="Like" width="40px" />
                      )}{" "}
                      ({post.likes_count})
                    </button>

                    {/* Comments Section */}
                    <div className="mt-3">
                      {post.comments && post.comments.length > 0 && (
                        <div style={{ textAlign: "left", marginBottom: "10px" }}>
                          {post.comments.map((comment) => (
                            <div
                              key={comment.id}
                              style={{
                                marginBottom: "5px",
                                fontSize: "0.85em",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center" }}>
                                <img
                                  src={(comment.user && comment.user.profile_picture) || defaultCommentPic}
                                  alt="Comment profile"
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    marginRight: "5px",
                                  }}
                                />
                                <span>
                                  <strong>{comment.user && comment.user.username}:</strong> {comment.text}{" "}
                                  <span
                                    style={{
                                      fontSize: "0.7em",
                                      color: "#555",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    ({comment.created_at})
                                  </span>
                                </span>
                              </div>
                              {comment.user && comment.user.username === currentUser && (
                                <button
                                  onClick={() => handleDeleteComment(post.id, comment.id)}
                                  style={{
                                    marginLeft: "10px",
                                    backgroundColor: "#e3342f",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    padding: "2px 6px",
                                    fontSize: "0.75em",
                                  }}
                                  title="Delete comment"
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      <form onSubmit={(e) => handleCommentSubmit(e, post.id)}>
                        <input
                          type="text"
                          value={commentInputs[post.id] || ""}
                          onChange={(e) => handleCommentChange(post.id, e.target.value)}
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
                    {post.user && post.user.username === currentUser && (
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
      </div>
    </div>
  );
};

export default Posts;
