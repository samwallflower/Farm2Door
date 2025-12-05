// src/Components/OrderPage.jsx
import React, { useEffect, useState } from "react";
import "./OrderPage.css";
import { useNavigate } from "react-router-dom";
import { fetchOrdersForShop } from "../api/client";

export default function OrderPage() {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const shopId = localStorage.getItem("shopId");

        if (!shopId) {
            setError("No shop found. Please open Shop Management to set up your shop.");
            setLoading(false);
            return;
        }

        const loadOrders = async () => {
            try {
                setLoading(true);
                const list = await fetchOrdersForShop(shopId);
                const arr = Array.isArray(list) ? list : [];
                setOrders(arr);
                if (arr.length > 0) {
                    setSelectedOrder(arr[0]);
                }
            } catch (err) {
                console.error("Failed to load orders for shop", err);
                setError(
                    err.response?.data?.message ||
                    "Failed to load orders for this shop."
                );
            } finally {
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    const formatOrderDate = (order) => {
        const raw =
            order.orderDate ||
            order.createdAt ||
            order.orderedAt ||
            order.createdOn ||
            null;

        if (!raw) return "—";
        // backend may send ISO or date string; let Date handle it
        const d = new Date(raw);
        if (isNaN(d.getTime())) return raw; // if it's already a nice string
        return d.toLocaleDateString();
    };

    const getFirstItemName = (order) =>
        order.items?.[0]?.productName ||
        order.items?.[0]?.name ||
        `Order #${order.id}`;

    const getTotal = (order) =>
        order.totalAmount ?? order.totalPrice ?? order.total ?? 0;

    const getStatus = (order) =>
        order.status || order.orderStatus || "Pending";

    const getDeliveryAddress = (order) =>
        order.deliveryAddress ||
        order.shippingAddress ||
        order.address ||
        "Not specified";

    const getEta = (order) =>
        order.estimatedDelivery ||
        order.estimatedDeliveryDate ||
        order.deliveryDate ||
        "Not available";

    return (
        <div className="order-bg">
            {/* Title */}
            <h1 className="page-title">Shop Orders 📦</h1>

            <div className="order-layout">
                {/* LEFT SIDE — ORDERS LIST */}
                <div className="left-section">
                    {loading ? (
                        <p>Loading orders...</p>
                    ) : error ? (
                        <p className="order-error">{error}</p>
                    ) : orders.length === 0 ? (
                        <p>No orders for this shop yet.</p>
                    ) : (
                        orders.map((order) => {
                            const isActive = selectedOrder?.id === order.id;
                            const firstItemName = getFirstItemName(order);
                            const dateLabel = formatOrderDate(order);

                            return (
                                <div
                                    key={order.id}
                                    className={`product-card ${isActive ? "active" : ""}`}
                                    onClick={() => setSelectedOrder(order)}
                                >
                                    <img
                                        src="bg.jpg" // placeholder image; replace with real product/shop image if you have one
                                        alt={firstItemName}
                                        className="product-img"
                                    />
                                    <div className="product-info">
                                        <p>{firstItemName}</p>
                                        <p>Order #{order.id}</p>
                                        <p>Ordered on {dateLabel}</p>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* RIGHT SIDE — ORDER STATUS / DETAILS */}
                <div className="right-section">
                    {selectedOrder ? (
                        <>
                            <p>
                                <strong>Est. of Arrival:</strong> {getEta(selectedOrder)}
                            </p>
                            <p>
                                <strong>Order Status:</strong> {getStatus(selectedOrder)}
                            </p>
                            <p>
                                <strong>Deliver to:</strong> {getDeliveryAddress(selectedOrder)}
                            </p>
                            <p>
                                <strong>Amount:</strong> €{getTotal(selectedOrder)}
                            </p>

                            <div className="mid-status-box">
                                <p>{getStatus(selectedOrder)}</p>
                            </div>

                            <button
                                className="account-btn"
                                onClick={() => navigate("/shop-management")}
                            >
                                Back to Shop Management
                            </button>
                        </>
                    ) : loading ? (
                        <p>Loading order details...</p>
                    ) : (
                        <p>Select an order on the left to see its details.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
