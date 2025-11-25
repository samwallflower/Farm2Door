import React from "react";
import "./OrderPage.css";

export default function OrderPage() {
  return (
    <div className="order-bg">
      {/* Title */}
      <h1 className="page-title">Cart 🛒</h1>

      <div className="order-layout">

        {/* LEFT SIDE — PRODUCT LIST */}
        <div className="left-section">

          {/* Product Card 1 */}
          <div className="product-card">
            <img
              src="Owner2.png"
              alt="Product"
              className="product-img"
            />
            <div className="product-info">
              <p>Product name</p>
              <p>Shop name</p>
              <p>Ordered on ***</p>
            </div>
          </div>

          {/* Product Card 2 (empty style like screenshot) */}
          <div className="product-card empty">
            <div className="empty-info">
              <p>Product name</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE — ORDER STATUS */}
        <div className="right-section">
          <p>Est of Arrival</p>
          <p>Order Status</p>
          <p>Deliver to ***</p>
          <p>Amount **</p>

          <div className="mid-status-box">
            <p>Order Status</p>
          </div>

          <button className="account-btn">Account Management</button>
        </div>

      </div>
    </div>
  );
}
