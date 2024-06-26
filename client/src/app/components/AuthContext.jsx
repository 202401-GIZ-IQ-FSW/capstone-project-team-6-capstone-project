"use client";
import { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create a provider component
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [signedIn, setSignedIn] = useState(false);

    // console.log("AuthContext user", user)
    useEffect(() => {
        const fetchUserSession = async () => {
          try {
            console.log('Fetching user session...');
            const response = await fetch('http://localhost:3001/user/session', {
              credentials: 'include'
            });
            const data = await response.json();
            console.log('Response:', response);
            console.log('Data:', data);
      
            if (response.ok) {
              setUser(data.user);
              setSignedIn(true);
            } else {
              setUser(null);
              setSignedIn(false);
            }
          } catch (error) {
            console.error('Error fetching user session:', error);
          }
        };
      
        fetchUserSession();
    }, []);      

    return (
        <AuthContext.Provider value={{ user, setUser , signedIn, setSignedIn}}>
            {children}
        </AuthContext.Provider>
    );
}

// Create a custom hook to use the AuthContext
export function useAuth() {
    return useContext(AuthContext);
}
