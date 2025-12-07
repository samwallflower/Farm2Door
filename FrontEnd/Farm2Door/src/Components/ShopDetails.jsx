// src/Components/ShopDetails.jsx
import React, { useEffect, useState } from "react";
import "./ShopDetails.css";
import { useNavigate, useParams } from "react-router-dom";

import CartIcon from "./CartIcon";
import PillNav from "./PillNav";
import logoImg from "./logo.png";
import productPlaceholder from "./Product.jpg";

import {
    fetchShopById,
    fetchProductsForShop,
    fetchImagesForProduct,
} from "../api/client";

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
    const base = API_BASE.replace(/\/$/, "");
    return `${base}/images/image/download/${imageId}`;
};


const getProductImageSrc = (product) => {
    if (product.imageUrl) return product.imageUrl;

    // if you ever populate product.images etc, we can still use them
    const firstImage =
        (product.images && product.images[0]) || null;
    if (firstImage && firstImage.id) {
        return buildImageUrlFromId(firstImage.id);
    }

    return productPlaceholder;
};


const addToCartLocal = (product) => {
    const raw = localStorage.getItem("cartItems");
    let current = [];
    try {
        current = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(current)) current = [];
    } catch {
        current = [];
    }

    const existingIndex = current.findIndex((p) => p.id === product.id);

    if (existingIndex !== -1) {
        const existing = current[existingIndex];
        current[existingIndex] = {
            ...existing,
            quantity: (existing.quantity || 1) + 1,
        };
    } else {
        current.push({
            id: product.id,
            name: product.name || product.productName,
            price:
                product.price ??
                product.unitPrice ??
                product.productPrice ??
                0,
            quantity: 1,
            imageUrl: getProductImageSrc(product),
        });
    }

    localStorage.setItem("cartItems", JSON.stringify(current));
};

export default function ShopDetails() {
    const navigate = useNavigate();
    const { shopId } = useParams(); // /shops/:shopId

    const [shop, setShop] = useState(null);
    const [products, setProducts] = useState([]);
    const [loadingShop, setLoadingShop] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [error, setError] = useState("");

    // Load shop details
    useEffect(() => {
        const loadShop = async () => {
            try {
                const data = await fetchShopById(shopId);
                setShop(data || null);
            } catch (err) {
                console.error("Failed to load shop", err);
                setError(
                    err.response?.data?.message || "Failed to load shop details."
                );
            } finally {
                setLoadingShop(false);
            }
        };

        loadShop();
    }, [shopId]);

    // Load products and their images (downloaded directly)
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const list = await fetchProductsForShop(shopId);
                const productsArray = Array.isArray(list) ? list : [];

                const productsWithImages = await Promise.all(
                    productsArray.map(async (product) => {
                        try {
                            const images = await fetchImagesForProduct(product.id);
                            const first =
                                Array.isArray(images) && images.length > 0
                                    ? images[0]
                                    : null;

                            const imageUrl = first ? buildImageUrlFromId(first.id) : null;

                            return {
                                ...product,
                                imageUrl,
                            };
                        } catch (err) {
                            console.error(
                                "Failed to fetch images for product",
                                product.id,
                                err
                            );
                            return product; // keep product, no image
                        }
                    })
                );

                setProducts(productsWithImages);
            } catch (err) {
                console.error("Failed to load products for shop", err);
                setError((prev) =>
                    prev ||
                    err.response?.data?.message ||
                    "Failed to load products for this shop."
                );
            } finally {
                setLoadingProducts(false);
            }
        };

        loadProducts();
    }, [shopId]);

    const displayName = shop?.name || shop?.shopName || "Shop";
    const displayAddress = shop?.address || "Address not available";
    const displayDescription =
        shop?.description || "This shop has not added a description yet.";

    return (
        <div className="sd-page">
            {/* HEADER with PillNav */}
            <header className="sd-header">
                <div className="sd-logo-text">Farm2Door</div>

                <div className="sd-header-center">
                    <PillNav
                        logo={logoImg}
                        items={navItems}
                        activeHref="/shops"
                        baseColor="#ffffff"
                        pillColor="#3e3625"
                        hoveredPillTextColor="#3e3625"
                    />
                </div>
            </header>

            <CartIcon />

            <main className="sd-main">
                {/* Shop hero / summary */}
                <section className="sd-hero">
                    <div className="sd-hero-inner">
                        <div className="sd-hero-text">
                            <p className="sd-eyebrow">Shop</p>

                            {loadingShop ? (
                                <h1 className="sd-title">Loading shop...</h1>
                            ) : (
                                <>
                                    <h1 className="sd-title">{displayName}</h1>
                                    <p className="sd-address">{displayAddress}</p>
                                    {displayDescription && (
                                        <p className="sd-description">{displayDescription}</p>
                                    )}
                                </>
                            )}

                            <button
                                className="sd-btn sd-btn-outline"
                                onClick={() => navigate("/shops")}
                            >
                                ← Back to Shops
                            </button>
                        </div>
                    </div>
                </section>

                {/* Products list */}
                <section className="sd-products-section">
                    <h2 className="sd-products-title">Products</h2>

                    {loadingProducts ? (
                        <p>Loading products...</p>
                    ) : error && products.length === 0 ? (
                        <p className="sd-error">{error}</p>
                    ) : products.length === 0 ? (
                        <p>This shop has no products yet.</p>
                    ) : (
                        <div className="sd-products-grid">
                            {products.map((product) => {
                                const name = product.name || product.productName;
                                const price =
                                    product.price ??
                                    product.unitPrice ??
                                    product.productPrice ??
                                    null;
                                const inventory = product.inventory ?? 0;

                                const imageSrc = getProductImageSrc(product);

                                return (
                                    <article key={product.id} className="sd-product-card">
                                        <div className="sd-product-image-wrap">
                                            <img
                                                src={imageSrc}
                                                alt={name}
                                                className="sd-product-image"
                                            />
                                        </div>

                                        <div className="sd-product-header">
                                            <h3 className="sd-product-name">{name}</h3>
                                        </div>

                                        <div className="sd-product-meta">
                                            {price != null && (
                                                <span className="sd-product-price">€{price}</span>
                                            )}
                                            <span className="sd-product-amount">
                        In stock: {inventory}
                      </span>
                                        </div>

                                        <button
                                            className="sd-btn sd-btn-primary sd-add-btn"
                                            type="button"
                                            onClick={() => addToCartLocal(product)}
                                        >
                                            Add to Cart
                                        </button>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
