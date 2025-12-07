import React, { useEffect, useState } from "react";
import "./Categories.css";
import { useNavigate, useLocation } from "react-router-dom";

import CartIcon from "./CartIcon";
import PillNav from "./PillNav";
import logoImg from "./logo.png";

// images
import heroImage from "./product5.jpg";
import cat1 from "./veg1.jpg";
import cat3 from "./grains.jpg";
import cat4 from "./chose.jpg";
import cat5 from "./Meats.jpg";

import fav1 from "./fruit.jpg"; // fallback image

import { fetchProductsByCategory, addItemToCart ,fetchImagesForProduct} from "../api/client";
import productPlaceholder from "./Product.jpg";

const categoryCards = [
    { id: "Vegetables", title: "Vegetables", subtitle: "Fresh everyday veggies.", image: cat1 },
    { id: "Fruits", title: "Fruits", subtitle: "Seasonal and sweet fruits.", image: fav1 },
    { id: "Grains", title: "Grains", subtitle: "Rice, wheat, oats & more.", image: cat3 },
    { id: "Dairy", title: "Dairy", subtitle: "Milk and products", image: cat4 },
    { id: "Meats", title: "Meats", subtitle: "Farm-fresh eggs & chicken,Beef.", image: cat5 },
];


const navItems = [
  { label: "Home", href: "/home" },
  { label: "Categories", href: "/categories" },
  { label: "Shops", href: "/shops" },
  { label: "Account", href: "/user" },
];

const Categories = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeHref = location.pathname === "/" ? "/home" : location.pathname;
    const API_BASE =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

// Build a full download URL from an image id
    const buildImageUrlFromId = (imageId) => {
        const base = API_BASE.replace(/\/$/, ""); // remove trailing slash
        return `${base}/images/image/download/${imageId}`;
    };

    const getProductImage = (product) => {
        // 1) Direct URL from backend
        if (product.imageUrl && product.imageUrl.startsWith("http")) {
            return product.imageUrl;
        }

        // 2) If product has an images array
        const firstImage = product.images?.[0] || null;
        if (firstImage) {
            // if backend sends downloadUrl / imageUrl directly
            if (firstImage.downloadUrl && firstImage.downloadUrl.startsWith("http")) {
                return firstImage.downloadUrl;
            }
            if (firstImage.imageUrl && firstImage.imageUrl.startsWith("http")) {
                return firstImage.imageUrl;
            }
            if (firstImage.id != null) {
                return buildImageUrlFromId(firstImage.id);
            }
        }

        // 3) Fallback placeholder
        return productPlaceholder;
    };




    const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
    const handleAddToCart = async (product) => {
        try {
            // 1) Add to backend cart (server uses authenticated user via JWT)
            await addItemToCart(product.id, 1);

            // 2) Also add to localStorage so Basket shows the item
            const raw = localStorage.getItem("cartItems");
            let cart = [];
            try {
                cart = raw ? JSON.parse(raw) : [];
            } catch {
                cart = [];
            }

            const existing = cart.find((i) => i.id === product.id);

            if (existing) {
                existing.quantity += 1;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    imageUrl:
                        product.imageUrl ||
                        product.images?.[0]?.downloadUrl ||
                        product.image ||
                        fav1,
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(cart));

            // 3) Confirmation (you can replace alert with a toast later)
            alert("Added to cart!");
        } catch (err) {
            console.error("Add to cart failed", err);
            alert(
                err.response?.data?.message ||
                "Failed to add item to cart. Please log in first."
            );
        }
    };

  useEffect(() => {
    if (selectedCategory != null) {
      loadProducts(selectedCategory);
    }
  }, [selectedCategory]);

  const loadProducts = async (categoryName) => {
    try {
      const data = await fetchProductsByCategory(categoryName);
      setProducts(data || []);
    } catch (err) {
      console.error("Failed to load products:", err);
      setProducts([]);
    }
  };

  return (
    <div className="cat-page">
      <header className="cat-header">
        <div className="cat-logo-text">Farm2Door</div>

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

        {/* CATEGORY GRID */}
        <section className="cat-categories">
          <p className="cat-section-eyebrow">Shop by category</p>

          <div className="cat-category-row">
            {categoryCards.map((c) => (
              <article
                key={c.id}
                className="cat-category-card"
                onClick={() => setSelectedCategory(c.id)}
              >
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

        {/* PRODUCT SECTION */}
        <section className="cat-products-section">
          <h2 className="cat-fav-title">
            {selectedCategory ? `Products - ${selectedCategory}` : "Select a category"}
          </h2>

          <div className="cat-products-grid">
            {/* No products */}
            {products.length === 0 && selectedCategory !== null && (
              <p>No products available for this category.</p>
            )}

            {/* Products */}
            {products.map((item) => (
              <div key={item.id} className="cat-product-card">
                <div className="cat-fav-image-wrap">
                    <img src={getProductImage(item)} alt={item.name} />
                </div>

                <h3>{item.name}</h3>

                <p className="cat-price">${item.price}</p>

                  <button
                      className="cat-btn cat-btn-small cat-btn-outline"
                      onClick={() => handleAddToCart(item)}
                  >
                      Add to Cart
                  </button>

              </div>
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
