"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../../components/AuthContext";
import { useRouter } from 'next/navigation';
import Link from "next/link";


export default function viewTicketPage({params}) {
  const { signedIn, user } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const ticketId = params.id; 
  const roles = ["superAdmin", "admin", "supportAgent"];

  const [ticketFormData, setTicketFormData] = useState({
    status: "",
    priority: "",
  });

  useEffect(() => {
    if (signedIn === false) {
      setTimeout(() => {
        router.push('/signin');
      }, 1000);
    } else if ( signedIn === true && ticketFormData?.user?._id && ticketFormData?.user?._id !== user?._id && !roles.includes(user?.role) ) {
      setTimeout(() => {
        router.push('/tickets');
      }, 1000);
    }
  }, [router, signedIn, user, ticketFormData]);

  useEffect(() => {
    if (signedIn) {
      setError(""); // Reset error
      const fetchTicket = async () => {
        try {
          const response = await fetch(`http://localhost:3001/tickets/${ticketId}`, {
            credentials: 'include'
          });

          const data = await response.json();

          if (response.ok) {
            setTicketFormData(data);
          } else {
            setError(data.error);
          }
        } catch (error) {
            setError(error);
        }
      };

      fetchTicket();
    }
  }, [signedIn]);

  if (signedIn === null) {
    return (
      <div className="flex justify-center items-center m-52">
        <div className="pageLoader"></div>
      </div>
    );
  }
  
  const handleUpdateTicket = async (event) => {
    event.preventDefault();
    setMessage(""); // Reset message
    setError(""); // Reset error

    try {
      const response = await fetch(`http://localhost:3001/tickets/status-priority/${ticketId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketFormData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Ticket updated successfully");
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
      ticketFormData.status.trim() !== "" &&
      ticketFormData.priority.trim() !== ""
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

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
      { ( signedIn === true && ticketFormData?.user?._id && ticketFormData?.user?._id !== user._id && !roles.includes(user?.role) ) && 
        <div className="px-5 py-40">
          <div className="flex flex-col items-center justify-center gap-6 lg:text-lg font-semibold">
            <h1>Users can only view their own tickets</h1>
            <p>Redirecting to ticket page ......</p>
          </div>
        </div>
      }
      {signedIn === true && 
        <div className="bg-white">
          <div className="max-w-screen-lg mx-auto px-4 py-8">
          
            <div className="flex mb-4 gap-2">
              { ticketFormData?.user?._id === user?._id &&
                <Link href={`/tickets/edit-ticket/${ticketId}`}>
                  <button className="bg-sky-500 hover:opacity-50 text-white font-bold py-2 px-4 rounded text-sm lg:text-base">
                    Edit Ticket
                  </button>
                </Link>
              }
              { ( ticketFormData?.user?._id === user?._id || roles.includes(user?.role)) &&
                <Link href={`/tickets/delete-ticket/${ticketId}`}>
                  <button className="bg-red-500 hover:opacity-50 text-white font-bold py-2 px-4 rounded text-sm lg:text-base">
                    Delete Ticket
                  </button>
                </Link>
              }
            </div>

            <h2 className=" text-gray-600 text-lg lg:text-3xl font-bold mb-4 text-left">Ticket # {ticketFormData?.number}</h2>
            <h3 className=" text-gray-600 text-base lg:text-xl font-semibold mb-4">Created by: {ticketFormData?.user?.name}</h3>
            <h3 className=" text-gray-600 text-base lg:text-xl font-semibold mb-4">Title: {ticketFormData?.title}</h3>
            <h3 className=" text-gray-600 text-sm lg:text-lg font-normal mb-4"><b>Created at:</b> {formatDate(ticketFormData?.createdAt)}</h3>
            <h3 className=" text-gray-600 text-sm lg:text-lg font-normal mb-4"><b>Updated at:</b> {formatDate(ticketFormData?.updatedAt)}</h3>
            <p className=" text-gray-600 lg:text-lg font-normal mb-4"><b>Category:</b> {ticketFormData?.category}</p>
            <p className=" text-gray-600 lg:text-lg font-normal mb-4"><b>Status:</b> {ticketFormData?.status}</p>
            <p className=" text-gray-600 lg:text-lg font-normal mb-4"><b>Priority:</b> {ticketFormData?.priority}</p>
            <p className=" text-gray-600 lg:text-lg font-normal mb-4 text-wrap"><b>Description</b>: {ticketFormData?.description}</p>
            
            <p className=" text-gray-600 text-lg font-normal my-2 text-wrap"><b>Change ticket status { roles.includes(user?.role) ? " and priority" : "" }</b></p>
            {/* Form for updating a ticket */}
            <form className="space-y-4" onSubmit={handleUpdateTicket}>
    
              {/* Status field */}
              <div>
                <label className="text-gray-600 block mb-1">Status</label>
                <select 
                  name="status" 
                  value={ticketFormData.status}
                  onChange={(e) =>
                    setTicketFormData({
                      ...ticketFormData,
                      status: e.target.value,
                    })
                  } 
                  className="w-min px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500">
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Priority field */}
              { roles.includes(user?.role) &&
                <div>
                  <label className="text-gray-600 block mb-1">Priority</label>
                  <select 
                    name="priority" 
                    value={ticketFormData.priority}
                    onChange={(e) =>
                      setTicketFormData({
                        ...ticketFormData,
                        priority: e.target.value,
                      })
                    } 
                    className="w-min px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              }

              <div className="w-full">
                {message && <div className="flex justify-center mb-6 p-2 bg-emerald-300 rounded-md"><br/><p>{message}</p><br/></div>}
                {error && <div className="flex justify-center mb-6 p-2 bg-red-500 rounded-md"><br/><p>{error}</p><br/></div>}
              </div>
    
              <div className="flex justify-start">
                <button
                  type="submit"
                  className={`bg-blue hover:bg-gray-400 text-white font-bold py-2 px-4 rounded ${
                    !handleTicketFormValid() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!handleTicketFormValid()}
                >
                  Update Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  );
};
