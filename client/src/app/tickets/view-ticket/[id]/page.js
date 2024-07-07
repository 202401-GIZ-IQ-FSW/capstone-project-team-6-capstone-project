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
  const [loading, setLoading] = useState(true);

  const ticketId = params.id; 
  const roles = ["superAdmin", "admin", "supportAgent"];

  const [ticketFormData, setTicketFormData] = useState({
    status: "",
    priority: "",
    assignToSelf: "no"
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
      setLoading(true);
      
      const fetchTicket = async () => {
        try {
          const response = await fetch(`http://localhost:3001/tickets/${ticketId}`, {
            credentials: 'include'
          });

          const data = await response.json();

          if (response.ok) {
            setTicketFormData({
              ...data, 
              assignToSelf: ( data?.assignedUser?._id === user?._id ) ? "yes" : "no" 
            });
          } else {
            setError(data.error);
          }
        } catch (error) {
            setError(error);
        } finally {
          setLoading(false); 
        }
      };

      fetchTicket();
    }
  }, [signedIn, ticketId, user]);

  if (signedIn === null || loading) {
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
      const response = await fetch(`http://localhost:3001/tickets/status-priority-assigned/${ticketId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketFormData)
      });

      const data = await response.json();

      if (response.ok) {
        setTicketFormData({
          ...data, // Update ticketFormData with the new data from the server
          assignToSelf: data?.assignedUser?._id === user?._id ? "yes" : "no"
        });
        setMessage("Ticket updated successfully");
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
    // console.log("Updating ticket:", ticketFormData);
  }

  // console.log("ticketFormData", ticketFormData)

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const userRoleDisplay = (role) => {
    switch (role) {
      case 'superAdmin':
        return 'Super Admin';
      case 'admin':
        return 'Admin';
      case 'supportAgent':
        return 'Support Agent';
      case 'customer':
        return 'Customer';
      default:
        return '';
    }
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
         <div className="max-w-screen-lg mx-auto px-4 py-8">
  <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4">
    <h2 className="text-gray-600 text-lg lg:text-xl font-bold mb-2">
      Ticket #{ticketFormData?.number}
    </h2>
    <div className="space-y-2">
      <div className="bg-gray-200 border border-gray-600 rounded-lg px-4 py-3">
        <h3 className="text-gray-600 text-lg lg:text-xl font-bold mb-2">
          Created by: {ticketFormData?.user?.name}
        </h3>
      </div>

      <div className="bg-gray-200 border border-gray-600 rounded-lg px-4 py-3">
        <h3 className="text-gray-600 text-lg lg:text-xl font-bold mb-2">
          Title: {ticketFormData?.title}
        </h3>
      </div>

      <div className="bg-gray-200 border border-gray-600 rounded-lg px-4 py-3">
        <p className="text-gray-600 lg:text-lg font-normal mb-2">
          <b>Created at:</b> {formatDate(ticketFormData?.createdAt)}
        </p>
      </div>

      <div className="bg-gray-200 border border-gray-600 rounded-lg px-4 py-3">
        <p className="text-gray-600 lg:text-lg font-normal mb-2">
          <b>Updated at:</b> {formatDate(ticketFormData?.updatedAt)}
        </p>
      </div>

      <div className="bg-gray-200 border border-gray-600 rounded-lg px-4 py-3">
        <p className="text-gray-600 lg:text-lg font-normal mb-2">
          <b>Category:</b> {ticketFormData?.category}
        </p>
      </div>

      <div className="bg-gray-200 border border-gray-600 rounded-lg px-4 py-3">
        <p className="text-gray-600 lg:text-lg font-normal mb-2">
          <b>Status:</b> {ticketFormData?.status}
        </p>
      </div>

      <div className="bg-gray-200 border border-gray-600 rounded-lg px-4 py-3">
        <p className="text-gray-600 lg:text-lg font-normal mb-2">
          <b>Priority:</b> {ticketFormData?.priority}
        </p>
      </div>

      <div className="bg-gray-200 border border-gray-600 rounded-lg px-4 py-3">
        <p className="text-gray-600 lg:text-lg font-normal mb-2">
          <b>Description:</b> {ticketFormData?.description}
        </p>
      </div>
    </div>
  </div>
</div>

            
            <p className=" text-gray-600 text-lg font-normal my-2 text-wrap"><b>Change ticket status { roles.includes(user?.role) ? ", priority and assigned user" : "" }</b></p>
            {/* Form for updating a ticket */}
            <form className="space-y-4" onSubmit={handleUpdateTicket}>
            <div className="space-y-4">

{/* Status field */}
<div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4">
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
    className="w-full px-4 py-2 border bg-gray-400 border-gray-900 rounded-md focus:outline-none focus:border-blue-500"
  >
    <option value="Open">Open</option>
    <option value="In Progress">In Progress</option>
    <option value="Closed">Closed</option>
  </select>
</div>

{/* Priority field - shown only to users with specific roles */}
{roles.includes(user?.role) && (
  <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4">
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
      className="w-full px-4 py-2 border bg-gray-400 border-gray-900 rounded-md focus:outline-none focus:border-blue-500"
    >
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
      <option value="Urgent">Urgent</option>
      <option value="Critical">Critical</option>
    </select>
  </div>
)}

</div>


              {/* Assigned User field */}
              { roles.includes(user?.role) && ( ticketFormData?.assignedUser?._id === user?._id || !ticketFormData?.assignedUser ) &&
                <div>
                  <label className="text-gray-600 block mb-1">Assign to self</label>
                  <select 
                    name="assignToSelf" 
                    value={ticketFormData.assignToSelf}
                    onChange={(e) =>
                      setTicketFormData({
                        ...ticketFormData,
                        assignToSelf: e.target.value,
                      })
                    } 
                    className="w-min px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500">
                    <option value="yes">Assigned</option>
                    <option value="no">Not assigned</option>
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
                  className={` bg-gray-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded text-sm lg:text-base ${
                    !handleTicketFormValid() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!handleTicketFormValid()}
                >
                  Update Ticket
                </button>
              </div>
              <div className=" py-10 flex mb-6 gap-10">
  {ticketFormData?.user?._id === user?._id && (
    <Link href={`/tickets/edit-ticket/${ticketId}`}>
      <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-sm lg:text-base">
        Edit Ticket
      </button>
    </Link>
  )}
  {(ticketFormData?.user?._id === user?._id || roles.includes(user?.role)) && (
    <Link href={`/tickets/delete-ticket/${ticketId}`}>
      <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm lg:text-base">
        Delete Ticket
      </button>
    </Link>
  )}
</div>

            </form>
          </div>
        </div>
      }
    </>
  );
};
