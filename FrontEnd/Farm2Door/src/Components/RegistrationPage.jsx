import React from "react";
import "./RegistrationPage.css";
import regBg from "./loginback.jpg"; // put your image in Components folder and rename if needed

const Registration = () => {
  return (
    <div
      className="reg-page"
      style={{ backgroundImage: `url(${regBg})` }}
    >
      <div className="reg-overlay">
        <div className="reg-content">
          {/* Title / branding */}
          <header className="reg-header">
            <p className="reg-always-fresh">Always Fresh</p>
            <h1 className="reg-logo">Farm2Door</h1>
            <h2 className="reg-title">Registration</h2>
          </header>

          {/* Form */}
          <main className="reg-form-wrapper">
            <form className="reg-form">
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

              {/* optional button */}
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