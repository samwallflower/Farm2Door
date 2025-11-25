import React from "react";
import "./UserManagement.css";

export default function UserManagement() {
  return (
    <div className="dashboard-bg">

      {/* Header Logo */}
      <h1 className="logo">Farm2Door</h1>

      {/* Main Container */}
      <div className="grid-container">

        {/* Orders Section */}
        <div className="orders-section">
          <h2 className="section-title">Orders</h2>

          <div className="order-card">
            <img
              src="/mnt/data/Screenshot 2025-11-25 144917.png"
              alt="product"
              className="product-img"
            />
            <div className="order-text">
              <p>Product name ***</p>
              <p>Price***</p>
            </div>
          </div>
        </div>

        {/* User Management Title */}
        <h2 className="center-title">User Management</h2>

        {/* Account Info Section */}
        <div className="account-section">
          <h2 className="section-title">Account Info</h2>

          <div className="input-group">
            <label>Name:</label>
            <input type="text" />
          </div>

          <div className="input-group">
            <label>Address:</label>
            <input type="text" />
          </div>

          <div className="input-group">
            <label>Phone Number:</label>
            <input type="text" />
          </div>

          <div className="input-group">
            <label>Billing method:</label>
            <input type="text" />
          </div>

          <div className="input-group">
            <label>Email Address:</label>
            <input type="text" />
          </div>

          <button className="update-btn">Update Info</button>
        </div>

        {/* Contact Support Section */}
        <div className="contact-section">
          <h2 className="section-title">Contact support</h2>

          <div className="input-group">
            <label>Phone Number***</label>
            <input type="text" />
          </div>

          <div className="input-group">
            <label>Email***</label>
            <input type="text" />
          </div>

          <button className="menu-btn">Shop Management Menu</button>
        </div>

      </div>
    </div>
  );
}
