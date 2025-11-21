import React from "react";
import "./LoginPage.css";
import bgImage from "./loginback.jpg"; // make sure this exists

const LoginPage = ({ onLogin, onRegister }) => {
  const handleSubmit = (e) => {
    e.preventDefault();          // stop page refresh
    if (onLogin) onLogin();      // go to home page
  };

  return (
    <div
      className="login-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="login-overlay">
        <div className="login-content">
          <header className="login-header">
            <p className="login-always-fresh">Always Fresh</p>
            <h1 className="login-logo">Farm2Door</h1>
            <h2 className="login-title">Login</h2>
          </header>

          <main className="login-form-wrapper">
            <form className="login-form" onSubmit={handleSubmit}>
              <label className="login-input-pill">
                <span>Username</span>
                <input type="text" placeholder="Username" />
              </label>

              <label className="login-input-pill">
                <span>Password</span>
                <input type="password" placeholder="Password" />
              </label>

              <div className="login-actions">
                {/* This submits the form -> handleSubmit -> onLogin -> Home */}
                <button type="submit" className="login-submit-btn">
                  Login
                </button>

                {/* This switches to the registration page */}
                <button
                  type="button"
                  className="login-register-btn"
                  onClick={onRegister}
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
