////dans un fichier AuthContext.js que j'ai créer à la racine du front
import { createContext, useContext, useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
const AuthContext = createContext(); // Ici je crée le contexte react pour partager des données entre les composants de l'appli

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => { // Ici je crée un état local avec useState qui contient les informations de l'utilisateur authentifié et setUser pour mettre à jour cet état
        const token = localStorage.getItem('token'); // Je récupère le token créer à la connexion de l'utilisateur dans le local storage
        const decodedToken = token ? jwt.decode(token) : null; // Je vérifie si un token existe, s'il existe je le décode avec jwt.decode
        //console.log('Decoded Token:', decodedToken);
        return decodedToken;
    });


    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>; // Ici le composant AuthProvider fournit les valeurs "user" et "setUser" aux composants enfants, donc tous les enfants qui sont entourés par ce composant ont accès aux valeurs
}

export function useAuth() { // Ici c'est un hook personnalisé qui me permet d'acceder aux valeurs facilement depuis les enfants
    return useContext(AuthContext);
}