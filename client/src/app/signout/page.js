"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from "../components/AuthContext";


export default function SignOut() {
  const { setUser, setSignedIn } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMessage(""); // Reset message
    setError(""); // Reset error
    setLoading(true);

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
      } finally {
        setLoading(false);
      }
    };

    signOut();
    // console.log("use effect sign out page")
  }, [router, setSignedIn, setUser]);

  if (loading) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center m-52">
          <div className="pageLoader"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 w-full flex justify-center py-20 px-6">
      {message && 
        <div className="h-screen flex flex-col font-semibold text-center">
          <h1>Signing out...</h1>
          <p>{message}</p>
        </div>}
      {!message && error && <div className="h-screen font-semibold"><p>{error}</p></div>}
    </div>
  );
}
