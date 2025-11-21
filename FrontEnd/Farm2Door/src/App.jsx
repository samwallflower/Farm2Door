
import React, { useState } from "react";
import HomeComponent from "./Components/HomeComponent.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import Registration from "./Components/RegistrationPage.jsx";

function App() {
  // which screen are we on?
  const [page, setPage] = useState("login"); // 'login' | 'home' | 'register'

  const handleLogin = () => {
    // here you could check username/password first
    setPage("home");
  };

  const handleRegisterClick = () => setPage("register");
  const handleBackToLogin = () => setPage("login");

  let content;
  if (page === "home") {
    content = <HomeComponent onNavigate={setPage} />;
  } else if (page === "register") {
    content = <Registration onBackToLogin={handleBackToLogin} />;
  } else {
    content = (
      <LoginPage
        onLogin={handleLogin}
        onRegister={handleRegisterClick}
      />
    );
  }

  return <>{content}</>;
}

export default App;
