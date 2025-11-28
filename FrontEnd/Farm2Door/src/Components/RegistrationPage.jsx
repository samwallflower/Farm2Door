import React from "react";
import "./RegistrationPage.css";
import regBg from "./loginback.jpg";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/client";   // ⭐ ADD THIS

const Registration = () => {
    const navigate = useNavigate();

    // ⭐ Store input values
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    // ⭐ Submit form -> Call backend -> Navigate
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await registerUser(firstName, lastName, email, password);
            console.log("User registered:", res);

            navigate("/home"); // go to home after success
        } catch (err) {
            console.error("Registration failed:", err);
            alert("Registration failed. Check the backend log.");
        }
    };

    return (
        <div
            className="reg-page"
            style={{ backgroundImage: `url(${regBg})` }}
        >
            <div className="reg-overlay">
                <div className="reg-content">

                    <header className="reg-header">
                        <p className="reg-always-fresh">Always Fresh</p>
                        <h1 className="reg-logo">Farm2Door</h1>
                        <h2 className="reg-title">Registration</h2>
                    </header>

                    <main className="reg-form-wrapper">
                        <form className="reg-form" onSubmit={handleSubmit}>

                            {/* FIRST NAME */}
                            <label className="reg-input-pill">
                                <span>First Name</span>
                                <input
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </label>

                            {/* LAST NAME */}
                            <label className="reg-input-pill">
                                <span>Last Name</span>
                                <input
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </label>

                            {/* EMAIL */}
                            <label className="reg-input-pill">
                                <span>Email</span>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>

                            {/* PASSWORD */}
                            <label className="reg-input-pill">
                                <span>Password</span>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </label>

                            <button type="submit" className="reg-submit-btn">
                                Sign Up
                            </button>
                        </form>
                    </main>

                </div>
            </div>
        </div>
    );
};

export default Registration;
