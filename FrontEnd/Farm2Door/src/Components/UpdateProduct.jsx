import React from "react";
import "./UpdateProduct.css";
import { useNavigate } from "react-router-dom";

export default function UpdateProduct() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send updated product data to backend
    navigate("/shop-management"); // go back after "saving"
  };

  return (
    <div className="upd-page">
      {/* Header – same family as other pages */}
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

          <form className="upd-form" onSubmit={handleSubmit}>
            {/* NAME – highlighted (as in your original) */}
            <div className="upd-input-group upd-full">
              <label>Name</label>
              <input
                type="text"
                className="upd-input-highlight"
                placeholder="Organic Tomato Box"
              />
            </div>

            {/* PRICE + INVENTORY */}
            <div className="upd-row">
              <div className="upd-input-group">
                <label>Price</label>
                <input type="text" placeholder="€4.99" />
              </div>

              <div className="upd-input-group">
                <label>Inventory</label>
                <input type="text" placeholder="120" />
              </div>
            </div>

            {/* ORIGIN + UNIT */}
            <div className="upd-row">
              <div className="upd-input-group">
                <label>Origin</label>
                <input type="text" placeholder="Green Valley Farm" />
              </div>

              <div className="upd-input-group">
                <label>Unit</label>
                <input type="text" placeholder="per kg / per box" />
              </div>
            </div>

            {/* CATEGORY */}
            <div className="upd-input-group upd-full">
              <label>Category</label>
              <input type="text" placeholder="Fresh Vegetables" />
            </div>

            {/* DESCRIPTION */}
            <div className="upd-input-group upd-full">
              <label>Description</label>
              <textarea
                rows="4"
                placeholder="Write a short description of the product..."
              ></textarea>
            </div>

            <div className="upd-actions">
              <button
                type="button"
                className="upd-btn upd-btn-outline"
                onClick={() => navigate("/shop-management")}
              >
                Cancel
              </button>
              <button type="submit" className="upd-btn upd-btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
