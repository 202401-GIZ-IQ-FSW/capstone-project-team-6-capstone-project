"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from "../../../components/AuthContext";


export default function deleteTicketPage({params}) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const ticketId = params.id;

  useEffect(() => {
    setMessage(""); // Reset message
    setError(""); // Reset error

    const deleteTicket = async () => {
      try {
        const response = await fetch(`http://localhost:3001/tickets/${ticketId}`, {
          method: 'DELETE',
          credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message)

          setTimeout(() => {
            router.push('/tickets');
          }, 1000);

        } else {
          // Handle server errors
          setError(data.error);
          setTimeout(() => {
            router.push('/tickets'); 
          }, 1000);
        }

      } catch (error) {
        setError(error);
      }
    };

    deleteTicket();
    console.log("use effect delete ticket page")
  }, []);

  return (
    <div className="flex justify-center my-20 mx-6">
      {message && 
        <div className="flex flex-col font-semibold text-center">
          <h1>Deleting ...</h1>
          <p>{message}</p>
        </div>}
      {!message && error && <div className="font-semibold"><p>{error}</p></div>}
    </div>
  );
}
