import React from "react";
import "./LoginPage.css";
import bgImage from "./bg.jpg"; // make sure this image exists in the Components folder

const LoginPage = ({ onRegister }) => {
  const handleRegisterClick = () => {
    // if you pass a function from App.jsx, use that
    if (onRegister) {
      onRegister();
    } else {
      console.log("Register clicked");
    }
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="login-overlay">
        <div className="login-content">
          {/* Brand / title */}
          <header className="login-header">
            <p className="login-always-fresh">Always Fresh</p>
            <h1 className="login-logo">Farm2Door</h1>
            <h2 className="login-title">Login</h2>
          </header>

          {/* Form */}
          <main className="login-form-wrapper">
            <form className="login-form">
              <label className="login-input-pill">
                <span>Username</span>
                <input type="text" placeholder="Username" />
              </label>

              <label className="login-input-pill">
                <span>Password</span>
                <input type="password" placeholder="Password" />
              </label>

              <div className="login-actions">
                <button type="submit" className="login-submit-btn">
                  Login
                </button>

                <button
                  type="button"
                  className="login-register-btn"
                  onClick={handleRegisterClick}
                >
                  Register
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;