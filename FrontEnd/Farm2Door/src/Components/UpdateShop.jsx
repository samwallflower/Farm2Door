import React from "react";
import "./UpdateShop.css";
import { useNavigate } from "react-router-dom";

export default function UpdateShop() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send updated shop data to backend
    navigate("/shop-management"); // back to shop management after "saving"
  };

  return (
    <div className="us-page">
      {/* Header – same family as other pages */}
      <header className="us-header">
        <div className="us-logo">Farm2Door</div>

        <nav className="us-nav">
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

      <main className="us-main">
        <div className="us-card">
          <div className="us-card-header">
            <div>
              <p className="us-eyebrow">Shop</p>
              <h1 className="us-title">Update Shop</h1>
              <p className="us-subtitle">
                Edit your shop details so customers always see the correct info.
              </p>
            </div>
          </div>

          <form className="us-form" onSubmit={handleSubmit}>
            <div className="us-input-group">
              <label>Shop Name</label>
              <input type="text" placeholder="Green Valley Farm Shop" />
            </div>

            <div className="us-input-group">
              <label>Shop Address</label>
              <input
                type="text"
                placeholder="123 Farm Lane, Green Valley"
              />
            </div>

            <div className="us-row">
              <div className="us-input-group">
                <label>Contact Number</label>
                <input type="text" placeholder="+1 (555) 123-4567" />
              </div>

              <div className="us-input-group">
                <label>Contact Email</label>
                <input type="email" placeholder="shop@example.com" />
              </div>
            </div>

            <div className="us-input-group">
              <label>Shop Description</label>
              <textarea
                rows="4"
                placeholder="Describe your shop, what you sell, and how you grow or source your products."
              ></textarea>
            </div>

            <div className="us-actions">
              <button
                type="button"
                className="us-btn us-btn-outline"
                onClick={() => navigate("/shop-management")}
              >
                Cancel
              </button>
              <button type="submit" className="us-btn us-btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
