import React, { useState } from "react";
import "./Basket.css";
import { useNavigate } from "react-router-dom";
// TEMP sample items — replace with your own data
const sampleItems = [
  {
    id: 1,
    name: "Tasty Italian Piada",
    price: 28.0,
    rating: 5,
    image: "https://via.placeholder.com/80",
    quantity: 2,
  },
  {
    id: 2,
    name: "Land & Sea",
    price: 19.99,
    rating: 4,
    image: "https://via.placeholder.com/80",
    quantity: 1,
  },
  {
    id: 3,
    name: "Healthy Salad",
    price: 34.99,
    rating: 5,
    image: "https://via.placeholder.com/80",
    quantity: 2,
  },
  {
    id: 4,
    name: "French Fries",
    price: 9.99,
    rating: 4,
    image: "https://via.placeholder.com/80",
    quantity: 1,
  },
];

export default function Basket() {
  const [items, setItems] = useState(sampleItems);

  const increase = (id) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i
      )
    );
  };

  const decrease = (id) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === id && i.quantity > 1
          ? { ...i, quantity: i.quantity - 1 }
          : i
      )
    );
  };

  const total = items
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="basket-page">
      <header className="basket-header">
        <div className="basket-menu">☰</div>
        <h2 className="basket-title">My Basket</h2>
        <div className="basket-cart">🛒</div>
      </header>

      <div className="basket-list">
        {items.map((item) => (
          <div className="basket-item" key={item.id}>
            <img src={item.image} className="basket-item-img" alt="" />

            <div className="basket-info">
              <p className="basket-price">${item.price}</p>
              <p className="basket-name">{item.name}</p>
              <div className="basket-rating">
                {"⭐".repeat(item.rating)}
              </div>
            </div>

            <div className="basket-qty">
              <button className="qty-btn" onClick={() => decrease(item.id)}>
                –
              </button>
              <span className="qty-number">{item.quantity}</span>
              <button className="qty-btn" onClick={() => increase(item.id)}>
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="basket-delivery">
        <span>⏱ Time of delivery</span>
        <strong>20–25 min</strong>
      </div>

      <button className="basket-total-btn">
        Total ${total}
      </button>
    </div>
  );
}
