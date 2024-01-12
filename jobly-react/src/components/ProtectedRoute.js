import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// wrapper component that ensures user logs into app
const ProtectedRoute = ({ element, ...rest }) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
        return <Navigate to="/login" />;
    }

    return <Route element={element} {...rest} />;
};

export default ProtectedRoute;
