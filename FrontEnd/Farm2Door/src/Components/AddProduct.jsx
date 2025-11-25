import React from "react";
import "./AddProduct.css";
import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";

export default function AddProduct() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send new product data to backend
    navigate("/shop-management"); // go back after "saving"
  };

  return (
    <div className="ap-page">
      {/* Header – same family as other pages */}
      <header className="ap-header">
        <div className="ap-logo">Farm2Door</div>

        <nav className="ap-nav">
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
      <CartIcon />   {/* <-- Add this */}

      <main className="ap-main">
        <div className="ap-card">
          <div className="ap-card-header">
            <div>
              <p className="ap-eyebrow">Product</p>
              <h1 className="ap-title">Add Product</h1>
              <p className="ap-subtitle">
                Create a new product listing for your shop.
              </p>
            </div>
          </div>

          <form className="ap-form" onSubmit={handleSubmit}>
            {/* NAME */}
            <div className="ap-input-group ap-full">
              <label>Name</label>
              <input type="text" placeholder="Organic Tomato Box" />
            </div>

            {/* PRICE + INVENTORY */}
            <div className="ap-row">
              <div className="ap-input-group">
                <label>Price</label>
                <input type="text" placeholder="€4.99" />
              </div>

              <div className="ap-input-group">
                <label>Inventory</label>
                <input type="text" placeholder="120" />
              </div>
            </div>

            {/* ORIGIN + UNIT */}
            <div className="ap-row">
              <div className="ap-input-group">
                <label>Origin</label>
                <input type="text" placeholder="Green Valley Farm" />
              </div>

              <div className="ap-input-group">
                <label>Unit</label>
                <input type="text" placeholder="per kg / per box" />
              </div>
            </div>

            {/* CATEGORY */}
            <div className="ap-input-group ap-full">
              <label>Category</label>
              <input type="text" placeholder="Fresh Vegetables" />
            </div>

            {/* DESCRIPTION */}
            <div className="ap-input-group ap-full">
              <label>Description</label>
              <textarea
                rows="4"
                placeholder="Write a short description of the product..."
              ></textarea>
            </div>

            <div className="ap-actions">
              <button
                type="button"
                className="ap-btn ap-btn-outline"
                onClick={() => navigate("/shop-management")}
              >
                Cancel
              </button>
              <button type="submit" className="ap-btn ap-btn-primary">
                Save Product
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
