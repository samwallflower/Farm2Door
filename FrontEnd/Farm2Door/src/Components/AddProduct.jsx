// src/Components/AddProduct.jsx
import React, { useState } from "react";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";
import { addProductToShop, uploadProductImages } from "../api/client";

export default function AddProduct() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        price: "",
        inventory: "",
        origin: "",
        unit: "",
        category: "",
        description: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]); // ⬅️ NEW
    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files || []);
        setImages(files);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const shopId = localStorage.getItem("shopId");
        if (!shopId) {
            setError("No shop selected. Please open Shop Management first.");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                name: form.name,
                price: parseFloat(form.price || "0"),
                inventory: parseInt(form.inventory || "0", 10),
                origin: form.origin,
                unit: form.unit,
                category: form.category,
                description: form.description,
            };

            // 1) Create product
            const created = await addProductToShop(shopId, payload);

            // Try to get the product id from the response
            const productId = created?.id ?? created?.productId;

            // 2) Upload images if we have files and an id
            if (productId && images.length > 0) {
                try {
                    await uploadProductImages(productId, images);
                } catch (uploadErr) {
                    console.error("Failed to upload product images", uploadErr);
                    // Optional: set a non-blocking warning
                    // setError((prev) => prev || "Product saved, but image upload failed.");
                }
            }

            // On success, go back to Shop Management
            navigate("/shop-management");
        } catch (err) {
            console.error("Failed to add product", err);
            setError(
                err.response?.data?.message ||
                "Failed to add product. Please check your data and try again."
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="ap-page">
            {/* Header – same family as other pages */}
            <header className="ap-header">
                <div className="ap-logo">Farm2Door</div>

                <nav className="ap-nav">
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

            <CartIcon />

            <main className="ap-main">
                <div className="ap-card">
                    <div className="ap-card-header">
                        <div>
                            <p className="ap-eyebrow">Product</p>
                            <h1 className="ap-title">Add Product</h1>
                            <p className="ap-subtitle">
                                Create a new product listing for your shop.
                            </p>
                        </div>
                    </div>

                    {error && <div className="ap-error">{error}</div>}

                    <form className="ap-form" onSubmit={handleSubmit}>
                        {/* IMAGES */}
                        <div className="ap-input-group ap-full">
                            <label>Product Images</label>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                            />
                            <small className="ap-help-text">
                                You can select multiple images. The first one will be used as the main image.
                            </small>
                        </div>

                        {/* NAME */}
                        <div className="ap-input-group ap-full">
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Organic Tomato Box"
                                value={form.name}
                                onChange={handleChange("name")}
                                required
                            />
                        </div>

                        {/* PRICE + INVENTORY */}
                        <div className="ap-row">
                            <div className="ap-input-group">
                                <label>Price</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    placeholder="4.99"
                                    value={form.price}
                                    onChange={handleChange("price")}
                                    required
                                />
                            </div>

                            <div className="ap-input-group">
                                <label>Inventory</label>
                                <input
                                    type="number"
                                    placeholder="120"
                                    value={form.inventory}
                                    onChange={handleChange("inventory")}
                                    required
                                />
                            </div>
                        </div>

                        {/* ORIGIN + UNIT */}
                        <div className="ap-row">
                            <div className="ap-input-group">
                                <label>Origin</label>
                                <input
                                    type="text"
                                    placeholder="Green Valley Farm"
                                    value={form.origin}
                                    onChange={handleChange("origin")}
                                />
                            </div>

                            <div className="ap-input-group">
                                <label>Unit</label>
                                <input
                                    type="text"
                                    placeholder="per kg / per box"
                                    value={form.unit}
                                    onChange={handleChange("unit")}
                                />
                            </div>
                        </div>

                        {/* CATEGORY */}
                        <div className="ap-input-group ap-full">
                            <label>Category</label>
                            <input
                                type="text"
                                placeholder="Fresh Vegetables"
                                value={form.category}
                                onChange={handleChange("category")}
                            />
                        </div>

                        {/* DESCRIPTION */}
                        <div className="ap-input-group ap-full">
                            <label>Description</label>
                            <textarea
                                rows="4"
                                placeholder="Write a short description of the product..."
                                value={form.description}
                                onChange={handleChange("description")}
                            ></textarea>
                        </div>

                        <div className="ap-actions">
                            <button
                                type="button"
                                className="ap-btn ap-btn-outline"
                                onClick={() => navigate("/shop-management")}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="ap-btn ap-btn-primary"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Product"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
