import React from "react";
import "./ShopManagement.css";
import sampleProduct from "./Product.jpg"; // reuse the same placeholder image
import { useNavigate } from "react-router-dom";

export default function ShopManagement() {
  const navigate = useNavigate();

  return (
    <div className="sm-page">
      {/* Header / Nav */}
      <header className="sm-header">
        <div className="sm-logo">Farm2Door</div>

        <nav className="sm-nav">
          <button onClick={() => navigate("/home")}>Home</button>
          <button onClick={() => navigate("/categories")}>Categories</button>
          <button className="active" onClick={() => navigate("/shop-management")}>
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
          </div>
          <div className="sm-shop-badge">
            <span className="sm-shop-label">Current shop</span>
            <span className="sm-shop-name">Green Valley Farm Shop</span>
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
              >
                + Add Product
              </button>
            </div>

            <div className="sm-product-list">
              {/* Example Product 1 */}
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

              {/* Example Product 2 */}
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

            <button
              className="sm-btn sm-btn-primary sm-full-width"
              onClick={() => navigate("/update-shop")}
            >
              Update Shop Details
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
