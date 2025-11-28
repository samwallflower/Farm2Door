import React from "react";
import "./ShopDetails.css";
import { useNavigate, useParams } from "react-router-dom";

import CartIcon from "./CartIcon";
import PillNav from "./PillNav";
import logoImg from "./logo.png"; // <-- use your real logo here
import productPlaceholder from "./Product.jpg"; // placeholder, replace per product later

// Dummy data – replace with API data later
const mockShops = [
  {
    id: "1",
    name: "Green Valley Farm",
    address: "123 Farm Lane, Green Valley",
    description: "Local, seasonal produce grown with sustainable practices.",
    products: [
      {
        id: "p1",
        name: "Farm Fresh Veggie Box",
        price: "€24.99",
        amount: "1 box",
        image: productPlaceholder,
      },
      {
        id: "p2",
        name: "Organic Carrots",
        price: "€3.50",
        amount: "1 kg",
        image: productPlaceholder,
      },
      {
        id: "p3",
        name: "Mixed Herbs Bundle",
        price: "€2.99",
        amount: "1 bundle",
        image: productPlaceholder,
      },
    ],
  },
  {
    id: "2",
    name: "Sunrise Orchard",
    address: "45 Orchard Road, Riverside",
    description: "Apples, pears, and fresh-pressed seasonal juices.",
    products: [
      {
        id: "p4",
        name: "Apple Crate",
        price: "€19.99",
        amount: "5 kg",
        image: productPlaceholder,
      },
      {
        id: "p5",
        name: "Fresh Apple Juice",
        price: "€4.50",
        amount: "1 L bottle",
        image: productPlaceholder,
      },
    ],
  },
];

// same nav items as other pages
const navItems = [
  { label: "Home", href: "/home" },
  { label: "Categories", href: "/categories" },
  { label: "Shops", href: "/shops" },
  { label: "Account", href: "/user" },
];

export default function ShopDetails() {
  const navigate = useNavigate();
  const { shopId } = useParams(); // /shops/:shopId

  const shop = mockShops.find((s) => s.id === shopId) || mockShops[0];

  return (
    <div className="sd-page">
      {/* HEADER with PillNav */}
      <header className="sd-header">
        {/* left text logo */}
        <div className="sd-logo-text">Farm2Door</div>

        {/* center pill nav (Shops active) */}
        <div className="sd-header-center">
          <PillNav
            logo={logoImg}
            items={navItems}
            activeHref="/shops"
            baseColor="#ffffff"
            pillColor="#3e3625"
            hoveredPillTextColor="#3e3625"
          />
        </div>
      </header>

      {/* floating cart icon */}
      <CartIcon />

      <main className="sd-main">
        {/* Shop hero / summary */}
        <section className="sd-hero">
          <div className="sd-hero-inner">
            <div className="sd-hero-text">
              <p className="sd-eyebrow">Shop</p>
              <h1 className="sd-title">{shop.name}</h1>
              <p className="sd-address">{shop.address}</p>
              {shop.description && (
                <p className="sd-description">{shop.description}</p>
              )}

              <button
                className="sd-btn sd-btn-outline"
                onClick={() => navigate("/shops")}
              >
                ← Back to Shops
              </button>
            </div>
          </div>
        </section>

        {/* Products list */}
        <section className="sd-products-section">
          <h2 className="sd-products-title">Products</h2>

          <div className="sd-products-grid">
            {shop.products.map((product) => (
              <article key={product.id} className="sd-product-card">
                <div className="sd-product-image-wrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="sd-product-image"
                  />
                </div>

                <div className="sd-product-header">
                  <h3 className="sd-product-name">{product.name}</h3>
                </div>

                <div className="sd-product-meta">
                  <span className="sd-product-price">{product.price}</span>
                  <span className="sd-product-amount">{product.amount}</span>
                </div>

                <button
                  className="sd-btn sd-btn-primary sd-add-btn"
                  type="button"
                  // TODO: wire to real cart logic
                  onClick={() => {
                    console.log("Add to cart:", product.id);
                  }}
                >
                  Add to Cart
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
