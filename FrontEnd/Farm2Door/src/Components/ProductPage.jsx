// src/Components/ProductPage.jsx
import React, { useEffect, useState } from "react";
import "./ProductPage.css";
import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";

export default function ProductPage() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [inventory, setInventory] = useState("");
    const [origin, setOrigin] = useState("");
    const [unit, setUnit] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const productId = localStorage.getItem("productId");
                if (!productId) {
                    setError("No product selected. Please go back and choose a product.");
                    setLoading(false);
                    return;
                }

                const data = await fetchProductById(productId);
                console.log("Product from backend:", data); // 👈 so you can see real shape

                setName(data.name || data.productName || "");

                setPrice(
                    data.price ??
                    data.unitPrice ??
                    data.productPrice ??
                    ""
                );

                setInventory(
                    data.inventory ??
                    data.stock ??
                    data.quantity ??
                    ""
                );

                // 🔹 Origin & Unit: try a few likely names
                setOrigin(
                    data.origin ||
                    data.originName ||
                    data.source ||
                    ""
                );

                setUnit(
                    data.unit ||
                    data.unitOfMeasure ||
                    data.measurementUnit ||
                    ""
                );

                // 🔹 Category: if it's an object, use name-ish field
                const cat =
                    typeof data.category === "string"
                        ? data.category
                        : data.category?.name ||
                        data.category?.categoryName ||
                        "";

                setCategory(cat);

                setDescription(data.description || "");
            } catch (err) {
                console.error("Failed to load product", err);
                setError(
                    err.response?.data?.message ||
                    "Failed to load product details. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, []);


    return (
        <div className="pp-page">
            {/* Header – same family as other pages */}
            <header className="pp-header">
                <div className="pp-logo">Farm2Door</div>

                <nav className="pp-nav">
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

            <main className="pp-main">
                <div className="pp-card">
                    <div className="pp-card-header">
                        <div>
                            <p className="pp-eyebrow">Product</p>
                            <h1 className="pp-title">Product Details</h1>
                            <p className="pp-subtitle">
                                View your product information as customers will see it.
                            </p>
                        </div>
                    </div>

                    {loading ? (
                        <p className="pp-loading">Loading product...</p>
                    ) : error ? (
                        <p className="pp-error">{error}</p>
                    ) : (
                        <form className="pp-form">
                            {/* NAME – large pill */}
                            <div className="pp-input-group pp-full">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    readOnly
                                    placeholder="Organic Tomato Box"
                                />
                            </div>

                            {/* PRICE + INVENTORY */}
                            <div className="pp-row">
                                <div className="pp-input-group">
                                    <label>Price</label>
                                    <input
                                        type="text"
                                        value={price}
                                        readOnly
                                        placeholder="€4.99"
                                    />
                                </div>

                                <div className="pp-input-group">
                                    <label>Inventory</label>
                                    <input
                                        type="text"
                                        value={inventory}
                                        readOnly
                                        placeholder="120"
                                    />
                                </div>
                            </div>

                            {/* ORIGIN */}
                            <div className="pp-input-group pp-half">
                                <label>Origin</label>
                                <input
                                    type="text"
                                    value={origin}
                                    readOnly
                                    placeholder="Green Valley Farm"
                                />
                            </div>

                            {/* UNIT */}
                            <div className="pp-input-group pp-half">
                                <label>Unit</label>
                                <input
                                    type="text"
                                    value={unit}
                                    readOnly
                                    placeholder="per kg / per box"
                                />
                            </div>

                            {/* CATEGORY */}
                            <div className="pp-input-group pp-full">
                                <label>Category</label>
                                <input
                                    type="text"
                                    value={category}
                                    readOnly
                                    placeholder="Fresh Vegetables"
                                />
                            </div>

                            {/* DESCRIPTION */}
                            <div className="pp-input-group pp-full">
                                <label>Description</label>
                                <textarea
                                    rows="4"
                                    value={description}
                                    readOnly
                                    placeholder="Write a short description of the product..."
                                ></textarea>
                            </div>

                            <div className="pp-actions">
                                <button
                                    type="button"
                                    className="pp-btn pp-btn-outline"
                                    onClick={() => navigate("/shop-management")}
                                >
                                    Back to Shop Management
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </main>
        </div>
    );
}
