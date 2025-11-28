import React, { useState } from "react";
import "./Shopcreation.css";
import { useNavigate } from "react-router-dom";
import { addShop } from "../api/client";

export default function Shopcreation() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        shopName: "",
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

            const payload = {
                shopName: form.shopName,
                address: form.address,
                contactNumber: form.contactNumber,
                contactEmail: form.contactEmail,
                description: form.description,
            };

            await addShop(userId, payload);

            navigate("/shop-management");
        } catch (err) {
            console.error("Failed to create shop", err);
            setError("Failed to create shop. Please try again.");
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
                        {/* SHOP NAME */}
                        <div className="sc-input-group sc-full">
                            <label>Shop name</label>
                            <input
                                type="text"
                                placeholder="Green Valley Farm Shop"
                                value={form.shopName}
                                onChange={handleChange("shopName")}
                                required
                            />
                        </div>

                        {/* ADDRESS */}
                        <div className="sc-input-group sc-full">
                            <label>Shop Address</label>
                            <input
                                type="text"
                                placeholder="123 Farm Lane, Green Valley"
                                value={form.address}
                                onChange={handleChange("address")}
                                required
                            />
                        </div>

                        {/* CONTACT ROW */}
                        <div className="sc-row">
                            <div className="sc-input-group">
                                <label>Contact Number</label>
                                <input
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    value={form.contactNumber}
                                    onChange={handleChange("contactNumber")}
                                    required
                                />
                            </div>

                            <div className="sc-input-group">
                                <label>Contact Email</label>
                                <input
                                    type="email"
                                    placeholder="shop@example.com"
                                    value={form.contactEmail}
                                    onChange={handleChange("contactEmail")}
                                    required
                                />
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="sc-input-group sc-full">
                            <label>Shop description</label>
                            <textarea
                                rows="4"
                                placeholder="Describe what you sell, how you farm, and what makes your shop special..."
                                value={form.description}
                                onChange={handleChange("description")}
                            />
                        </div>

                        {/* ACTIONS */}
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
