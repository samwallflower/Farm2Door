import React from "react";
import "./ProductPage.css";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const navigate = useNavigate();

  return (
    <div className="pp-page">
      {/* Header – same family as other pages */}
      <header className="pp-header">
        <div className="pp-logo">Farm2Door</div>

        <nav className="pp-nav">
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

      <main className="pp-main">
        <div className="pp-card">
          <div className="pp-card-header">
            <div>
              <p className="pp-eyebrow">Product</p>
              <h1 className="pp-title">Product Details</h1>
              <p className="pp-subtitle">
                Create or update your product information to keep your shop up
                to date.
              </p>
            </div>
          </div>

          <form className="pp-form">
            {/* NAME – large pill */}
            <div className="pp-input-group pp-full">
              <label>Name</label>
              <input type="text" placeholder="Organic Tomato Box" />
            </div>

            {/* PRICE + INVENTORY */}
            <div className="pp-row">
              <div className="pp-input-group">
                <label>Price</label>
                <input type="text" placeholder="€4.99" />
              </div>

            <div className="pp-input-group">
                <label>Inventory</label>
                <input type="text" placeholder="120" />
              </div>
            </div>

            {/* ORIGIN */}
            <div className="pp-input-group pp-half">
              <label>Origin</label>
              <input type="text" placeholder="Green Valley Farm" />
            </div>

            {/* UNIT */}
            <div className="pp-input-group pp-half">
              <label>Unit</label>
              <input type="text" placeholder="per kg / per box" />
            </div>

            {/* CATEGORY */}
            <div className="pp-input-group pp-full">
              <label>Category</label>
              <input type="text" placeholder="Fresh Vegetables" />
            </div>

            {/* DESCRIPTION */}
            <div className="pp-input-group pp-full">
              <label>Description</label>
              <textarea
                rows="4"
                placeholder="Write a short description of the product..."
              ></textarea>
            </div>

            <div className="pp-actions">
              <button
                type="button"
                className="pp-btn pp-btn-outline"
                onClick={() => navigate("/shop-management")}
              >
                Back to Shop Management
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
