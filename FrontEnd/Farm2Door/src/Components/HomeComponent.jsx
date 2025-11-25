import React from "react";
import "./HomeComponent.css";
import bgImage from "./bg.jpg";
import { Link, useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">Farm2Door</div>

        {/* NAVIGATION BAR */}
        <nav className="nav">
          <Link className="nav-link active" to="/home">
            Home
          </Link>

          <Link className="nav-link" to="/categories">
            Categories
          </Link>

          <Link className="nav-link" to="/shops">
            Shops
          </Link>

          <Link className="nav-link" to="/account">
            Account
          </Link>
        </nav>

        {/* SEARCH BAR */}
        <div className="search-container">
          <input type="text" className="search-input" placeholder="" />
          <button className="search-button">
            <span className="search-icon">🔍</span>
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="hero-content">
          <p className="hero-subtitle">Always Fresh</p>
          <h1 className="hero-title">Farm2Door</h1>
          <p className="hero-tagline">
            Bring the best food right to your doorstep
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomeComponent;
