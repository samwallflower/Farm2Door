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
  const navigate = useNavigate();

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
      {/* HEADER – same family as other pages */}
      <header className="basket-header">
        <div className="basket-logo">Farm2Door</div>

        <nav className="basket-nav">
          <button onClick={() => navigate("/home")}>Home</button>
          <button onClick={() => navigate("/categories")}>Categories</button>
          <button onClick={() => navigate("/shops")}>Shops</button>
          <button onClick={() => navigate("/user")}>Account</button>
        </nav>
      </header>

      <main className="basket-main">
        <section className="basket-card">
          <div className="basket-card-header">
            <div>
              <p className="basket-eyebrow">Cart</p>
              <h1 className="basket-title">My Basket</h1>
              <p className="basket-subtitle">
                Review your items before checkout.
              </p>
            </div>
            <div className="basket-delivery">
              <span>⏱ Time of delivery</span>
              <strong>20–25 min</strong>
            </div>
          </div>

          {/* ITEMS LIST */}
          <div className="basket-list">
            {items.length === 0 ? (
              <p className="basket-empty">Your basket is empty.</p>
            ) : (
              items.map((item) => (
                <div className="basket-item" key={item.id}>
                  <div className="basket-item-img-wrap">
                    <img src={item.image} className="basket-item-img" alt={item.name} />
                  </div>

                  <div className="basket-info">
                    <p className="basket-name">{item.name}</p>
                    <div className="basket-rating">
                      {"★".repeat(item.rating)}
                    </div>
                    <p className="basket-price">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="basket-qty">
                    <button
                      className="qty-btn"
                      onClick={() => decrease(item.id)}
                    >
                      –
                    </button>
                    <span className="qty-number">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => increase(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER / TOTAL */}
          <div className="basket-footer">
            <div className="basket-total-text">
              <span>Total</span>
              <strong>${total}</strong>
            </div>
            <button className="basket-checkout-btn">
                Pay Now!
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
