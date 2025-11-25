import React from "react";
import "./Categories.css";

import heroImage from "./back3.jpg";
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
  {
    id: 1,
    name: "Heirloom Tomato",
    price: "$7.99",
    oldPrice: "$9.50",
    rating: 5,
    sale: true,
    image: fav1,
  },
  {
    id: 2,
    name: "Organic Eggplant",
    price: "$5.99",
    rating: 5,
    image: fav2,
  },
  {
    id: 3,
    name: "Soft White Wheat",
    price: "$8.99",
    rating: 5,
    image: fav3,
  },
  {
    id: 4,
    name: "Free-Range Eggs",
    price: "$7.99",
    oldPrice: "$9.50",
    rating: 5,
    sale: true,
    image: fav4,
  },
  {
    id: 5,
    name: "Organic Zucchini",
    price: "$4.79",
    oldPrice: "$5.99",
    rating: 5,
    sale: true,
    image: fav5,
  },
  {
    id: 6,
    name: "Yukon Gold Potato",
    price: "$5.99",
    rating: 5,
    image: fav6,
  },
  {
    id: 7,
    name: "Organic Peach",
    price: "$6.99",
    rating: 5,
    image: fav7,
  },
  {
    id: 8,
    name: "Bell Pepper",
    price: "$5.99",
    rating: 5,
    image: fav8,
  },
];

const Categories = ({ onNavigate }) => {
  const goTo = (page) => onNavigate && onNavigate(page);

  return (
    <div className="cat-page">
      {/* Simple top bar – hook into your existing nav if you like */}
      <header className="cat-header">
        <div className="cat-logo">Farm2Door</div>
        <nav className="cat-nav">
          <button onClick={() => goTo("home")}>Home</button>
          <button className="active">Categories</button>
          <button onClick={() => goTo("shops")}>Shops</button>
          <button onClick={() => goTo("account")}>Account</button>
        </nav>
      </header>

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
                Shop our seasonal produce and pantry staples — harvested with
                love from the family farm.
              </p>
              <div className="cat-hero-buttons">
                <button className="cat-btn cat-btn-primary">Shop Now</button>
                <button className="cat-btn cat-btn-outline">
                  Weekly Farm Box
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="cat-features">
          <div className="cat-features-inner">
            <div className="cat-feature">
              <h3>Family-Owned &amp; Operated</h3>
              <p>
                We&apos;ve been growing with care for generations, right here on
                our land.
              </p>
            </div>
            <div className="cat-feature">
              <h3>Seasonal Farm Boxes</h3>
              <p>Get a rotating selection of what&apos;s fresh, local, and in-season.</p>
            </div>
            <div className="cat-feature">
              <h3>Sustainable &amp; Eco-Friendly</h3>
              <p>We use regenerative farming methods and minimal packaging.</p>
            </div>
            <div className="cat-feature">
              <h3>Delivered to Your Door</h3>
              <p>Flexible subscription and pickup options made exactly for you.</p>
            </div>
          </div>
        </section>

        {/* CATEGORIES ROW */}
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

        {/* FAVORITES GRID */}
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
                  <button className="cat-btn cat-btn-small cat-btn-outline">
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="cat-browse-all">
            <button className="cat-btn cat-btn-primary">
              Browse All Products
            </button>
          </div>
        </section>

        {/* BOTTOM PROMO BANNER */}
        <section className="cat-promo">
          <div className="cat-promo-inner">
            <div className="cat-promo-text">
              <h2>Your Organic Essentials, Delivered</h2>
              <p>
                Get a box of freshly picked organic produce and pantry goods
                delivered straight to your door every week.
              </p>
              <ul>
                <li>Always seasonal, always local.</li>
                <li>Curated by farmers who know their fields.</li>
                <li>Skip, pause, or cancel anytime.</li>
              </ul>
              <button className="cat-btn cat-btn-dark">
                Start Your Farm Box
              </button>
            </div>
            <div className="cat-promo-image-placeholder">
              {/* You can replace this with an <img /> if you have one */}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Categories;
