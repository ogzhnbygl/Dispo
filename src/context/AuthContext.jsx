import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        // Local Development Mock
        if (import.meta.env.DEV) {
            console.log('DEV MODE: Simulating authenticated user for localhost');
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            setUser({
                id: 'mock-user-id',
                email: 'dev@wildtype.app',
                name: 'Developer Mode',
                role: 'admin' // Mock role if needed
            });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('https://wildtype.app/api/auth/me', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include' // Important: Sends the HttpOnly cookie
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                // If 401/403 or other error, redirect to login
                console.warn('Authentication failed, redirecting to login...');
                window.location.href = 'https://wildtype.app/login';
            }
        } catch (error) {
            console.error('Auth check error:', error);
            // On network error, you might want to retry or redirect. 
            // For now, redirecting to be safe/consistent with "secure by default".
            window.location.href = 'https://wildtype.app/login';
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        // Redirect to main app for logout handling
        window.location.href = 'https://wildtype.app';
    };

    useEffect(() => {
        checkAuth();
    }, []);

    if (loading) {
        // Simple loading state
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-slate-500 animate-pulse">Yükleniyor...</div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
