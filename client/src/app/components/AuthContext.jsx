"use client";
import { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(null);
  // const [signedIn, setSignedIn] = useState( () => {
  //   if (typeof window !== 'undefined') {
  //     return localStorage.getItem('signedIn') === 'true';
  //   }
  //   return false;
  //  }
  // );
  const [user, setUser] = useState(null);
  // const [user, setUser] = useState( () => {
  //   if (typeof window !== 'undefined') {
  //     const userData = localStorage.getItem('user');
  //     return userData ? JSON.parse(userData) : null;
  //   }
  //   return null;
  //   }
  // );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchUserSession = async () => {
      try {
        const response = await fetch('http://localhost:3001/user/session', {
          credentials: 'include'
        });
        const data = await response.json();

        if (response.ok) {
          setUser(data.user);
          setSignedIn(true);
          // localStorage.setItem('user', JSON.stringify(data.user));
          // localStorage.setItem('signedIn', 'true');
        } else {
          setSignedIn(false);
          setUser(null);
          // localStorage.removeItem('signedIn');
          // localStorage.removeItem('user');
        }
      } catch (error) {
        console.error('Error fetching user session:', error);
        setSignedIn(false);
        setUser(null);
        // localStorage.removeItem('signedIn');
        // localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    fetchUserSession();
  }, [signedIn]);

  return (
    <AuthContext.Provider value={{ user, setUser, signedIn, setSignedIn, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
