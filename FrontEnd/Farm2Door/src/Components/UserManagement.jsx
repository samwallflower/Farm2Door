import React from "react";
import "./UserManagement.css";
import sampleProduct from "./Product.jpg";
import { useNavigate } from "react-router-dom";
import CartIcon from "./CartIcon";
import PillNav from "./PillNav";
import logoImg from "./logo.png";


const navItems = [
  { label: "Home", href: "/home" },
  { label: "Categories", href: "/categories" },
  { label: "Shops", href: "/shops" },
  { label: "Account", href: "/user" },
];

export default function UserManagement() {
  const navigate = useNavigate();

  return (
    <div className="um-page">
      <header className="um-header">
        <div className="um-logo-text">Farm2Door</div>

        <div className="um-header-center">
          <PillNav
            logo={logoImg}
            items={navItems}
            activeHref="/user"
            baseColor="#ffffff"
            pillColor="#3e3625"
            hoveredPillTextColor="#3e3625"
          />
        </div>
      </header>

      <CartIcon />

      <main className="um-main">
        <h1 className="um-page-title">User Management</h1>

        <div className="um-grid">
          {/* ORDERS */}
          <section className="um-card um-orders">
            <h2 className="um-section-title">Recent Orders</h2>

            <div className="um-order-card">
              <div className="um-order-image-wrap">
                <img
                  src={sampleProduct}
                  alt="product"
                  className="um-product-img"
                />
              </div>
              <div className="um-order-text">
                <p className="um-order-name">Farm Fresh Veggie Box</p>
                <p className="um-order-meta">Order #12345 · $39.99</p>
              </div>
            </div>

            <div className="um-order-card">
              <div className="um-order-image-wrap">
                <img
                  src={sampleProduct}
                  alt="product"
                  className="um-product-img"
                />
              </div>
              <div className="um-order-text">
                <p className="um-order-name">Seasonal Fruit Crate</p>
                <p className="um-order-meta">Order #12344 · $29.99</p>
              </div>
            </div>

            <button className="um-btn um-btn-outline um-full-width">
              View All Orders
            </button>
          </section>

          {/* ACCOUNT INFO */}
          <section className="um-card um-account">
            <h2 className="um-section-title">Account Info</h2>

            <div className="um-input-group">
              <label>Name</label>
              <input type="text" placeholder="Jane Doe" />
            </div>

            <div className="um-input-group">
              <label>Address</label>
              <input
                type="text"
                placeholder="123 Farm Lane, Green Valley"
              />
            </div>

            <div className="um-input-group">
              <label>Phone Number</label>
              <input type="text" placeholder="+1 (555) 123-4567" />
            </div>

            <div className="um-input-group">
              <label>Billing Method</label>
              <input type="text" placeholder="Visa •••• 4242" />
            </div>

            <div className="um-input-group">
              <label>Email Address</label>
              <input type="text" placeholder="jane@example.com" />
            </div>

            <button
              className="um-btn um-btn-primary um-full-width"
              onClick={() => navigate("/update-info")}
            >
              Update Info
            </button>
          </section>

          <section className="um-card um-contact">
            <h2 className="um-section-title">Contact Support</h2>

            <p className="um-support-text">
              Need help with an order, your account, or your farm box? We’re
              here for you.
            </p>

            <div className="um-input-group">
              <label>Phone Number</label>
              <input type="text" placeholder="+1 (800) 000-0000" />
            </div>

            <div className="um-input-group">
              <label>Email</label>
              <input type="text" placeholder="support@farm2door.com" />
            </div>

            <button
              className="um-btn um-btn-outline um-full-width"
              onClick={() => navigate("/shop-management")}
            >
              Shop Management Menu
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
