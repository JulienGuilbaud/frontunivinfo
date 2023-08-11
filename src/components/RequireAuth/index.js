import { Navigate } from "react-router-dom";

export function RequireAuth({ children }) {
    const token = localStorage.getItem("token");
    if (!token) {
        //si il n'y a pas d'authentification on est redirigé sur la page de connexion
        return <Navigate to="/" replace  />;
    }

    return children;
}

