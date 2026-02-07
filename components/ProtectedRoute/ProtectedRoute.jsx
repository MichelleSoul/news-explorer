import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, isCheckingAuth, children }) => {
    if (isCheckingAuth) return null;

    return isLoggedIn ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
