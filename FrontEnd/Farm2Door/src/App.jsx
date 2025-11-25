import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// PAGE IMPORTS
import HomeComponent from "./Components/HomeComponent.jsx";
import LoginPage from "./Components/LoginPage.jsx";
import Registration from "./Components/RegistrationPage.jsx";
import UserManagement from "./Components/UserManagement.jsx";
import UpdateInfo from "./Components/UpdateInfo.jsx";
import OrderPage from "./Components/OrderPage.jsx";
import AddProduct from "./Components/AddProduct.jsx";
import UpdateProduct from "./Components/UpdateProduct.jsx";
import ProductPage from "./Components/ProductPage.jsx";
import UpdateShop from "./Components/UpdateShop.jsx";
import ShopManagement from "./Components/ShopManagement.jsx";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* AUTH PAGES */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Registration />} />

        {/* HOME */}
        <Route path="/home" element={<HomeComponent />} />

        {/* USER MANAGEMENT */}
        <Route path="/user" element={<UserManagement />} />
        <Route path="/update-info" element={<UpdateInfo />} />

        {/* ORDERS */}
        <Route path="/orders" element={<OrderPage />} />

        {/* PRODUCT MANAGEMENT */}
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/update-product" element={<UpdateProduct />} />
        <Route path="/product" element={<ProductPage />} />

        {/* SHOP MANAGEMENT */}
        <Route path="/update-shop" element={<UpdateShop />} />
        <Route path="/shop-management" element={<ShopManagement />} />


      </Routes>
    </Router>
  );
}
