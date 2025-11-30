// src/Components/UserManagement.jsx
import React, { useEffect, useState } from "react";
import "./UserManagement.css";
import sampleProduct from "./Product.jpg";
import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";
import PillNav from "./PillNav";
import logoImg from "./logo.png";

import { fetchUserById, fetchOrdersForUser } from "../api/client";

const navItems = [
    { label: "Home", href: "/home" },
    { label: "Categories", href: "/categories" },
    { label: "Shops", href: "/shops" },
    { label: "Account", href: "/user" },
];

export default function UserManagement() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState([]);

    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            setError("No userId found. Please log in again.");
            setLoadingUser(false);
            setLoadingOrders(false);
            return;
        }

        const loadUser = async () => {
            try {
                const data = await fetchUserById(userId);
                setUser(data || null);
            } catch (err) {
                console.error("Failed to load user", err);
                setError(
                    err.response?.data?.message ||
                    "Failed to load user information. Please try again."
                );
            } finally {
                setLoadingUser(false);
            }
        };

        const loadOrders = async () => {
            try {
                const list = await fetchOrdersForUser(userId);
                setOrders(Array.isArray(list) ? list : []);
            } catch (err) {
                console.error("Failed to load orders for user", err);
                setError((prev) =>
                    prev ||
                    err.response?.data?.message ||
                    "Failed to load recent orders. Please try again."
                );
            } finally {
                setLoadingOrders(false);
            }
        };

        loadUser();
        loadOrders();
    }, []);

    const fullName =
        (user?.firstName || user?.name || "") +
        (user?.lastName ? ` ${user.lastName}` : "");

    const address =
        user?.address ||
        user?.shippingAddress ||
        user?.billingAddress ||
        "";

    const phone =
        user?.phoneNumber ||
        user?.phone ||
        "";

    const email = user?.email || "";

    return (
        <div className="um-page">
            <header className="um-header">
                <div className="um-logo-text">Farm2Door</div>

                <div className="um-header-center">
                    <PillNav
                        logo={logoImg}
                        items={navItems}
                        activeHref="/user"
                        baseColor="#ffffff"
                        pillColor="#3e3625"
                        hoveredPillTextColor="#3e3625"
                    />
                </div>
            </header>

            <CartIcon />

            <main className="um-main">
                <h1 className="um-page-title">User Management</h1>
                {error && <p className="um-error">{error}</p>}

                <div className="um-grid">
                    {/* ORDERS */}
                    <section className="um-card um-orders">
                        <h2 className="um-section-title">Recent Orders</h2>

                        {loadingOrders ? (
                            <p>Loading orders...</p>
                        ) : orders.length === 0 ? (
                            <p>You have no recent orders.</p>
                        ) : (
                            <>
                                {orders.slice(0, 2).map((order) => {
                                    const orderId = order.id;
                                    const total =
                                        order.totalAmount ??
                                        order.totalPrice ??
                                        order.total ??
                                        0;
                                    const firstItem =
                                        order.items?.[0]?.productName ||
                                        order.items?.[0]?.name ||
                                        "Order";

                                    return (
                                        <div className="um-order-card" key={orderId}>
                                            <div className="um-order-image-wrap">
                                                {/* If you add product image in order, use that instead */}
                                                <img
                                                    src={sampleProduct}
                                                    alt="product"
                                                    className="um-product-img"
                                                />
                                            </div>
                                            <div className="um-order-text">
                                                <p className="um-order-name">{firstItem}</p>
                                                <p className="um-order-meta">
                                                    Order #{orderId} · €{total}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}

                                <button className="um-btn um-btn-outline um-full-width">
                                    View All Orders
                                </button>
                            </>
                        )}
                    </section>

                    {/* ACCOUNT INFO */}
                    <section className="um-card um-account">
                        <h2 className="um-section-title">Account Info</h2>

                        {loadingUser ? (
                            <p>Loading account info...</p>
                        ) : (
                            <>
                                <div className="um-input-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        value={fullName}
                                        readOnly
                                    />
                                </div>

                                <div className="um-input-group">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        placeholder="Address"
                                        value={address}
                                        readOnly
                                    />
                                </div>

                                <div className="um-input-group">
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        placeholder="Phone"
                                        value={phone}
                                        readOnly
                                    />
                                </div>

                                <div className="um-input-group">
                                    <label>Email Address</label>
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        value={email}
                                        readOnly
                                    />
                                </div>

                                <button
                                    className="um-btn um-btn-primary um-full-width"
                                    onClick={() => navigate("/update-info")}
                                >
                                    Update Info
                                </button>
                            </>
                        )}
                    </section>

                    {/* CONTACT / SHOP MGMT */}
                    <section className="um-card um-contact">
                        <h2 className="um-section-title">Contact Support</h2>

                        <p className="um-support-text">
                            Need help with an order, your account, or your farm box? We’re
                            here for you.
                        </p>

                        <div className="um-input-group">
                            <label>Phone Number</label>
                            <input type="text" placeholder="+1 (800) 000-0000" readOnly />
                        </div>

                        <div className="um-input-group">
                            <label>Email</label>
                            <input
                                type="text"
                                placeholder="support@farm2door.com"
                                readOnly
                            />
                        </div>

                        <button
                            className="um-btn um-btn-outline um-full-width"
                            onClick={() => navigate("/shop-management")}
                        >
                            Shop Management Menu
                        </button>
                    </section>
                </div>
            </main>
        </div>
    );
}
