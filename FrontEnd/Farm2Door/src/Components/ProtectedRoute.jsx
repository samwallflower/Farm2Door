import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("authToken");
    const location = useLocation();

    // If not logged in, send them to /login, but remember where they came from
    if (!token) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location.pathname || "/" }}
            />
        );
    }

    // Logged in → show the protected page
    return children;
}