// src/Components/Shopcreation.jsx
import React, { useState } from "react";
import "./Shopcreation.css";
import { useNavigate } from "react-router-dom";
import { addShop } from "../api/client";

export default function Shopcreation() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",            // 👈 use "name" here
        address: "",
        contactNumber: "",
        contactEmail: "",
        description: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const userId = localStorage.getItem("userId");
            if (!userId) {
                setError("No userId found. Please log in again.");
                return;
            }

            setLoading(true);

            // 👇 matches AddShopRequest exactly
            const payload = {
                name: form.name,
                address: form.address,
                contactNumber: form.contactNumber,
                contactEmail: form.contactEmail,
                description: form.description,
            };

            await addShop(userId, payload); // JWT is added by interceptor

            navigate("/shop-management");
        } catch (err) {
            console.error("Failed to create shop", err);
            const backendMessage =
                err.response?.data?.message ||
                "Failed to create shop. Please try again.";
            setError(backendMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sc-page">
            <main className="sc-main">
                <div className="sc-card">
                    <div className="sc-card-header">
                        <div>
                            <p className="sc-eyebrow">Shop</p>
                            <h1 className="sc-title">Shop Creation</h1>
                            <p className="sc-subtitle">
                                Set up your Farm2Door shop so you can start adding products and
                                receiving orders.
                            </p>
                        </div>
                    </div>

                    {error && <div className="sc-error">{error}</div>}

                    <form className="sc-form" onSubmit={handleSubmit}>
                        <div className="sc-input-group sc-full">
                            <label>Shop name</label>
                            <input
                                type="text"
                                placeholder="Green Farm"
                                value={form.name}
                                onChange={handleChange("name")}
                                required
                            />
                        </div>

                        <div className="sc-input-group sc-full">
                            <label>Shop Address</label>
                            <input
                                type="text"
                                placeholder="Kassai ut 28"
                                value={form.address}
                                onChange={handleChange("address")}
                                required
                            />
                        </div>

                        <div className="sc-row">
                            <div className="sc-input-group">
                                <label>Contact Number</label>
                                <input
                                    type="tel"
                                    placeholder="+3612345678"
                                    value={form.contactNumber}
                                    onChange={handleChange("contactNumber")}
                                    required
                                />
                            </div>

                            <div className="sc-input-group">
                                <label>Contact Email</label>
                                <input
                                    type="email"
                                    placeholder="greenfarm@gmail.com"
                                    value={form.contactEmail}
                                    onChange={handleChange("contactEmail")}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sc-input-group sc-full">
                            <label>Description</label>
                            <textarea
                                rows="4"
                                placeholder="demo description"
                                value={form.description}
                                onChange={handleChange("description")}
                            />
                        </div>

                        <div className="sc-actions">
                            <button
                                type="button"
                                className="sc-btn sc-btn-outline"
                                onClick={() => navigate("/shop-management")}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="sc-btn sc-btn-primary"
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Create Shop"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
