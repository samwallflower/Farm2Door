// src/App.jsx
import React, { useState } from "react";
import HomeComponent from "./Components/HomeComponent.jsx";
import Shopcreation from "./Components/Shopcreation.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import RegistrationPage from "./Components/RegistrationPage.jsx";

function App() {
  const [page, setPage] = useState("home"); // 'home' | 'shops' | 'account'

  const renderPage = () => {
    switch (page) {
      case "shops":
        return <Shopcreation />;
      case "account":
        return <LoginPage />;
      case "home":
      default:
        return <HomeComponent onNavigate={setPage} />;
    }
  };

  return <div>{renderPage()}</div>;
}

export default App;
