import React from "react";
import "./ShopManagement.css";

export default function ShopManagement() {
  return (
    <div className="shop-bg">

      {/* Header */}
      <div className="header-row">
        <h1 className="logo">Farm2Door</h1>
        <h2 className="title">Shop Management</h2>
        <h3 className="shop-name">Shop name**</h3>
      </div>

      {/* PRODUCTS SECTION */}
      <h2 className="section-title">Products</h2>

      <div className="products-row">

        {/* Example Product Box */}
        <div className="product-card">
          <img
            src="/mnt/data/Screenshot 2025-11-25 160149.png"
            className="product-img"
            alt="product"
          />
          <div className="product-info">
            <p>Product name</p>
            <p>Price</p>
            <p>Stock</p>
          </div>
        </div>

        {/* Add Product Box */}
        <div className="add-card">
          <p>Add Product +</p>
        </div>

      </div>

      {/* PENDING ORDERS */}
      <h2 className="section-title">Pending Orders</h2>

      <div className="pending-card">
        <p>Product name</p>
        <p>Amount</p>
      </div>

    </div>
  );
}
