import React from "react";
import "./Categories.css";
import { useNavigate, useLocation } from "react-router-dom";
import CartIcon from "./CartIcon";
import PillNav from "./PillNav";
import logoImg from "./logo.png";

import heroImage from "./product5.jpg";
import cat1 from "./veg1.jpg";
import cat2 from "./veg1.jpg";
import cat3 from "./fruit.jpg";
import cat4 from "./chose.jpg";
import cat5 from "./veg1.jpg";

import fav1 from "./fruit.jpg";
import fav2 from "./fruit.jpg";
import fav3 from "./fruit.jpg";
import fav4 from "./fruit.jpg";
import fav5 from "./fruit.jpg";
import fav6 from "./fruit.jpg";
import fav7 from "./fruit.jpg";
import fav8 from "./fruit.jpg";

const categoryCards = [
  {
    title: "Fresh Vegetables",
    subtitle: "Tomatoes, lettuce, carrots, and more.",
    image: cat1,
  },
  {
    title: "Grains & Legumes",
    subtitle: "Wheat, corn, soybeans, and lentils.",
    image: cat2,
  },
  {
    title: "Seasonal Fruits",
    subtitle: "Apples, strawberries, blueberries, and peaches.",
    image: cat3,
  },
  {
    title: "Leafy Greens",
    subtitle: "Organic kale, lettuce, baby spinach, and more.",
    image: cat4,
  },
  {
    title: "Free-Range Poultry",
    subtitle: "Eggs and poultry raised with care.",
    image: cat5,
  },
];

const favorites = [
  { id: 1, name: "Heirloom Tomato", price: "$7.99", oldPrice: "$9.50", rating: 5, sale: true, image: fav1 },
  { id: 2, name: "Organic Eggplant", price: "$5.99", rating: 5, image: fav2 },
  { id: 3, name: "Soft White Wheat", price: "$8.99", rating: 5, image: fav3 },
  { id: 4, name: "Free-Range Eggs", price: "$7.99", oldPrice: "$9.50", rating: 5, sale: true, image: fav4 },
  { id: 5, name: "Organic Zucchini", price: "$4.79", oldPrice: "$5.99", rating: 5, sale: true, image: fav5 },
  { id: 6, name: "Yukon Gold Potato", price: "$5.99", rating: 5, image: fav6 },
  { id: 7, name: "Organic Peach", price: "$6.99", rating: 5, image: fav7 },
  { id: 8, name: "Bell Pepper", price: "$5.99", rating: 5, image: fav8 },
];

// same nav items as Home, but with `href`
const navItems = [
  { label: "Home", href: "/home" },
  { label: "Categories", href: "/categories" },
  { label: "Shops", href: "/shops" },
  { label: "Account", href: "/user" },
];

const Categories = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeHref =
    location.pathname === "/" ? "/home" : location.pathname;

  return (
    <div className="cat-page">
      {/* HEADER with PillNav */}
      <header className="cat-header">
        {/* left text logo */}
        <div className="cat-logo-text">Farm2Door</div>

        {/* center pill nav */}
        <div className="cat-header-center">
          <PillNav
            logo={logoImg}
            items={navItems}
            activeHref={activeHref}
            baseColor="#ffffff"
            pillColor="#3e3625"
            hoveredPillTextColor="#3e3625"
          />
        </div>
      </header>

      {/* floating cart icon */}
      <CartIcon />

      <main className="cat-main">
        {/* HERO */}
        <section
          className="cat-hero"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="cat-hero-inner">
            <div className="cat-hero-text">
              <p className="cat-eyebrow">FARM2DOOR</p>
              <h1>Fresh. Local. Organic.</h1>
              <p className="cat-hero-description">
                Shop our seasonal produce and pantry staples — harvested with love.
              </p>
              <p className="cat-info-text">Explore our fresh categories below.</p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="cat-features">
          <div className="cat-features-inner">
            <div className="cat-feature">
              <h3>Family-Owned &amp; Operated</h3>
              <p>We’ve been growing with care for generations.</p>
            </div>
            <div className="cat-feature">
              <h3>Seasonal Farm Boxes</h3>
              <p>What’s fresh, local, and in-season.</p>
            </div>
            <div className="cat-feature">
              <h3>Sustainable &amp; Eco-Friendly</h3>
              <p>Regenerative farming and minimal packaging.</p>
            </div>
            <div className="cat-feature">
              <h3>Delivered to Your Door</h3>
              <p>Flexible subscription and pickup options.</p>
            </div>
          </div>
        </section>

        {/* CATEGORY GRID */}
        <section className="cat-categories">
          <p className="cat-section-eyebrow">Shop by category</p>

          <div className="cat-category-row">
            {categoryCards.map((c) => (
              <article className="cat-category-card" key={c.title}>
                <div className="cat-category-image-wrap">
                  <img src={c.image} alt={c.title} />
                </div>

                <div className="cat-category-info">
                  <h3>{c.title}</h3>
                  <p>{c.subtitle}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* FAVORITES */}
        <section className="cat-favorites">
          <h2 className="cat-fav-title">This Week&apos;s Favorites</h2>

          <div className="cat-fav-grid">
            {favorites.map((item) => (
              <article className="cat-fav-card" key={item.id}>
                {item.sale && <span className="cat-sale-tag">SALE</span>}

                <div className="cat-fav-image-wrap">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cat-fav-body">
                  <h3>{item.name}</h3>
                  <div className="cat-fav-rating">
                    {"★".repeat(item.rating)}
                  </div>

                  <div className="cat-fav-price">
                    <span className="cat-price">{item.price}</span>
                    {item.oldPrice && (
                      <span className="cat-old-price">{item.oldPrice}</span>
                    )}
                  </div>

                  <button
                    className="cat-btn cat-btn-small cat-btn-outline"
                    type="button"
                    onClick={() => navigate("/basket")}
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* PROMO */}
        <section className="cat-promo">
          <div className="cat-promo-inner">
            <div className="cat-promo-text">
              <h2>Your Organic Essentials, Delivered</h2>
              <p>Freshly picked organic produce delivered weekly.</p>

              <ul>
                <li>Always seasonal.</li>
                <li>Curated by farmers.</li>
                <li>Cancel anytime.</li>
              </ul>

              <p className="cat-info-text">Join our weekly organic program.</p>
            </div>

            <div className="cat-promo-image-placeholder"></div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Categories;
