// src/Components/ShopsMenu.jsx
import React, { useEffect, useState } from "react";
import "./ShopsMenu.css";
import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";
import PillNav from "./PillNav";
import logoImg from "./logo.png";
import heroImage from "./product3.jpg";
import { fetchAllShops } from "../api/client";

const navItems = [
    { label: "Home", href: "/home" },
    { label: "Categories", href: "/categories" },
    { label: "Shops", href: "/shops" },
    { label: "Account", href: "/user" },
];

export default function ShopsMenu() {
    const navigate = useNavigate();

    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const loadShops = async () => {
            try {
                const data = await fetchAllShops();
                setShops(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Failed to load shops", err);
                setError(
                    err.response?.data?.message ||
                    "Failed to load shops. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        loadShops();
    }, []);

    const filteredShops = shops.filter((shop) => {
        const term = search.toLowerCase();
        const name = (shop.name || shop.shopName || "").toLowerCase();
        const address = (shop.address || "").toLowerCase();
        return name.includes(term) || address.includes(term);
    });

    return (
        <div className="shops-page">
            {/* HEADER with PillNav */}
            <header className="shops-header">
                <div className="shops-logo-text">Farm2Door</div>

                <div className="shops-header-center">
                    <PillNav
                        logo={logoImg}
                        items={navItems}
                        activeHref="/shops"
                        baseColor="#ffffff"
                        pillColor="#3e3625"
                        hoveredPillTextColor="#3e3625"
                    />
                </div>

                <div className="shops-search">
                    <input
                        className="shops-search-input"
                        type="text"
                        placeholder="Search shops..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="shops-search-button">
                        <span className="shops-search-icon">🔍</span>
                    </button>
                </div>
            </header>

            <CartIcon />

            <main className="shops-main">
                <section
                    className="shops-hero"
                    style={{ backgroundImage: `url(${heroImage})` }}
                >
                    <div className="shops-hero-inner">
                        <p className="shops-eyebrow">SHOPS</p>
                        <h1 className="shops-title">Browse Local Shops</h1>
                        <p className="shops-subtitle">
                            Discover nearby farms and producers and see what they&apos;re
                            known for.
                        </p>
                    </div>
                </section>

                <section className="shops-list-section">
                    {loading ? (
                        <p>Loading shops...</p>
                    ) : error ? (
                        <p className="shops-error">{error}</p>
                    ) : filteredShops.length === 0 ? (
                        <p>No shops found.</p>
                    ) : (
                        <div className="shops-list">
                            {filteredShops.map((shop) => (
                                <article
                                    key={shop.id}
                                    className="shop-card"
                                    onClick={() => navigate(`/shops/${shop.id}`)}
                                >
                                    <div className="shop-card-header">
                                        <h2>{shop.name || shop.shopName}</h2>
                                        <p className="shop-location">
                                            {shop.address || shop.location || "No address provided"}
                                        </p>
                                    </div>

                                    <div className="shop-products">
                                        <p className="shop-products-label">About this shop</p>
                                        <p className="shop-description">
                                            {shop.description || "Visit this shop to see their products."}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
