import React from "react";
import "./RegistrationPage.css";
import regBg from "./loginback.jpg";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div
      className="reg-page"
      style={{ backgroundImage: `url(${regBg})` }}
    >
      <div className="reg-overlay">
        <div className="reg-content">

          <header className="reg-header">
            <p className="reg-always-fresh">Always Fresh</p>
            <h1 className="reg-logo">Farm2Door</h1>
            <h2 className="reg-title">Registration</h2>
          </header>

          <main className="reg-form-wrapper">
            <form className="reg-form" onSubmit={handleSubmit}>
              <label className="reg-input-pill">
                <span>First Name</span>
                <input type="text" placeholder="First Name" />
              </label>

              <label className="reg-input-pill">
                <span>Last Name</span>
                <input type="text" placeholder="Last Name" />
              </label>

              <label className="reg-input-pill">
                <span>Email</span>
                <input type="email" placeholder="Email" />
              </label>

              <label className="reg-input-pill">
                <span>Password</span>
                <input type="password" placeholder="Password" />
              </label>

              <button type="submit" className="reg-submit-btn">
                Sign Up
              </button>
            </form>
          </main>

        </div>
      </div>
    </div>
  );
};

export default Registration;
