// src/App.jsx
import React, { useState } from "react";
import HomeComponent from "./Components/HomeComponent.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import Registration from "./Components/Registration.jsx";

function App() {
  const [page, setPage] = useState("login"); // 'home' | 'login' | 'register'

  const renderPage = () => {
    switch (page) {
      case "home":
        return <HomeComponent onNavigate={setPage} />;

      case "register":
        return (
          <Registration
            onBackToLogin={() => setPage("login")}
          />
        );

      case "login":
      default:
        return (
          <LoginPage
            onRegister={() => setPage("register")}
          />
        );
    }
  };

  return <div>{renderPage()}</div>;
}

export default App;