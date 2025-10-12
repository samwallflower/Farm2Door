import React from 'react';
import './LoginPage.css';

function LoginPage() {
  const handleUserLogin = () => {
    console.log('User login clicked');
    // Add your user login logic here
  };

  const handleShopOwnerLogin = () => {
    console.log('Shop owner login clicked');
    // Add your shop owner login logic here
  };

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      
      <div className="login-content">
        <div className="branding">
          <p className="branding-tagline">Always Fresh</p>
          <h1 className="branding-name">Farm2Door</h1>
          <p className="branding-subtitle">Bring the best food right to your doorstep</p>
        </div>

        <div className="login-options">
          <button 
            className="login-button"
            onClick={handleUserLogin}
          >
            Login as a user
          </button>

          <button 
            className="login-button"
            onClick={handleShopOwnerLogin}
          >
            Login as a shop-owner
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;