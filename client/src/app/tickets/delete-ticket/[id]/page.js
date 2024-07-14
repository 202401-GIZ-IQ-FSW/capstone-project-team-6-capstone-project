"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from "../../../components/AuthContext";


export default function deleteTicketPage({params}) {
  const { user, signedIn } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const ticketId = params.id;

  useEffect(() => {
    if (signedIn === false) {
      setLoading(false);
      setTimeout(() => {
        router.push("/signin");
      }, 1000);
    }
  }, [signedIn, user]);

  useEffect(() => {
    setMessage(""); // Reset message
    setError(""); // Reset error
    setLoading(true);

    if (signedIn) {
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
        finally {
          setLoading(false);
        }
      };

      deleteTicket();
    }
    console.log("use effect delete ticket page")
  }, [signedIn]);

  if (signedIn === null || loading) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center m-52">
          <div className="pageLoader"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      { signedIn === false && 
        <div className="h-screen px-5 py-28">
          <div className="flex flex-col items-center justify-center gap-6 lg:text-lg font-semibold">
            <h1>Only signed in users can view this page</h1>
            <p>Redirecting to sign in page......</p>
          </div>
        </div>
      }
      { signedIn === true && 
        <div className="bg-gray-50 w-full flex justify-center py-20 px-6">
          {message && 
            <div className="h-screen flex flex-col font-semibold text-center">
              <h1>Deleting ...</h1>
              <p>{message}</p>
            </div>}
          {!message && error && <div className="h-screen font-semibold"><p>{error}</p></div>}
        </div>
      }
    </>
  );
}
