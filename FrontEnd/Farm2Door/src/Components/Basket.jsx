import React, { useEffect, useState } from "react";
import "./Basket.css";
import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";
import PillNav from "./PillNav";
import logoImg from "./logo.png";
import { createOrderForUser, addItemToCart } from "../api/client";

const navItems = [
    { label: "Home", href: "/home" },
    { label: "Categories", href: "/categories" },
    { label: "Shops", href: "/shops" },
    { label: "Account", href: "/user" },
];

export default function Basket() {
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [placing, setPlacing] = useState(false);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Load cart from localStorage
    useEffect(() => {
        const raw = localStorage.getItem("cartItems");
        try {
            const parsed = raw ? JSON.parse(raw) : [];
            setItems(Array.isArray(parsed) ? parsed : []);
        } catch (e) {
            console.error("Failed to parse cartItems", e);
            setItems([]);
        }
    }, []);

    const total = items.reduce(
        (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
        0
    );

    const handleRemove = (id) => {
        const filtered = items.filter((item) => item.id !== id);
        setItems(filtered);
        localStorage.setItem("cartItems", JSON.stringify(filtered));
    };

    const handleQuantityChange = (id, delta) => {
        const updated = items
            .map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
                    : item
            )
            .filter((item) => item.quantity > 0);

        setItems(updated);
        localStorage.setItem("cartItems", JSON.stringify(updated));
    };

    const handleCheckout = async () => {
        setError("");
        setSuccessMsg("");

        if (items.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        const userId = localStorage.getItem("userId");
        if (!userId) {
            setError("No userId found. Please log in again.");
            return;
        }

        try {
            setPlacing(true);

            // 1) Best-effort: sync localStorage cart to backend cart
            for (const item of items) {
                const productId = item.id;
                const quantity = item.quantity || 1;
                if (!productId) continue;

                try {
                    await addItemToCart(productId, quantity);
                } catch (err) {
                    const status = err.response?.status;

                    if (status === 409) {
                        // Conflict: item already in cart or similar – safe to ignore and continue
                        console.warn("Item already in cart, skipping:", productId);
                        continue;
                    }

                    if (status === 401) {
                        setError("You must be logged in to place an order.");
                        setPlacing(false);
                        return;
                    }

                    console.error("Failed to sync item to backend cart", err);
                    // For now we just continue so other items and the order can still go through
                }
            }

            // 2) Place order using backend cart for this user
            const order = await createOrderForUser(userId);

            // 3) Clear local cart on success
            localStorage.removeItem("cartItems");
            setItems([]);
            setSuccessMsg(`Order #${order?.id || ""} placed successfully!`);
        } catch (err) {
            console.error("Failed to place order", err);
            setError(
                err.response?.data?.message ||
                "Failed to place order. Please try again."
            );
        } finally {
            setPlacing(false);
        }
    };

    return (
        <div className="basket-page">
            {/* Header */}
            <header className="basket-header">
                <div className="basket-logo-text">Farm2Door</div>
                <div className="basket-header-center">
                    <PillNav
                        logo={logoImg}
                        items={navItems}
                        activeHref="/basket"
                        baseColor="#ffffff"
                        pillColor="#3e3625"
                        hoveredPillTextColor="#3e3625"
                    />
                </div>
            </header>

            <CartIcon />

            <main className="basket-main">
                <section className="basket-card">
                    <h1 className="basket-title">Your Cart</h1>

                    {/* NEW: continue shopping button uses navigate, fixes the warning */}
                    <button
                        type="button"
                        className="basket-continue-btn"
                        onClick={() => navigate("/categories")}
                    >
                        ← Continue Shopping
                    </button>

                    {error && <p className="basket-error">{error}</p>}
                    {successMsg && <p className="basket-success">{successMsg}</p>}

                    {items.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            <div className="basket-items">
                                {items.map((item) => (
                                    <div className="basket-item" key={item.id}>
                                        <div className="basket-item-main">
                                            <div className="basket-item-info">
                                                {item.imageUrl && (
                                                    <img
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        className="basket-item-image"
                                                    />
                                                )}
                                                <div>
                                                    <h3>{item.name}</h3>
                                                    <p className="basket-item-price">
                                                        €{item.price?.toFixed?.(2) ?? item.price}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="basket-item-controls">
                                                <button
                                                    type="button"
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity || 1}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            className="basket-remove"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="basket-footer">
                                <div className="basket-total-text">
                                    <span>Total</span>
                                    <strong>€{total.toFixed(2)}</strong>
                                </div>
                                <button
                                    className="basket-checkout-btn"
                                    onClick={handleCheckout}
                                    disabled={placing || items.length === 0}
                                >
                                    {placing ? "Placing order..." : "Pay Now!"}
                                </button>
                            </div>
                        </>
                    )}
                </section>
            </main>
        </div>
    );
}
