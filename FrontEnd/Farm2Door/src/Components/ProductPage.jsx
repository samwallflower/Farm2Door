import React from "react";
import "./ProductPage.css";

export default function ProductPage() {
  return (
    <div className="product-bg">

      <div className="form-container">

        {/* NAME BOX (big rounded box) */}
        <div className="input-group large-box">
          <label>Name:</label>
          <input type="text" />
        </div>

        {/* PRICE + INVENTORY SIDE BY SIDE */}
        <div className="row">
          <div className="input-group small-box">
            <label>Price:</label>
            <input type="text" />
          </div>

          <div className="input-group small-box">
            <label>Inventory:</label>
            <input type="text" />
          </div>
        </div>

        {/* ORIGIN */}
        <div className="input-group medium-box">
          <label>Origin:</label>
          <input type="text" />
        </div>

        {/* UNIT */}
        <div className="input-group medium-box">
          <label>Unit:</label>
          <input type="text" />
        </div>

        {/* CATEGORY */}
        <div className="input-group medium-box">
          <label>Category:</label>
          <input type="text" />
        </div>

        {/* DESCRIPTION - LARGE BOX */}
        <div className="input-group description-box">
          <label>Description:</label>
          <textarea rows="4"></textarea>
        </div>

      </div>

    </div>
  );
}
