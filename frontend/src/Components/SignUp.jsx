import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState(""); // Added email field
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        try {
            const response = await axios.post("http://localhost:8000/api/signup/", {
                username,
                password,
                email, // Send email in the request
            });

            console.log("Signup successful:", response.data);
            setSuccess(true);
            // Optionally redirect or update UI
            window.location.href = "/login"; // Redirect to login page after signup
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.error || "Signup failed";
                setError(errorMessage);
                console.error("Signup failed:", error.response.data);
            } else if (error.request) {
                setError("No response from the server.");
                console.error("No response:", error.request);
            } else {
                setError("An error occurred: " + error.message);
                console.error("Error:", error);
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Submit
                </button>

                {error && <p className="text-danger mt-2">{error}</p>}
                {success && <p className="text-success mt-2">Signup successful!</p>}
            </form>
        </div>
    );
};

export default Signup;