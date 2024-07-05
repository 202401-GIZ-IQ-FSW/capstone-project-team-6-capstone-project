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
            router.push('/');
          }, 1000);

        } else {
          // Handle server errors
          setError(data.error);
          setTimeout(() => {
            router.push('/');
          }, 1000);
        }

      } catch (error) {
        setError(error);
      }
    };

    signOut();
    console.log("use effect sign out page")
  }, [router, setSignedIn, setUser]);

  return (
    <div className="flex justify-center my-20 mx-6">
      {message && 
        <div className="h-40 flex flex-col font-semibold text-center">
          <h1>Signing out...</h1>
          <p>{message}</p>
        </div>}
      {!message && error && <div className="h-40 font-semibold"><p>{error}</p></div>}
    </div>
  );
}
