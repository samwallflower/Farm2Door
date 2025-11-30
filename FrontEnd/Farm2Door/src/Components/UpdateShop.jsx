// src/Components/UpdateShop.jsx
import React, { useEffect, useState } from "react";
import "./UpdateShop.css";
import { useNavigate } from "react-router-dom";
import { fetchShopByUserId, updateShop, deleteShop } from "../api/client";

export default function UpdateShop() {
    const navigate = useNavigate();

    const [shopId, setShopId] = useState(null);
    const [shopName, setShopName] = useState("");
    const [shopAddress, setShopAddress] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");

    // Load current shop details for logged-in user
    useEffect(() => {
        const loadShop = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    setError("No userId found. Please log in again.");
                    setLoading(false);
                    return;
                }

                const shopData = await fetchShopByUserId(userId);
                if (!shopData) {
                    setError("No shop found for this user. Create one first.");
                    setLoading(false);
                    return;
                }

                setShopId(shopData.id);
                localStorage.setItem("shopId", String(shopData.id));

                // Map backend fields to form fields (adjust names if needed)
                setShopName(shopData.shopName || shopData.name || "");
                setShopAddress(shopData.address || "");
                setContactNumber(shopData.contactNumber || "");
                setContactEmail(shopData.contactEmail || "");
                setDescription(shopData.description || "");
            } catch (err) {
                console.error("Failed to load shop", err);
                setError(
                    err.response?.data?.message ||
                    "Failed to load shop details. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        loadShop();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!shopId) {
            setError("No shop id found. Cannot update shop.");
            return;
        }

        const payload = {
            // adjust keys to match UpdateShopRequest in backend
            name :shopName,
            address: shopAddress,
            contactNumber,
            contactEmail,
            description,
        };

        try {
            setSaving(true);
            await updateShop(shopId, payload);
            navigate("/shop-management");
        } catch (err) {
            console.error("Failed to update shop", err);
            setError(
                err.response?.data?.message ||
                "Failed to update shop. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!shopId) {
            setError("No shop id found. Cannot delete shop.");
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete this shop? This action cannot be undone."
        );
        if (!confirmed) return;

        try {
            setDeleting(true);
            await deleteShop(shopId);
            localStorage.removeItem("shopId");
            navigate("/shop-management");
        } catch (err) {
            console.error("Failed to delete shop", err);
            setError(
                err.response?.data?.message ||
                "Failed to delete shop. Please try again."
            );
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="us-page">
                <header className="us-header">
                    <div className="us-logo">Farm2Door</div>
                    <nav className="us-nav">
                        <button onClick={() => navigate("/home")}>Home</button>
                        <button onClick={() => navigate("/categories")}>Categories</button>
                        <button
                            className="active"
                            onClick={() => navigate("/shop-management")}
                        >
                            Shops
                        </button>
                        <button onClick={() => navigate("/user")}>Account</button>
                    </nav>
                </header>
                <main className="us-main">
                    <div className="us-card">
                        <p>Loading shop details...</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="us-page">
            {/* Header – same family as other pages */}
            <header className="us-header">
                <div className="us-logo">Farm2Door</div>

                <nav className="us-nav">
                    <button onClick={() => navigate("/home")}>Home</button>
                    <button onClick={() => navigate("/categories")}>Categories</button>
                    <button
                        className="active"
                        onClick={() => navigate("/shop-management")}
                    >
                        Shops
                    </button>
                    <button onClick={() => navigate("/user")}>Account</button>
                </nav>
            </header>

            <main className="us-main">
                <div className="us-card">
                    <div className="us-card-header">
                        <div>
                            <p className="us-eyebrow">Shop</p>
                            <h1 className="us-title">Update Shop</h1>
                            <p className="us-subtitle">
                                Edit your shop details so customers always see the correct info.
                            </p>
                        </div>
                    </div>

                    {error && <p className="us-error">{error}</p>}

                    <form className="us-form" onSubmit={handleSubmit}>
                        <div className="us-input-group">
                            <label>Shop Name</label>
                            <input
                                type="text"
                                placeholder="Green Valley Farm Shop"
                                value={shopName}
                                onChange={(e) => setShopName(e.target.value)}
                            />
                        </div>

                        <div className="us-input-group">
                            <label>Shop Address</label>
                            <input
                                type="text"
                                placeholder="123 Farm Lane, Green Valley"
                                value={shopAddress}
                                onChange={(e) => setShopAddress(e.target.value)}
                            />
                        </div>

                        <div className="us-row">
                            <div className="us-input-group">
                                <label>Contact Number</label>
                                <input
                                    type="text"
                                    placeholder="+1 (555) 123-4567"
                                    value={contactNumber}
                                    onChange={(e) => setContactNumber(e.target.value)}
                                />
                            </div>

                            <div className="us-input-group">
                                <label>Contact Email</label>
                                <input
                                    type="email"
                                    placeholder="shop@example.com"
                                    value={contactEmail}
                                    onChange={(e) => setContactEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="us-input-group">
                            <label>Shop Description</label>
                            <textarea
                                rows="4"
                                placeholder="Describe your shop, what you sell, and how you grow or source your products."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="us-actions">
                            <button
                                type="button"
                                className="us-btn us-btn-outline"
                                onClick={() => navigate("/shop-management")}
                                disabled={saving || deleting}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="us-btn us-btn-danger"
                                onClick={handleDelete}
                                disabled={saving || deleting}
                            >
                                {deleting ? "Deleting..." : "Delete Shop"}
                            </button>

                            <button
                                type="submit"
                                className="us-btn us-btn-primary"
                                disabled={saving || deleting}
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
