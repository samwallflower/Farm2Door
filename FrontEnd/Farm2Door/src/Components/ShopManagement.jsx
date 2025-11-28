import React, { useEffect, useState } from "react";
import "./ShopManagement.css";
import sampleProduct from "./Product.jpg";
import { useNavigate } from "react-router-dom";
import { fetchShopByUserId } from "../api/client"; // ⬅️ only this now

export default function ShopManagement() {
    const navigate = useNavigate();

    const [shop, setShop] = useState(null);
    const [loadingShop, setLoadingShop] = useState(true);
    const [error, setError] = useState("");

    // 🔹 Load the current user's shop (if any)
    useEffect(() => {
        const loadShop = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    setError("No userId found. Please log in again.");
                    setLoadingShop(false);
                    return;
                }

                const shopData = await fetchShopByUserId(userId);
                setShop(shopData || null);
            } catch (e) {
                console.error("Failed to load shop for user", e);
                // If backend returns 404 (no shop yet), that's okay – user can create one
                setShop(null);
            } finally {
                setLoadingShop(false);
            }
        };

        loadShop();
    }, []);

    return (
        <div className="sm-page">
            {/* Header / Nav */}
            <header className="sm-header">
                <div className="sm-logo">Farm2Door</div>

                <nav className="sm-nav">
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

            <main className="sm-main">
                {/* Title row */}
                <div className="sm-page-head">
                    <div>
                        <h1 className="sm-page-title">Shop Management</h1>
                        <p className="sm-page-subtitle">
                            Manage your products, inventory, and incoming orders.
                        </p>
                        {error && <p className="sm-error">{error}</p>}
                    </div>

                    <div className="sm-shop-badge">
            <span className="sm-shop-label">
              {loadingShop ? "Loading shop..." : "Current shop"}
            </span>
                        <span className="sm-shop-name">
              {shop?.shopName || "No shop created yet"}
            </span>
                    </div>
                </div>

                {/* Two-column layout: Products + Pending Orders */}
                <div className="sm-grid">
                    {/* PRODUCTS COLUMN (still using sample products for now) */}
                    <section className="sm-card sm-products">
                        <div className="sm-card-header">
                            <h2>Products</h2>
                            <button
                                className="sm-btn sm-btn-primary"
                                onClick={() => navigate("/add-product")}
                                disabled={!shop}
                            >
                                + Add Product
                            </button>
                        </div>

                        <div className="sm-product-list">
                            <article className="sm-product-row">
                                <div className="sm-product-thumb">
                                    <img src={sampleProduct} alt="product" />
                                </div>
                                <div className="sm-product-info">
                                    <h3>Farm Fresh Veggie Box</h3>
                                    <p className="sm-product-meta">€24.99 · In stock: 18</p>
                                </div>
                                <div className="sm-product-actions">
                                    <button
                                        className="sm-btn sm-btn-outline sm-btn-small"
                                        onClick={() => navigate("/update-product")}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="sm-btn sm-btn-outline sm-btn-small"
                                        onClick={() => navigate("/product")}
                                    >
                                        View
                                    </button>
                                </div>
                            </article>

                            <article className="sm-product-row">
                                <div className="sm-product-thumb">
                                    <img src={sampleProduct} alt="product" />
                                </div>
                                <div className="sm-product-info">
                                    <h3>Seasonal Fruit Crate</h3>
                                    <p className="sm-product-meta">€19.99 · In stock: 12</p>
                                </div>
                                <div className="sm-product-actions">
                                    <button
                                        className="sm-btn sm-btn-outline sm-btn-small"
                                        onClick={() => navigate("/update-product")}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="sm-btn sm-btn-outline sm-btn-small"
                                        onClick={() => navigate("/product")}
                                    >
                                        View
                                    </button>
                                </div>
                            </article>
                        </div>

                        <button
                            className="sm-btn sm-btn-outline sm-full-width"
                            onClick={() => navigate("/product")}
                        >
                            View All Products
                        </button>
                    </section>

                    {/* PENDING ORDERS COLUMN */}
                    <section className="sm-card sm-orders">
                        <div className="sm-card-header">
                            <h2>Pending Orders</h2>
                            <button
                                className="sm-btn sm-btn-outline sm-btn-small"
                                onClick={() => navigate("/orders")}
                            >
                                View All
                            </button>
                        </div>

                        <div className="sm-order-list">
                            <article className="sm-order-row">
                                <div>
                                    <h3>Order #12345</h3>
                                    <p className="sm-order-meta">
                                        Farm Fresh Veggie Box · Qty: 2 · €49.98
                                    </p>
                                </div>
                                <button className="sm-chip sm-chip-pending">Pending</button>
                            </article>

                            <article className="sm-order-row">
                                <div>
                                    <h3>Order #12344</h3>
                                    <p className="sm-order-meta">
                                        Seasonal Fruit Crate · Qty: 1 · €19.99
                                    </p>
                                </div>
                                <button className="sm-chip sm-chip-pending">Pending</button>
                            </article>
                        </div>

                        {/* existing update shop button */}
                        <button
                            className="sm-btn sm-btn-primary sm-full-width"
                            onClick={() => navigate("/update-shop")}
                            disabled={!shop}
                        >
                            Update Shop Details
                        </button>

                        {/* ✅ NEW: go to Shopcreation page instead of inline API */}
                        <button
                            className="sm-btn sm-btn-outline sm-full-width"
                            onClick={() => navigate("/shop-creation")}
                        >
                            Create Shop
                        </button>
                    </section>
                </div>
            </main>
        </div>
    );
}
