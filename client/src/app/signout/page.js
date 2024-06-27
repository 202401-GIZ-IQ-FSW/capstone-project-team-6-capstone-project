"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from "../components/AuthContext";


export default function SignOut() {
  const { setUser, setSignedIn } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setMessage(""); // Reset message
    setError(""); // Reset error

    const signOut = async () => {
      try {
        const response = await fetch('http://localhost:3001/user/logout', {
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message)
          setUser(null);
          setSignedIn(false);
          
          // localStorage.removeItem('user');
          // localStorage.removeItem('signedIn');

          setTimeout(() => {
            router.push('/'); // Adjust the path as needed
          }, 1000);

        } else {
          // Handle server errors
          setError(data.error);
          setTimeout(() => {
            router.push('/'); // Adjust the path as needed
          }, 1000);
        }

      } catch (error) {
        setError(error);
      }
    };

    signOut();
    console.log("use effect signout page")
  }, [router, setSignedIn, setUser]);

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1>Signing out...</h1>
      {message && <div className="message">{message}</div>}
      {!message && error && <div className="error">{error}</div>}
    </div>
  );
}
