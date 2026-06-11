import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/authstore';

const ProtectedRoute = ({ children }: { children: React.ReactNode}) => {
    const {isAuthenticated} = useAuthStore();

    if (!isAuthenticated()) {
        return <Navigate to= "/login" />;
    }
    return <>{children}</>
};

export default ProtectedRoute;
