import { useState, useEffect } from "react";
import axios from "axios";
import cat1 from "/peakingLogo.png";
import like from "/likeemo1.png";
import unlike from "/likeemo2.png";

const API_URL = "http://localhost:8000/api";

// Updated default profile picture URLs
const defaultProfilePic = "https://via.placeholder.com/30";
const defaultCommentPic = "https://via.placeholder.com/20";

const Adoption = () => {
  // State for new adoption post fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Only one image per adoption post is allowed
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Posts and user state
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Notifications and loading state
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal for creating a new adoption post
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentInputs, setCommentInputs] = useState({});

  const token = localStorage.getItem("token");
  const authHeaders = token ? { Authorization: `Token ${token}` } : {};

  // Clear notifications automatically
  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  // Fetch adoption posts and user info on mount
  useEffect(() => {
    const fetchAdoptionPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/adoption/`, {
          headers: authHeaders,
        });
        const fetchedPosts = Array.isArray(response.data)
          ? response.data
          : response.data.results;
        setPosts(fetchedPosts);
        console.log("Fetched adoption posts:", fetchedPosts);
      } catch (err) {
        console.error("Error fetching adoption posts:", err);
        setErrorMessage("Failed to load adoption posts.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserInfo = async () => {
      if (token) {
        try {
          const res = await axios.get(`${API_URL}/user/`, {
            headers: authHeaders,
          });
          setCurrentUser(res.data.username);
          setIsAdmin(res.data.is_admin);
        } catch (error) {
          console.error("Error fetching user info", error);
          if (error.response && error.response.status !== 401) {
            setErrorMessage("Error fetching user info.");
          }
          setCurrentUser(null);
          setIsAdmin(false);
        }
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
    };

    fetchAdoptionPosts();
    fetchUserInfo();
  }, [token]);

  // Helper to format date/time strings
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    try {
      const date = new Date(dateTimeString);
      return date.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateTimeString;
    }
  };

  // Handle file change for a single image
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImagePreview(null);
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  // Create a new adoption post (admin only)
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!isAdmin) {
      setErrorMessage("Only administrators can create posts.");
      return;
    }
    if (!title.trim() || !description.trim()) {
      setErrorMessage("Please enter both a title and a description.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const response = await axios.post(`${API_URL}/adoption/`, formData, {
        headers: { ...authHeaders, "Content-Type": "multipart/form-data" },
      });
      const newPost = response.data;
      // Prepend the new post so the feed updates immediately
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      // Clear form fields
      setTitle("");
      setDescription("");
      setSelectedFile(null);
      setImagePreview(null);
      setSuccessMessage("Adoption post uploaded successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error uploading adoption post", error);
      const errorMsg =
        error.response?.data?.detail ||
        "Error uploading adoption post. Please try again.";
      setErrorMessage(errorMsg);
    }
  };

  // Like/Unlike an adoption post
  const handleLike = async (postId) => {
    if (!token) {
      setErrorMessage("Please log in to like posts.");
      return;
    }
    try {
      const response = await axios.post(
        `${API_URL}/adoption/${postId}/like/`,
        {},
        { headers: authHeaders }
      );
      const updatedPost = response.data;
      setPosts(posts.map((post) => (post.id === postId ? updatedPost : post)));
    } catch (error) {
      console.error("Error liking post", error);
      const errorMsg = error.response?.data?.detail || "Error liking post.";
      setErrorMessage(errorMsg);
    }
  };

  // Submit a comment for an adoption post and update the post state with the new comment
  const handleCommentSubmit = async (event, postId) => {
    event.preventDefault();
    if (!token) {
      setErrorMessage("Please log in to comment.");
      return;
    }
    const commentText = commentInputs[postId] || "";
    if (!commentText.trim()) return;
    try {
      const response = await axios.post(
        `${API_URL}/adoption/${postId}/comments/`,
        { text: commentText },
        { headers: authHeaders }
      );
      // Assume response.data returns the new comment object with a unique id.
      const newComment = response.data;
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...(post.comments || []), newComment] }
            : post
        )
      );
      setCommentInputs({ ...commentInputs, [postId]: "" });
    } catch (error) {
      console.error("Error adding comment", error);
      const errorMsg = error.response?.data?.detail || "Error adding comment.";
      setErrorMessage(errorMsg);
    }
  };

  // Update comment input for a given post
  const handleCommentChange = (postId, value) => {
    setCommentInputs({ ...commentInputs, [postId]: value });
  };

  // Delete an adoption post (admin or owner)
  const handleDelete = async (postId) => {
    const postToDelete = posts.find((post) => post.id === postId);
    if (
      !postToDelete ||
      !(
        isAdmin ||
        (postToDelete.admin && postToDelete.admin.username === currentUser)
      )
    ) {
      setErrorMessage("You do not have permission to delete this post.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this adoption post?"))
      return;
    try {
      await axios.delete(`${API_URL}/adoption/${postId}/`, {
        headers: authHeaders,
      });
      setPosts(posts.filter((post) => post.id !== postId));
      setSuccessMessage("Adoption post deleted successfully!");
    } catch (error) {
      console.error("Error deleting adoption post", error);
      const errorMsg =
        error.response?.data?.detail ||
        "Error deleting adoption post. Please try again.";
      setErrorMessage(errorMsg);
    }
  };

  // Delete a comment on an adoption post (only by comment owner or admin)
  const handleDeleteComment = async (postId, commentId) => {
    const post = posts.find((p) => p.id === postId);
    const comment = post?.comments?.find((c, index) => c.id || index); // fallback key if id is not available
    if (
      !comment ||
      !(isAdmin || (comment.user && comment.user.username === currentUser))
    ) {
      setErrorMessage("You do not have permission to delete this comment.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this comment?"))
      return;
    try {
      await axios.delete(
        `${API_URL}/adoption/${postId}/comments/${commentId}/`,
        { headers: authHeaders }
      );
      setPosts(
        posts.map((p) =>
          p.id === postId
            ? { ...p, comments: p.comments.filter((c) => c.id !== commentId) }
            : p
        )
      );
      setSuccessMessage("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment", error);
      const errorMsg =
        error.response?.data?.detail || "Error deleting comment.";
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-10">
      <br />
      <div
        className="self-center"
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

      {errorMessage && (
        <div className="w-full max-w-xl p-3 mb-4 text-center font-bold text-red-700 bg-red-100 border border-red-400 rounded">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="w-full max-w-xl p-3 mb-4 text-center font-bold text-green-700 bg-green-100 border border-green-400 rounded">
          {successMessage}
        </div>
      )}

      {isAdmin && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-full mb-5"
        >
          Create Adoption Post
        </button>
      )}

      {/* Create Adoption Post Modal */}
      {isModalOpen && isAdmin && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
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
            <h2 className="text-xl font-semibold text-center mb-5">
              Create Adoption Post
            </h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Title Input */}
              <div className="mb-4">
                <label
                  htmlFor="title"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Title:
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title..."
                  style={{
                    padding: "8px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    width: "100%",
                    boxSizing: "border-box",
                    background: "#eaa9ee",
                    color: "black",
                  }}
                />
              </div>

              {/* Description Input */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="description"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description..."
                  rows="4"
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

              {/* File Input (Single Image) */}
              <div style={{ marginBottom: "15px" }}>
                <label
                  htmlFor="file"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    fontWeight: "bold",
                  }}
                >
                  Upload Image:
                </label>
                <input
                  id="file"
                  type="file"
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

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
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
            {/* Image Preview */}
            {imagePreview && (
              <div 
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
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  style={{
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                    background: "rgba(192, 116, 116, 0.6)",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "10px",
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
            )}
          </div>
        </div>
      )}

      {/* Feed Section */}
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Adoption Center
        </h2>
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
            {posts.length === 0 && !loading && (
              <p className="text-center text-gray-500">No posts yet!</p>
            )}
            {Array.isArray(posts) &&
              posts.map((post) => (
                <div
                  key={post.id}
                  className="p-4 rounded-xl shadow-lg overflow-hidden mb-6 mx-auto"
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
                  {/* Post Image */}
                  <div
                    style={{
                      display: "flex",
                      overflowX: "auto",
                      gap: "5px",
                      width: "100%",
                      paddingBottom: "5px",
                    }}
                  >
                  {post.image && (
                    
                      <img
                        src={post.image}
                        alt={`Adoption post ${post.id}`}
                        style={{
                          width: "400px",
                          height: "300px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                  )}
</div>
                  {/* Post Content */}
                  <div className="text-center mt-2">
                    <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                    <p className="text-bold-700 text-sm">{post.description}</p>

                    {/* Posted by */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                      <img
                        src={
                          post.admin && post.admin.profile_picture
                            ? post.admin.profile_picture
                            : defaultProfilePic
                        }
                        alt={`${
                          post.admin && post.admin.username
                            ? post.admin.username
                            : "User"
                        }'s profile`}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          marginRight: "5px",
                        }}
                      />
                      <p className="text-xs text-gray-600">
                        Posted by{" "}
                        
                          {post.admin && post.admin.username
                            ? post.admin.username
                            : "Unknown User"}
                        {" "}
                        on {formatDateTime(post.created_at)}
                      </p>
                    </div>

                    {/* Like and Delete Buttons */}
                    <div className="flex items-center space-x-2 mb-4">
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
                          <img src={like} alt="Unlike" width= "40px" />
                        ) : (
                          <img src={unlike} alt="Like" width  = "40px" />
                        )}
                        <span className="text-xs font-medium">
                          ({post.likes_count})
                        </span>
                      </button>

                      {(isAdmin ||
                        (post.admin &&
                          post.admin.username === currentUser)) && (
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="ml-auto px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-xs font-medium"
                          title="Delete Post"
                        >
                          Delete
                        </button>
                      )}
                    </div>

                    {/* Comments Section */}
                    <div className="mt-3">
                      {post.comments && post.comments.length > 0 && (
                        <div className="text-left mb-3 space-y-2">
                          {post.comments.map((comment, index) => (
                            <div
                              key={comment.id || index}
                              style={{
                                marginBottom: "5px",
                                fontSize: "0.85em",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <div className="flex items-center space-x-2">
                                <img
                                  src={
                                    comment.user && comment.user.profile_picture
                                      ? comment.user.profile_picture
                                      : defaultCommentPic
                                  }
                                  alt={`${
                                    comment.user && comment.user.username
                                      ? comment.user.username
                                      : "User"
                                  }'s profile`}
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    marginRight: "5px",
                                  }}
                                />
                                <span>
                                  <strong className="font-semibold text-gray-800">
                                    {comment.user && comment.user.username
                                      ? comment.user.username
                                      : "Unknown User"}
                                    :
                                  </strong>{" "}
                                  <span className="text-gray-700">
                                    {comment.text}
                                  </span>
                                  <span
                                  style={{
                                    fontSize: "0.7em",
                                    color: "#555",
                                    marginLeft: "5px",
                                  }} 
                                  >
                                    ({formatDateTime(comment.created_at)})
                                  </span>
                                </span>
                              </div>
                              {(isAdmin ||
                                (comment.user &&
                                  comment.user.username === currentUser)) && (
                                <button
                                  onClick={() =>
                                    handleDeleteComment(post.id, comment.id)
                                  }
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
                      {token ? (
                        <form
                          onSubmit={(e) => handleCommentSubmit(e, post.id)}
                          className="flex items-center space-x-2"
                        >
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
                          <br />
                          <button
                            type="submit"
                            className="px-3 py-1.5 bg-pink-500 text-white rounded-full text-sm hover:bg-pink-600 transition focus:outline-none focus:ring-1 focus:ring-pink-600"
                          >
                            Post
                          </button>
                        </form>
                      ) : (
                        <p className="text-xs text-gray-500 text-center mt-2">
                          Please log in to add a comment.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Adoption;
