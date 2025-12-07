import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
import Categories from "./Components/Categories.jsx";
import ShopsMenu from "./Components/ShopsMenu.jsx";
import ShopDetails from "./Components/ShopDetails.jsx";
import Basket from "./Components/Basket.jsx";
import Shopcreation from "./Components/Shopcreation.jsx";

import ProtectedRoute from "./Components/ProtectedRoute";

export default function App() {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<HomeComponent />} />
                <Route path="/home" element={<HomeComponent />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/shops" element={<ShopsMenu />} />
                <Route path="/shops/:shopId" element={<ShopDetails />} />


                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Registration />} />


                <Route
                    path="/basket"
                    element={
                        <ProtectedRoute>
                            <Basket />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user"
                    element={
                        <ProtectedRoute>
                            <UserManagement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/shop-creation"
                    element={
                        <ProtectedRoute>
                            <Shopcreation />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/shop-management"
                    element={
                        <ProtectedRoute>
                            <ShopManagement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/update-info"
                    element={
                        <ProtectedRoute>
                            <UpdateInfo />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <OrderPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-product"
                    element={
                        <ProtectedRoute>
                            <AddProduct />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/update-product"
                    element={
                        <ProtectedRoute>
                            <UpdateProduct />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/product"
                    element={
                        <ProtectedRoute>
                            <ProductPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/update-shop"
                    element={
                        <ProtectedRoute>
                            <UpdateShop />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}
