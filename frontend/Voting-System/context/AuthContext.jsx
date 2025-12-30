import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggenIn] = useState(!!localStorage.getItem("token"));
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const decodeJwt = (token) => {
        try {
            const payloadBase64 = token.split(".")[1];
            const decoded = JSON.parse(atob(payloadBase64));
            return decoded;
        } catch (error) {
            console.error("Failed to decode token", error);
            return null;
        }
    }
   
    const loadRoleFromToken = useCallback((token) => {
        const payload = decodeJwt(token);

        if(payload){
            setRole(payload.role);
            localStorage.setItem("role",role);
        }
    })

    useEffect(()=>{
        if(token){
            loadRoleFromToken(token);
        }
    },[token,loadRoleFromToken]);

    useEffect(() => {
        const updateAuth = () => {
            setIsLoggenIn(!!localStorage.getItem("token"))
        };

        window.addEventListener("authChange", updateAuth);
        return () => window.removeEventListener("authChange",updateAuth);

    }, [])

    const login = (token) => {
        localStorage.setItem("token", token);
        setIsLoggenIn(true);
        loadRoleFromToken(token);

        window.dispatchEvent(new Event("authChange"));
        toast.success("Successfully Logged In");
        navigate("/election/details");
    }

    const logout = () =>{
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        setRole(null);
        setIsLoggenIn(false);

        window.dispatchEvent(new Event("authChange"));
        toast.success("Successfully Logged Out");
        navigate("/");
    };

    const value = { isLoggedIn , role , login , logout};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}