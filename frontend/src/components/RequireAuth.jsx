/**
 * Author: Lê Quốc Duy
 * Route guard for authenticated roles
 */
import React from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

export default function RequireAuth({role, children}) {
    const {isAuthenticated, user} = useAuth();
    const location = useLocation();
    if (!isAuthenticated) return <Navigate to="/login" replace state={{from: location}}/>;
    if (role && user?.role !== role) return <Navigate to="/" replace/>;
    return children;
}
