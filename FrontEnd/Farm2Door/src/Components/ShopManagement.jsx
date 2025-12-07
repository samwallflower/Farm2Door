import React, { useEffect, useState } from "react";
import "./ShopManagement.css";
import { useNavigate } from "react-router-dom";
import {
    fetchShopByUserId,
    fetchProductsForShop,
    fetchOrdersForShop,
} from "../api/client";

import PillNav from "./PillNav";
import logoImg from "./logo.png";
import productPlaceholder from "./Product.jpg"; // ✅ placeholder image

const navItems = [
    { label: "Home", href: "/home" },
    { label: "Categories", href: "/categories" },
    { label: "Shops", href: "/shops" },
    { label: "Account", href: "/user" },
];

const API_BASE =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

// Build a full download URL from an image id
const buildImageUrlFromId = (imageId) => {
    const base = API_BASE.replace(/\/$/, ""); // strip trailing slash
    return `${base}/images/image/download/${imageId}`;
};

const getProductImage = (product) => {
    // 1) Direct URL on product
    if (product.imageUrl && product.imageUrl.startsWith("http")) {
        return product.imageUrl;
    }

    // 2) First image from images array
    const firstImage = product.images?.[0] || null;
    if (firstImage) {
        if (firstImage.downloadUrl && firstImage.downloadUrl.startsWith("http")) {
            return firstImage.downloadUrl;
        }
        if (firstImage.imageUrl && firstImage.imageUrl.startsWith("http")) {
            return firstImage.imageUrl;
        }
        if (firstImage.id != null) {
            return buildImageUrlFromId(firstImage.id);
        }
    }

    // 3) Fallback placeholder
    return productPlaceholder;
};

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
                console.log("userId from localStorage in UserManagement:", userId);

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
                <div className="sm-logo-text">Farm2Door</div>

                <div className="sm-header-center">
                    <PillNav
                        logo={logoImg}
                        items={navItems}
                        activeHref="/shop-management"
                        baseColor="#ffffff"
                        pillColor="#3e3625"
                        hoveredPillTextColor="#3e3625"
                    />
                </div>
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
                                                {/* ✅ use shared image helper */}
                                                <img src={getProductImage(product)} alt={name} />
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
                                                    onClick={() => {
                                                        if (product.id != null) {
                                                            localStorage.setItem(
                                                                "productId",
                                                                String(product.id)
                                                            );
                                                        }
                                                        navigate("/update-product");
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="sm-btn sm-btn-outline sm-btn-small"
                                                    onClick={() => {
                                                        if (product.id != null) {
                                                            localStorage.setItem(
                                                                "productId",
                                                                String(product.id)
                                                            );
                                                        }
                                                        navigate("/product");
                                                    }}
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

                        {shop ? (
                            <button
                                className="sm-btn sm-btn-primary sm-full-width"
                                onClick={() => navigate("/update-shop")}
                            >
                                Update Shop Details
                            </button>
                        ) : (
                            <button
                                className="sm-btn sm-btn-primary sm-full-width"
                                onClick={() => navigate("/shop-creation")}
                            >
                                + Create Shop
                            </button>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}
