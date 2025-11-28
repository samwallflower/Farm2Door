// src/Components/ShopManagement.jsx
import React, { useEffect, useState } from "react";
import "./ShopManagement.css";
import sampleProduct from "./Product.jpg";
import { useNavigate } from "react-router-dom";
import {
    fetchShopByUserId,
    fetchProductsForShop,
    fetchOrdersForShop,
} from "../api/client";

export default function ShopManagement() {
    const navigate = useNavigate();

    const [shop, setShop] = useState(null);
    const [loadingShop, setLoadingShop] = useState(true);
    const [error, setError] = useState("");

    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);

    // 🔹 Load shop for current user
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

                if (shopData?.id != null) {
                    localStorage.setItem("shopId", String(shopData.id));
                }
            } catch (e) {
                console.error("Failed to load shop for user", e);
                setShop(null);
            } finally {
                setLoadingShop(false);
            }
        };

        loadShop();
    }, []);

    // 🔹 Once we know the shopId, load products + orders
    useEffect(() => {
        if (!shop?.id) return;
        const shopId = shop.id;

        const loadProducts = async () => {
            try {
                setLoadingProducts(true);
                const list = await fetchProductsForShop(shopId);
                setProducts(Array.isArray(list) ? list : []);
            } catch (e) {
                console.error("Failed to load products for shop", e);
                setProducts([]);
            } finally {
                setLoadingProducts(false);
            }
        };

        const loadOrders = async () => {
            try {
                setLoadingOrders(true);
                const list = await fetchOrdersForShop(shopId);
                setOrders(Array.isArray(list) ? list : []);
            } catch (e) {
                console.error("Failed to load orders for shop", e);
                setOrders([]);
            } finally {
                setLoadingOrders(false);
            }
        };

        loadProducts();
        loadOrders();
    }, [shop?.id]);

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
              {shop?.shopName || shop?.name || "No shop created yet"}
            </span>
                    </div>
                </div>

                {/* Two-column layout: Products + Pending Orders */}
                <div className="sm-grid">
                    {/* PRODUCTS COLUMN */}
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
                            {loadingProducts ? (
                                <p>Loading products...</p>
                            ) : products.length === 0 ? (
                                <p>No products yet. Use &quot;Add Product&quot; to create one.</p>
                            ) : (
                                products.map((product) => {
                                    const name = product.name || product.productName;
                                    const price =
                                        product.price ??
                                        product.unitPrice ??
                                        product.productPrice;
                                    const stock =
                                        product.inventory ??
                                        product.stock ??
                                        product.quantity ??
                                        0;

                                    return (
                                        <article
                                            className="sm-product-row"
                                            key={product.id || name}
                                        >
                                            <div className="sm-product-thumb">
                                                {/* TODO: use real image url when available */}
                                                <img src={sampleProduct} alt={name} />
                                            </div>
                                            <div className="sm-product-info">
                                                <h3>{name}</h3>
                                                <p className="sm-product-meta">
                                                    €{price} · In stock: {stock}
                                                </p>
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
                                    );
                                })
                            )}
                        </div>
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
                            {loadingOrders ? (
                                <p>Loading orders...</p>
                            ) : orders.length === 0 ? (
                                <p>No pending orders for this shop yet.</p>
                            ) : (
                                orders.map((order) => {
                                    const id = order.id;
                                    const status = order.status || order.orderStatus || "Pending";
                                    const total =
                                        order.totalAmount ??
                                        order.totalPrice ??
                                        order.total ??
                                        null;

                                    return (
                                        <article className="sm-order-row" key={id}>
                                            <div>
                                                <h3>Order #{id}</h3>
                                                <p className="sm-order-meta">
                                                    Status: {status}
                                                    {total != null && ` · Total: €${total}`}
                                                </p>
                                            </div>
                                            <button className="sm-chip sm-chip-pending">
                                                {status}
                                            </button>
                                        </article>
                                    );
                                })
                            )}
                        </div>

                        <button
                            className="sm-btn sm-btn-primary sm-full-width"
                            onClick={() => navigate("/update-shop")}
                            disabled={!shop}
                        >
                            Update Shop Details
                        </button>
                    </section>
                </div>
            </main>
        </div>
    );
}
