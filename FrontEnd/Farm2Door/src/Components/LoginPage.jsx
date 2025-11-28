import React, { useState } from "react";
import "./LoginPage.css";
import bgImage from "./loginback.jpg";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/client"; // ⬅️ adjust path if needed

const LoginPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        try {
            setLoading(true);

            // 🔐 calls backend with exact JSON { "email": "...", "password": "..." }
            const apiResponse = await loginUser(email, password);

            const jwtData = apiResponse.data || {};
            const token = jwtData.token;
            const userId = jwtData.id;

            if (!token) {
                throw new Error("No token returned from backend");
            }

            localStorage.setItem("authToken", token);
            if (userId != null) localStorage.setItem("userId", String(userId));

            navigate("/home");
        } catch (err) {
            console.error("Login failed", err);
            setError(
                err.response?.data?.message ||
                "Invalid email or password. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };


    const handleRegisterClick = () => {
        navigate("/register");
    };

    return (
        <div
            className="login-page"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            <div className="login-overlay">
                <div className="login-content">
                    <header className="login-header">
                        <p className="login-always-fresh">Always Fresh</p>
                        <h1 className="login-logo">Farm2Door</h1>
                        <h2 className="login-title">Login</h2>
                    </header>

                    <main className="login-form-wrapper">
                        <form className="login-form" onSubmit={handleSubmit}>
                            {error && <div className="login-error">{error}</div>}

                            <label className="login-input-pill">
                                <span>Email</span>
                                <input
                                    type="email"
                                    placeholder="email@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>

                            <label className="login-input-pill">
                                <span>Password</span>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>

                            <div className="login-actions">
                                <button
                                    type="submit"
                                    className="login-submit-btn"
                                    disabled={loading}
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>

                                <button
                                    type="button"
                                    className="login-register-btn"
                                    onClick={handleRegisterClick}
                                    disabled={loading}
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
