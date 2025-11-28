import React from "react";
import "./ShopsMenu.css";
import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";
import PillNav from "./PillNav";
import logoImg from "./logo.png"; // <-- point to your real logo file
import heroImage from "./product3.jpg";

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

// same nav as other pages
const navItems = [
  { label: "Home", href: "/home" },
  { label: "Categories", href: "/categories" },
  { label: "Shops", href: "/shops" },
  { label: "Account", href: "/user" },
];

export default function ShopsMenu() {
  const navigate = useNavigate();

  return (
    <div className="shops-page">
      {/* HEADER with PillNav */}
      <header className="shops-header">
        {/* left text logo */}
        <div className="shops-logo-text">Farm2Door</div>

        {/* center pill nav (Shops active) */}
        <div className="shops-header-center">
          <PillNav
            logo={logoImg}
            items={navItems}
            activeHref="/shops"
            baseColor="#ffffff"
            pillColor="#3e3625"
            hoveredPillTextColor="#3e3625"
          />
        </div>

        {/* right search */}
        <div className="shops-search">
          <input
            className="shops-search-input"
            type="text"
            placeholder="Search shops..."
          />
          <button className="shops-search-button">
            <span className="shops-search-icon">🔍</span>
          </button>
        </div>
      </header>

      <CartIcon />

      <main className="shops-main">
        {/* HERO WITH BACKGROUND IMAGE */}
        <section
          className="shops-hero"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="shops-hero-inner">
            <p className="shops-eyebrow">SHOPS</p>
            <h1 className="shops-title">Browse Local Shops</h1>
            <p className="shops-subtitle">
              Discover nearby farms and producers and see what they&apos;re
              known for.
            </p>
          </div>
        </section>

        {/* Shops list */}
        <section className="shops-list-section">
          <div className="shops-list">
            {shops.map((shop) => (
              <article
                key={shop.id}
                className="shop-card"
                onClick={() => navigate(`/shops/${shop.id}`)}
              >
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
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
