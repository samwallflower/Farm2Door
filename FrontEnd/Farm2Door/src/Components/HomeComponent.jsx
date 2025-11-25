import React from "react";
import "./HomeComponent.css";
import bgImage from "./bg.jpg";
import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";


const HomeComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Top bar – visually matches Categories header */}
      <header className="home-header">

        <div className="home-logo">Farm2Door</div>

        <nav className="home-nav">
          <button
            className="home-nav-link active"
            onClick={() => navigate("/home")}
          >
            Home
          </button>

          <button
            className="home-nav-link"
            onClick={() => navigate("/categories")}
          >
            Categories
          </button>

          <button
            className="home-nav-link"
            onClick={() => navigate("/shops")}
          >
            Shops
          </button>

          <button
            className="home-nav-link"
            onClick={() => navigate("/user")}
          >
            Account
          </button>
        </nav>

        <div className="home-search">
          <input className="home-search-input" type="text" />
          <button className="home-search-button">
            <span className="home-search-icon">🔍</span>
          </button>
        </div>
      </header>


      <CartIcon />   {/* <-- Add this */}

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
                {/* ❌ Removed SHOP NOW button */}

                <button
                  className="home-btn home-btn-outline"
                  onClick={() => navigate("/shops")}  // ✅ FIXED
                >
                  Browse Shops
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Feature section */}
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
      </main>
    </div>
  );
};

export default HomeComponent;
