"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../components/AuthContext";
import { useRouter } from 'next/navigation';


export default function newTicketPage() {
  const { signedIn } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [ticketFormData, setTicketFormData] = useState({
    title: "",
    description: "",
    category: "General Inquiry"
  });

  useEffect(() => {
    if (signedIn === false) {
      setTimeout(() => {
        router.push('/signin');
      }, 1000);
    }
  }, [router, signedIn]);

  if (signedIn === null) {
    return (
      <div className="flex justify-center items-center m-52">
        <div className="pageLoader"></div>
      </div>
    );
  }
  
  const handleCreateTicket = async (event) => {
    event.preventDefault();
    setMessage(""); // Reset message
    setError(""); // Reset error

    try {
      const response = await fetch('http://localhost:3001/tickets', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketFormData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Ticket created successfully");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      } else {
        // Handle server errors
        setError(data.error);
      }
    } catch (error) {
      setError(error);
    }

    console.log("Updating ticket:", ticketFormData);
  }

  function handleTicketFormValid() {
    return (
      ticketFormData.title.trim() !== "" &&
      ticketFormData.description.trim() !== "" &&
      ticketFormData.category.trim() !== ""
    );
  }

  return (
    <>
      {signedIn === false && 
        <div className="px-5 py-40">
          <div className="flex flex-col items-center justify-center gap-6 lg:text-lg font-semibold">
            <h1>Only signed in users can view this page</h1>
            <p>Redirecting to sign in page ......</p>
          </div>
        </div>
      }
      {signedIn === true && 
        <div className="bg-white">
          <div className="max-w-screen-lg mx-auto px-4 py-8">

            <h2 className=" text-gray-600 text-3xl font-bold mb-4 text-left">Create New Ticket</h2>

            <h3 className=" text-gray-600 text-xl font-semibold mb-4">Ticket Details</h3>
            
            {/* Form for creating a new ticket */}
            <form className="space-y-4" onSubmit={handleCreateTicket}>
              
              {/* Title field */}
              <div>
                <label className="text-gray-600 block mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter your ticket title"
                  className="input-field w-full px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                  value={ticketFormData.title}
                  onChange={(e) =>
                    setTicketFormData({ ...ticketFormData, title: e.target.value })
                  }
                />
                
              </div>

              {/* Description field */}
              <div>
                <label className="text-gray-600 block mb-1">Description</label>
                <textarea
                  type="text"
                  name="description"
                  placeholder="Describe your issue"
                  className="input-field w-full px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                  value={ticketFormData.description}
                  onChange={(e) =>
                    setTicketFormData({ ...ticketFormData, description: e.target.value })
                  }
                />
              </div>
    
              {/* Category field */}
              <div>
                <label className="text-gray-600 block mb-1">Category</label>
                <select 
                  name="category" 
                  value={ticketFormData.category}
                  onChange={(e) =>
                    setTicketFormData({
                      ...ticketFormData,
                      category: e.target.value,
                    })
                  } 
                  className="w-full px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500">
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical">Technical</option>
                  <option value="Bug Report">Bug Report</option>
                </select>
              </div>

              <div className="w-full pt-2">
                {message && <div className="flex justify-center mb-6 p-2 bg-emerald-300 rounded-md"><br/><p>{message}</p><br/></div>}
                {error && <div className="flex justify-center mb-6 p-2 bg-red-500 rounded-md"><br/><p>{error}</p><br/></div>}
              </div>
    
              <div className="flex justify-end">
                <button
                  type="submit"
                  
                  className={`bg-gray-800 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded ${
                    !handleTicketFormValid() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!handleTicketFormValid()}
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  );
};
