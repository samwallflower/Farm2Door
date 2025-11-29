// src/Components/UpdateProduct.jsx
import React, { useState, useEffect } from "react";
import "./UpdateProduct.css";
import { useNavigate } from "react-router-dom";


export default function UpdateProduct() {
    const navigate = useNavigate();

    const [productId, setProductId] = useState(null);
    const [shopId, setShopId] = useState(null);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [inventory, setInventory] = useState("");
    const [origin, setOrigin] = useState("");
    const [unit, setUnit] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");

    // Load product from backend
    useEffect(() => {
        const load = async () => {
            try {
                const shop = localStorage.getItem("shopId");
                const prodId = localStorage.getItem("productId");

                if (!shop || !prodId) {
                    setError("Missing product or shop id.");
                    setLoading(false);
                    return;
                }

                setShopId(shop);
                setProductId(prodId);

                const data = await fetchProductById(prodId);

                // Map fields from ProductDto (adjust if your DTO uses different names)
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
                setOrigin(data.origin || "");
                setUnit(data.unit || "");
                setCategory(data.category || "");
                setDescription(data.description || "");
            } catch (err) {
                console.error("Failed to load product", err);
                setError(
                    err.response?.data?.message ||
                    "Failed to load product. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!shopId || !productId) {
            setError("Missing shop or product id.");
            return;
        }

        const payload = {
            // adjust to match UpdateProductRequest fields
            name,
            price,
            inventory,
            origin,
            unit,
            category,
            description,
        };

        try {
            setSaving(true);
            await updateProduct(shopId, productId, payload);
            navigate("/shop-management");
        } catch (err) {
            console.error("Failed to update product", err);
            setError(
                err.response?.data?.message ||
                "Failed to update product. Please try again."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!shopId || !productId) {
            setError("Missing shop or product id.");
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete this product? This action cannot be undone."
        );
        if (!confirmed) return;

        try {
            setDeleting(true);
            await deleteProduct(shopId, productId);
            navigate("/shop-management");
        } catch (err) {
            console.error("Failed to delete product", err);
            setError(
                err.response?.data?.message ||
                "Failed to delete product. Please try again."
            );
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="upd-page">
                <header className="upd-header">
                    <div className="upd-logo">Farm2Door</div>
                    <nav className="upd-nav">
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
                <main className="upd-main">
                    <div className="upd-card">
                        <p>Loading product...</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="upd-page">
            {/* Header – same as before */}
            <header className="upd-header">
                <div className="upd-logo">Farm2Door</div>

                <nav className="upd-nav">
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

            <main className="upd-main">
                <div className="upd-card">
                    <div className="upd-card-header">
                        <div>
                            <p className="upd-eyebrow">Product</p>
                            <h1 className="upd-title">Update Product</h1>
                            <p className="upd-subtitle">
                                Edit your product details to keep your shop information up to date.
                            </p>
                        </div>
                    </div>

                    {error && <p className="upd-error">{error}</p>}

                    <form className="upd-form" onSubmit={handleSubmit}>
                        {/* NAME – highlighted */}
                        <div className="upd-input-group upd-full">
                            <label>Name</label>
                            <input
                                type="text"
                                className="upd-input-highlight"
                                placeholder="Organic Tomato Box"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* PRICE + INVENTORY */}
                        <div className="upd-row">
                            <div className="upd-input-group">
                                <label>Price</label>
                                <input
                                    type="text"
                                    placeholder="€4.99"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            <div className="upd-input-group">
                                <label>Inventory</label>
                                <input
                                    type="text"
                                    placeholder="120"
                                    value={inventory}
                                    onChange={(e) => setInventory(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* ORIGIN + UNIT */}
                        <div className="upd-row">
                            <div className="upd-input-group">
                                <label>Origin</label>
                                <input
                                    type="text"
                                    placeholder="Green Valley Farm"
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                />
                            </div>

                            <div className="upd-input-group">
                                <label>Unit</label>
                                <input
                                    type="text"
                                    placeholder="per kg / per box"
                                    value={unit}
                                    onChange={(e) => setUnit(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* CATEGORY */}
                        <div className="upd-input-group upd-full">
                            <label>Category</label>
                            <input
                                type="text"
                                placeholder="Fresh Vegetables"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </div>

                        {/* DESCRIPTION */}
                        <div className="upd-input-group upd-full">
                            <label>Description</label>
                            <textarea
                                rows="4"
                                placeholder="Write a short description of the product..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="upd-actions">
                            <button
                                type="button"
                                className="upd-btn upd-btn-outline"
                                onClick={() => navigate("/shop-management")}
                                disabled={saving || deleting}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="upd-btn upd-btn-danger"
                                onClick={handleDelete}
                                disabled={saving || deleting}
                            >
                                {deleting ? "Deleting..." : "Delete Product"}
                            </button>
                            <button
                                type="submit"
                                className="upd-btn upd-btn-primary"
                                disabled={saving || deleting}
                            >
                                {saving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}
