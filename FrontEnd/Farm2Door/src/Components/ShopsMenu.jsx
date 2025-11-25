import React from "react";
import "./ShopsMenu.css";
import { useNavigate } from "react-router-dom";

const shops = [
  {
    id: 1,
    name: "Green Valley Farm",
    location: "Green Valley, Country",
    products: ["Fresh Vegetables", "Herbs", "Free-range Eggs"],
  },
  {
    id: 2,
    name: "Sunrise Orchard",
    location: "Riverside, Country",
    products: ["Apples", "Pears", "Cider"],
  },
  {
    id: 3,
    name: "Meadow Dairy Co.",
    location: "Hillside, Country",
    products: ["Milk", "Cheese", "Yogurt"],
  },
  {
    id: 4,
    name: "Barnside Butcher",
    location: "Old Town, Country",
    products: ["Grass-fed Beef", "Lamb", "Sausages"],
  },
];

export default function ShopsMenu() {
  const navigate = useNavigate();

  return (
    <div className="shops-page">
      {/* Header – same family as other pages */}
      <header className="shops-header">
        <div className="shops-logo">Farm2Door</div>

        <nav className="shops-nav">
          <button onClick={() => navigate("/home")}>Home</button>
          <button onClick={() => navigate("/categories")}>Categories</button>
          <button
            className="active"
            onClick={() => navigate("/shops")}
          >
            Shops
          </button>
          <button onClick={() => navigate("/user")}>Account</button>
        </nav>
      </header>

      <main className="shops-main">
        {/* Hero / intro */}
        <section className="shops-hero">
          <div className="shops-hero-inner">
            <p className="shops-eyebrow">Shops</p>
            <h1 className="shops-title">Browse Local Shops</h1>
            <p className="shops-subtitle">
              Discover nearby farms and producers and see what they&apos;re known for.
            </p>
          </div>
        </section>

        {/* Shops list */}
        <section className="shops-list-section">
          <div className="shops-list">
            {shops.map((shop) => (
              <article key={shop.id} className="shop-card">
                <div className="shop-card-header">
                  <h2>{shop.name}</h2>
                  <p className="shop-location">{shop.location}</p>
                </div>

                <div className="shop-products">
                  <p className="shop-products-label">Notable products</p>
                  <div className="shop-product-chips">
                    {shop.products.map((prod, idx) => (
                      <span key={idx} className="shop-chip">
                        {prod}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Optional: you can wire this to a shop details page later */}
                {/* <button
                  className="shops-btn shops-btn-outline"
                  onClick={() => navigate(`/shop/${shop.id}`)}
                >
                  View Shop
                </button> */}
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
