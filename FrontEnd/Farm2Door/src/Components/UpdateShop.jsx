import React from "react";
import "./UpdateShop.css";

export default function UpdateShop() {
  return (
    <div className="shop-bg">
      {/* Logo */}
      <h1 className="logo">Farm2Door</h1>

      {/* Title */}
      <h2 className="page-title">Update Shop</h2>

      {/* Form */}
      <div className="form-container">

        <div className="input-group">
          <label>Shop name</label>
          <input type="text" />
        </div>

        <div className="input-group">
          <label>Shop Address</label>
          <input type="text" />
        </div>

        <div className="input-group">
          <label>Contact Number</label>
          <input type="text" />
        </div>

        <div class="input-group">
          <label>Contact Email</label>
          <input type="text" />
        </div>

        <div className="input-group">
          <label>Shop description</label>
          <textarea rows="4"></textarea>
        </div>

      </div>
    </div>
  );
}
