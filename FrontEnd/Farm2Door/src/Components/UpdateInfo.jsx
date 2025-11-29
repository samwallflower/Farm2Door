import React, { useState } from "react";
import "./UpdateInfo.css";
import { useNavigate } from "react-router-dom";
import { updateUser } from "../api/client";

const Profile = () => {
    const navigate = useNavigate();

    // state
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    // get user id
    const userId = localStorage.getItem("userId");

    // form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateUser(userId, firstName, lastName);
            console.log("User updated!");
            navigate("/user");
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    return (
        <div className="ui-page">
            <header className="ui-header">
                <div className="ui-logo">Farm2Door</div>

                <nav className="ui-nav">
                    <button onClick={() => navigate("/home")}>Home</button>
                    <button onClick={() => navigate("/categories")}>Categories</button>
                    <button onClick={() => navigate("/shop-management")}>Shops</button>
                    <button onClick={() => navigate("/user")}>Account</button>
                </nav>
            </header>

            <main className="ui-main">
                <div className="ui-card">
                    <div className="ui-card-header">
                        <p className="ui-eyebrow">Account</p>
                        <h1 className="ui-title">Update Info</h1>
                        <p className="ui-subtitle">
                            You can update your first and last name here.
                        </p>
                    </div>

                    <form className="ui-form" onSubmit={handleSubmit}>
                        <div className="ui-input-row">
                            <div className="ui-input-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    placeholder="Jane"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>

                            <div className="ui-input-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    placeholder="Doe"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="ui-actions">
                            <button
                                type="button"
                                className="ui-btn ui-btn-outline"
                                onClick={() => navigate("/user")}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="ui-btn ui-btn-primary"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Profile;
