import React from "react";
import "./UpdateInfo.css";

export default function UpdateInfo() {
  return (
    <div className="update-bg">
      <div className="branding">
        <span className="small-text">Always Fresh</span>
        <h1 className="logo">Farm2Door</h1>
      </div>

      <div className="form-container">
        <h2 className="title">Update Info</h2>

        <div className="input-group">
          <label>First Name</label>
          <input type="text" placeholder="" />
        </div>

        <div className="input-group">
          <label>Last Name</label>
          <input type="text" placeholder="" />
        </div>

        <button className="update-btn">Update</button>
      </div>
    </div>
  );
}
