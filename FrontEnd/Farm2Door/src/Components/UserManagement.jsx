import React from "react";
import "./UserManagement.css";
import sampleProduct from "./Product.jpg"; // replace with your own image

export default function UserManagement({ onNavigate }) {
  const goTo = (page) => {
    if (onNavigate) onNavigate(page);
  };

  return (
    <div className="um-page">
      {/* Header / Nav – same style family as Home & Categories */}
      <header className="um-header">
        <div className="um-logo">Farm2Door</div>

        <nav className="um-nav">
          <button onClick={() => goTo && goTo("home")}>Home</button>
          <button onClick={() => goTo && goTo("categories")}>Categories</button>
          <button onClick={() => goTo && goTo("shops")}>Shops</button>
          <button className="active">Account</button>
        </nav>
      </header>

      <main className="um-main">
        <h1 className="um-page-title">User Management</h1>

        <div className="um-grid">
          {/* Orders */}
          <section className="um-card um-orders">
            <h2 className="um-section-title">Recent Orders</h2>

            <div className="um-order-card">
              <div className="um-order-image-wrap">
                <img
                  src={sampleProduct}
                  alt="product"
                  className="um-product-img"
                />
              </div>
              <div className="um-order-text">
                <p className="um-order-name">Farm Fresh Veggie Box</p>
                <p className="um-order-meta">Order #12345 · $39.99</p>
              </div>
            </div>

            <div className="um-order-card">
              <div className="um-order-image-wrap">
                <img
                  src={sampleProduct}
                  alt="product"
                  className="um-product-img"
                />
              </div>
              <div className="um-order-text">
                <p className="um-order-name">Seasonal Fruit Crate</p>
                <p className="um-order-meta">Order #12344 · $29.99</p>
              </div>
            </div>

            <button className="um-btn um-btn-outline um-full-width">
              View All Orders
            </button>
          </section>

          {/* Account Info */}
          <section className="um-card um-account">
            <h2 className="um-section-title">Account Info</h2>

            <div className="um-input-group">
              <label>Name</label>
              <input type="text" placeholder="Jane Doe" />
            </div>

            <div className="um-input-group">
              <label>Address</label>
              <input type="text" placeholder="123 Farm Lane, Green Valley" />
            </div>

            <div className="um-input-group">
              <label>Phone Number</label>
              <input type="text" placeholder="+1 (555) 123-4567" />
            </div>

            <div className="um-input-group">
              <label>Billing Method</label>
              <input type="text" placeholder="Visa •••• 4242" />
            </div>

            <div className="um-input-group">
              <label>Email Address</label>
              <input type="text" placeholder="jane@example.com" />
            </div>

            <button className="um-btn um-btn-primary um-full-width">
              Update Info
            </button>
          </section>

          {/* Contact Support */}
          <section className="um-card um-contact">
            <h2 className="um-section-title">Contact Support</h2>

            <p className="um-support-text">
              Need help with an order, your account, or your farm box?
              We’re here for you.
            </p>

            <div className="um-input-group">
              <label>Phone Number</label>
              <input type="text" placeholder="+1 (800) 000-0000" />
            </div>

            <div className="um-input-group">
              <label>Email</label>
              <input type="text" placeholder="support@farm2door.com" />
            </div>

            <button className="um-btn um-btn-outline um-full-width">
              Shop Management Menu
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}

