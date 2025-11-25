import React from "react";
import "./AddProduct.css";

export default function AddProduct() {
  return (
    <div className="add-bg">
      <h1 className="add-title">Add Product</h1>

      <div className="form-wrapper">

        <div className="input-group">
          <label>Name:</label>
          <input type="text" />
        </div>

        <div className="input-group">
          <label>Price:</label>
          <input type="text" />
        </div>

        <div className="input-group">
          <label>Inventory:</label>
          <input type="text" />
        </div>

        <div className="input-group">
          <label>Origin:</label>
          <input type="text" />
        </div>

        <div className="input-group">
          <label>Unit:</label>
          <input type="text" />
        </div>

        <div className="input-group">
          <label>Category:</label>
          <input type="text" />
        </div>

        <div className="input-group">
          <label>Description:</label>
          <textarea rows="4"></textarea>
        </div>

      </div>
    </div>
  );
}
