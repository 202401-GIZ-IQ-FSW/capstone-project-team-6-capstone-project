"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from "../../../components/AuthContext";

export default function deleteUserPage({params}) {
  const { user } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const userId = params.id;
  const roles = ["superAdmin", "admin"];

  useEffect(() => {
    setMessage(""); // Reset message
    setError(""); // Reset error

    const deleteUser = async () => {
      try {
        let response;

        if (roles.includes(user?.role)) {
          response = await fetch(`http://localhost:3001/admin/view-user/${userId}`, { method: 'DELETE', credentials: 'include' });
        } else {
          response = await fetch(`http://localhost:3001/user/profile`, { method: 'DELETE', credentials: 'include' });
        }
        
        const data = await response.json();

        if (response.ok) {
          setMessage(data.message)

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

    deleteUser();
    console.log("use effect delete user page")
  }, []);

  return (
    <div className="flex justify-center my-20 mx-6">
      {message && 
        <div className="h-40 flex flex-col font-semibold text-center">
          <h1>Deleting ...</h1>
          <p>{message}</p>
        </div>}
      {!message && error && <div className="h-40 font-semibold"><p>{error}</p></div>}
    </div>
  );
}
