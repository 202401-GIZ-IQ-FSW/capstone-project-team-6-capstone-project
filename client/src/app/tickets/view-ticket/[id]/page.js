"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../../components/AuthContext";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import Comments from "../../../components/Comments";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserCog } from '@fortawesome/free-solid-svg-icons';
import StatusIcons from "@/app/components/StatusIcons";


export default function viewTicketPage({params}) {
  const { signedIn, user } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isTicket, setIsTicket] = useState(null);

  const ticketId = params.id; 
  const roles = ["superAdmin", "admin", "supportAgent"];

  const [ticketFormData, setTicketFormData] = useState({
    status: "",
    priority: "",
    assignToSelf: "no"
  });

  useEffect(() => {
    if (signedIn === false) {
      setLoading(false);
      setTimeout(() => {
        router.push('/signin');
      }, 1000);
    } else if ( signedIn === true && isTicket === false) {
      // console.log("second if", ticketFormData);
      setTimeout(() => {
        router.push('/tickets');
      }, 1000);
    }
  }, [router, signedIn, user, ticketFormData, isTicket]);

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
            setIsTicket(true);
            if (user?.role ===  "customer") {
              setTicketFormData(data);
            } else {
              setTicketFormData({
                ...data, 
                assignToSelf: ( data?.assignedUser?._id === user?._id ) ? "yes" : "no" 
              });
            }

          } else {
            setError(data.error);
            setIsTicket(false);
          }
        } catch (error) {
            setError(error);
            setIsTicket(false);
        } finally {
          setLoading(false); 
        }
      };

      fetchTicket();
    }
  }, [signedIn, ticketId, user]);

  if (signedIn === null || loading) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center m-52">
          <div className="pageLoader"></div>
        </div>
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
        body: JSON.stringify(user?.role === "customer" ? {status: "Open"} : ticketFormData)
      });

      const data = await response.json();

      if (response.ok) {

        if (user?.role ===  "customer") {
          setTicketFormData(data);
        } else {
          setTicketFormData({
            ...data, // Update ticketFormData with the new data from the server
            assignToSelf: ( data?.assignedUser?._id === user?._id ) ? "yes" : "no" 
          });
        }

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

  function extractImageId(rawImageUrl) {
    // if (!rawImageUrl.includes("drive.google.com")) {
    //   return rawImageUrl;
    // }
    const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
    const match = rawImageUrl.match(regex);
    if (match && match[1]) {
      return "http://localhost:3001/image/" + match[1];
    } else {
      console.log('Invalid Google Drive URL');
    }
  }

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
        <div className="h-screen px-5 py-28">
          <div className="flex flex-col items-center justify-center gap-6 lg:text-lg font-semibold">
            <h1>Only signed in users can view this page</h1>
            <p>Redirecting to sign in page......</p>
          </div>
        </div>
      }
      { ( signedIn === true && isTicket === false) && 
        <div className="h-screen px-5 py-28">
          <div className="flex flex-col items-center justify-center gap-6 lg:text-lg font-semibold">
            <h1>{error}</h1>
            <p>Redirecting to ticket page......</p>
          </div>
        </div>
      }
      { ( signedIn === true && isTicket === true ) &&
        <div className="bg-white">
          <div className="max-w-screen-lg mx-auto px-4 py-8">

            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4">

              <h2 className="text-gray-600 text-lg lg:text-2xl font-bold mb-2">
                Ticket #{ticketFormData?.number}
              </h2>

              <div className="space-y-2">

                <div className="bg-gray-200 border border-gray-600 rounded-lg px-4 py-3">
                  { ( ticketFormData?.user?._id === user?._id || user?.role === "superAdmin" || ( user?.role === "admin" && !["admin", "superAdmin"].includes(ticketFormData?.user?.role) ) ) ?
                      (<Link href={`/users/view-user/${ticketFormData?.user._id}`} className="text-gray-600 group gap-2 text-base lg:text-xl font-bold mb-2 hover:text-sky-500 flex flex-row">
                        <p>Created By: </p>
                        <div className="flex md:flex-row flex-col gap-2">
                          <p> {ticketFormData?.user.name}</p>
                          {user?.role !== "customer" &&
                            <p className="hidden md:flex">|</p>}
                          {user?.role !== "customer" && 
                            <p className="flex items-center gap-2">
                              <span>{userRoleDisplay(ticketFormData?.user?.role)}</span>
                              {ticketFormData?.user?.role === "customer" &&
                                <StatusIcons field={ticketFormData?.user?.role} className="text-gray-500 group-hover:text-sky-500" />}
                              {ticketFormData?.user?.role !== "customer" &&
                                <StatusIcons field={ticketFormData?.user?.role} className="text-gray-500 group-hover:text-sky-500" />}
                            </p>
                          }
                        </div>
                      </Link>)
                    :
                      (<div className="text-gray-600 text-base lg:text-xl font-bold mb-2 flex flex-row gap-2">
                        <p>Created By: </p>
                        <div className="flex flex-col md:flex-row gap-2">
                          <p> {ticketFormData?.user?.name}</p>
                          {user?.role !== "customer" &&
                            <p className="hidden md:flex">|</p>}
                          {user?.role !== "customer" && 
                            <p className="flex items-center gap-2">
                              <span>{userRoleDisplay(ticketFormData?.user?.role)}</span>
                              {ticketFormData?.user?.role === "customer" && 
                                <StatusIcons field={ticketFormData?.user?.role} className="text-gray-500" />}
                              {ticketFormData?.user?.role !== "customer" && 
                                <StatusIcons field={ticketFormData?.user?.role} className="text-gray-500" />}
                            </p>
                          }
                        </div>
                      </div>)
                  }
                </div>

                <div className="bg-gray-200 border border-gray-600 rounded-lg px-4 py-3">
                  <h3 className="text-gray-600 text-base lg:text-xl font-bold mb-2">
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
                  { ticketFormData?.assignedUser && 
                    ( ticketFormData?.assignedUser?._id === user?._id || 
                      user?.role === "superAdmin" || 
                      ( user?.role === "admin" && 
                      !["admin", "superAdmin"].includes(ticketFormData?.assignedUser?.role) ) ) 
                      ?
                        (<Link href={`/users/view-user/${ticketFormData.assignedUser?._id}`} className="text-gray-600 group gap-2 lg:text-lg font-normal mb-2 flex flex-row hover:text-sky-500 transition-colors duration-200">
                          <p><b>Assigned To:</b></p>
                          { ticketFormData?.assignedUser &&
                            (<div className="flex md:flex-row flex-col gap-2">
                              <p>{ticketFormData?.assignedUser?.name}</p>
                              <p className="hidden md:flex">|</p>
                              <p>{userRoleDisplay(ticketFormData?.assignedUser?.role)} <StatusIcons field={ticketFormData?.assignedUser?.role} className="text-gray-500 group-hover:text-sky-500 transition-colors duration-200" /></p>
                            </div>)
                          || "None" }
                        </Link>)
                      :
                        (<div className="text-gray-600 lg:text-lg font-normal mb-2 gap-2 flex flex-row">
                          <p><b>Assigned To:</b></p> 
                          { ticketFormData?.assignedUser &&
                            (<div className="flex md:flex-row flex-col gap-2" >
                              <p>{ticketFormData?.assignedUser?.name}</p>
                              <p className="hidden md:flex">|</p>
                              <p>{userRoleDisplay(ticketFormData?.assignedUser?.role)} <StatusIcons field={ticketFormData?.assignedUser?.role} className="text-gray-500" /></p>
                            </div>)
                          || "None" }
                        </div>)
                  }
                </div>

                <div className="bg-gray-200 border border-gray-600 rounded-lg px-4 py-3">
                  <p className="text-gray-600 lg:text-lg font-normal mb-2">
                    <b>Description:</b> {ticketFormData?.description}
                  </p>
                </div>

              </div>
            </div>
          

            { roles.includes(user?.role) &&
              <p className=" text-gray-600 lg:text-lg font-normal my-2 text-wrap">
                <b>Change ticket status, priority and assigned user</b>
              </p>
            }
            
            {/* Form for updating a ticket */}
            <form className="space-y-4" onSubmit={handleUpdateTicket}>
              
              <div className="space-y-4">

                {/* Status field */}
                { roles.includes(user?.role) &&
                  <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4 text-sm lg:text-base">
                    <label className="text-gray-600 block mb-1">Status</label>
                    <select 
                      name="status" 
                      value={ticketFormData?.status}
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
                }

                {/* Priority field - shown only to users with specific roles */}
                {roles.includes(user?.role) && (
                  <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4 text-sm lg:text-base">
                    <label className="text-gray-600 block mb-1">Priority</label>
                    <select 
                      name="priority" 
                      value={ticketFormData?.priority}
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

                {/* Assigned User field */}
                { roles.includes(user?.role) && ( ticketFormData?.assignedUser?._id === user?._id || !ticketFormData?.assignedUser ) &&
                  <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4 text-sm lg:text-base">
                    <label className="text-gray-600 block mb-1">Assign to self</label>
                    <select 
                      name="assignToSelf" 
                      value={ticketFormData?.assignToSelf}
                      onChange={(e) =>
                        setTicketFormData({
                          ...ticketFormData,
                          assignToSelf: e.target.value,
                        })
                      } 
                      className="w-full px-4 py-2 border bg-gray-400 border-gray-900 rounded-md focus:outline-none focus:border-blue-500">
                      <option value="yes">Assigned</option>
                      <option value="no">Not assigned</option>
                    </select>
                  </div>
                }

              </div>

              <div className="w-full">
                {message && <div className="flex justify-center mb-2 p-2 bg-emerald-300 rounded-md"><br/><p>{message}</p><br/></div>}
                {error && <div className="flex justify-center mb-2 p-2 bg-red-500 rounded-md"><br/><p>{error}</p><br/></div>}
              </div>
      
              <div className="flex justify-between py-2 gap-4 text-center">

                { (user?.role === "customer" && ticketFormData?.status === "Closed") &&
                  <button
                    type="button"
                    onClick={() => {
                      // setTicketFormData({ ...ticketFormData, status: "Open" });
                      handleUpdateTicket(new Event('submit'));
                    }}
                    className="bg-gray-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded text-sm lg:text-base"
                  >
                    Re-Open Ticket
                  </button>
                }

                { roles.includes(user?.role) &&
                  <button
                    type="submit"
                    className="bg-gray-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded text-sm lg:text-base"
                  >
                    Update Ticket
                  </button>
                }

                <div className={`flex justify-end gap-4 ${user?.role === "customer" && ticketFormData?.status !== "Closed" ? "w-full" : ""}`}>
                  {ticketFormData?.user?._id === user?._id && (
                    <Link href={`/tickets/edit-ticket/${ticketId}`}>
                      <p className="bg-gray-600 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded text-sm lg:text-base">
                        Edit Ticket
                      </p>
                    </Link>
                  )}

                  {(ticketFormData?.user?._id === user?._id || roles.includes(user?.role)) && (
                    <Link href={`/tickets/delete-ticket/${ticketId}`}>
                      <p className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-4 rounded text-sm lg:text-base">
                        Delete Ticket
                      </p>
                    </Link>
                  )}
                </div>

              </div>

            </form>
            
            {/* Image Section */}
            { ticketFormData?.imageURL &&
              <div className="bg-gray-200 border border-gray-600 rounded-lg my-6">
                <p className="lg:text-xl mb-4 p-4 font-bold bg-gray-400 text-gray-800 overflow-hidden rounded-t-lg">
                  Ticket Attachment: 
                </p>
                <div className="mx-4 mb-2">
                  <a href={ticketFormData?.imageURL} target="_blank" rel="noopener noreferrer">
                    <img src={ticketFormData?.imageURL? extractImageId(ticketFormData?.imageURL) : ""}
                      className=" rounded-lg lg:h-[35rem] w-full border border-gray-900 p-2 text-center text-gray-600"
                      title="Click for the larger version."
                      alt="ticket attachment image"
                    />
                  </a>
                </div>
              </div>
            }

            {/* Comments Section */}
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-4 mt-4">
              <h2 className="lg:text-2xl font-bold mt-2 mb-4 text-gray-600">Comments</h2>
                <Comments ticketId={ticketId} signedIn={signedIn} user={user} ticket={ticketFormData} />
            </div>
            
          </div>
        </div>
      }
    </>
  );
};
