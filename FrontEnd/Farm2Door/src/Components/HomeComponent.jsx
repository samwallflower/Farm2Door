import React from "react";
import "./HomeComponent.css";
import bgImage from "./bg.jpg";
import { useLocation } from "react-router-dom";
import CartIcon from "./CartIcon";
import PillNav from "./PillNav";
import logoImg from "./logo.png";


const navItems = [
  { label: "Home", href: "/home" },
  { label: "Categories", href: "/categories" },
  { label: "Shops", href: "/shops" },
  { label: "Account", href: "/user" },
];

const HomeComponent = () => {
  const location = useLocation();

  // treat "/" as "/home"
  const activeHref =
    location.pathname === "/" ? "/home" : location.pathname;

  return (
    <div className="home-page">
      {/* HEADER */}
      <header className="home-header">
        {/* left text logo */}
        <div className="home-logo-text">Farm2Door</div>

        {/* center pill nav */}
        <div className="home-header-center">
          <PillNav
            logo={logoImg}
            items={navItems}
            activeHref={activeHref}
            baseColor="#ffffff"
            pillColor="#3e3625"
            hoveredPillTextColor="#3e3625"
          />
        </div>

        {/* right search */}
        <div className="home-search">
          <input className="home-search-input" type="text" />
          <button className="home-search-button">
            <span className="home-search-icon">🔍</span>
          </button>
        </div>
      </header>

      {/* floating cart icon */}
      <CartIcon />

      {/* MAIN CONTENT */}
      <main className="home-main">
        {/* HERO WITH BACKGROUND IMAGE */}
        <section
          className="home-hero"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="home-hero-inner">
            <div className="home-hero-card">
              <p className="home-eyebrow">Always Fresh</p>
              <h1 className="home-title">Farm2Door</h1>
              <p className="home-subtitle">
                Bring the best food right to your doorstep.
              </p>

              <div className="home-hero-buttons">
                <button
                  className="home-btn home-btn-outline"
                  onClick={() => (window.location.href = "/shops")}
                >
                  Browse Shops
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="home-features">
          <div className="home-features-inner">
            <div className="home-feature">
              <h3>Local &amp; Seasonal</h3>
              <p>Fresh picks from nearby farms, updated every week.</p>
            </div>
            <div className="home-feature">
              <h3>From Farm to Door</h3>
              <p>Cold-chain delivery keeps your produce crisp and tasty.</p>
            </div>
            <div className="home-feature">
              <h3>Fair to Farmers</h3>
              <p>Transparent pricing that supports local growers.</p>
            </div>
            <div className="home-feature">
              <h3>Easy Ordering</h3>
              <p>Shop by category, by shop, or with a weekly farm box.</p>
            </div>

          </div>
        </section>
          <div className="home-login-cta">
              <button
                  className="home-login-btn"
                  onClick={() => (window.location.href = "/login")}
              >
                  Log In to Start Ordering →
              </button>
          </div>
      </main>

    </div>
  );
};

export default HomeComponent;
