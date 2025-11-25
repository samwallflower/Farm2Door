import React from "react";
import { useNavigate } from "react-router-dom";
import "./CartIcon.css";

export default function CartIcon() {
  const navigate = useNavigate();

  return (
    <div className="cart-icon-container" onClick={() => navigate("/basket")}>
      🛒
      <span className="cart-count">3</span>
    </div>
  );
}
