import React from 'react';
import './HomeComponent.css';
import bgImage from './bg.jpg';

const HomeComponent = () => {
  return (
    <div className="home-container">
      <header className="header">
        <div className="logo">Farm2Door</div>
        <nav className="nav">
          <a href="#home" className="nav-link active">Home</a>
          <a href="#categories" className="nav-link">Categories</a>
          <a href="#shops" className="nav-link">Shops</a>
          <a href="#account" className="nav-link">Account</a>
        </nav>
        <div className="search-container">
          <input type="text" className="search-input" placeholder="" />
          <button className="search-button">
            <span className="search-icon">🔍</span>
          </button>
        </div>
      </header>

      <section className="hero" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="hero-content">
          <p className="hero-subtitle">Always Fresh</p>
          <h1 className="hero-title">Farm2Door</h1>
          <p className="hero-tagline">Bring the best food right to your doorstep</p>
        </div>
      </section>
    </div>
  );
};

export default HomeComponent;