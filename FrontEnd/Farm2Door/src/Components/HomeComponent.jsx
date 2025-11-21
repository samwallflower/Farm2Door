import React from "react";
import "./HomeComponent.css";
import bgImage from "./bg.jpg";

const HomeComponent = ({ onNavigate }) => {
  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">Farm2Door</div>

        <nav className="nav">
          <button
            className="nav-link active"
            onClick={() => onNavigate("home")}
          >
            Home
          </button>

          <button
            className="nav-link"
            onClick={() => onNavigate("categories")}
          >
            Categories
          </button>

          <button
            className="nav-link"
            onClick={() => onNavigate("shops")}
          >
            Shops
          </button>

          <button
            className="nav-link"
            onClick={() => onNavigate("account")}
          >
            Account
          </button>
        </nav>

        <div className="search-container">
          <input type="text" className="search-input" placeholder="" />
          <button className="search-button">
            <span className="search-icon">🔍</span>
          </button>
        </div>
      </header>

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