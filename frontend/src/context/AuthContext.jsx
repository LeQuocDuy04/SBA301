/**
 * Author: Lê Quốc Duy
 * Authentication context: JWT persistence and role-aware session
 */
import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {api} from '../api/http';

const AuthContext = createContext(null);
const readUser = () => {
    try {
        return JSON.parse(localStorage.getItem('fuminihotel_user') || 'null');
    } catch {
        return null;
    }
};

export function AuthProvider({children}) {
    const [user, setUser] = useState(readUser);
    const [token, setToken] = useState(() => localStorage.getItem('fuminihotel_token'));

    const login = async (email, password) => {
        const {data} = await api.login({email, password});
        localStorage.setItem('fuminihotel_token', data.token);
        const nextUser = {email: data.email, role: data.role};
        localStorage.setItem('fuminihotel_user', JSON.stringify(nextUser));
        setToken(data.token);
        setUser(nextUser);
        return data;
    };
    const logout = () => {
        localStorage.removeItem('fuminihotel_token');
        localStorage.removeItem('fuminihotel_user');
        setToken(null);
        setUser(null);
    };

    useEffect(() => {
        const expire = () => logout();
        window.addEventListener('auth:expired', expire);
        return () => window.removeEventListener('auth:expired', expire);
    }, []);

    const value = useMemo(() => ({
        user, token, isAuthenticated: Boolean(token && user),
        isStaff: user?.role === 'STAFF', isCustomer: user?.role === 'CUSTOMER',
        login, logout
    }), [user, token]);
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
