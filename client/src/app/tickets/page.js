"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import { useRouter } from 'next/navigation';
import Link from "next/link";


export default function ticketsPage() {
  const { signedIn, user } = useAuth();
  const router = useRouter();
  const [ tickets, setTickets ] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (signedIn === false) {
      setTimeout(() => {
        router.push('/signin');
      }, 1000);
    }
  }, [router, signedIn]);

  useEffect(() => {
    if (signedIn) {
      setLoading(true);
      setError(""); // Reset error

      const fetchTickets = async () => {
        try {
          const response = await fetch('http://localhost:3001/tickets', {
            credentials: 'include'
          });

          const data = await response.json();

          if (response.ok) {
            setTickets(data);
          } else {
            setError(data.error);
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchTickets();
    }
  }, [signedIn]);

  if (signedIn === null || loading) {
    return (
      <div className="flex justify-center items-center m-52">
        <div className="pageLoader"></div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRowClick = (id) => {
    router.push(`/tickets/view-ticket/${id}`);
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
      { signedIn === true && 
        <div className="flex justify-center mx-auto px-4 py-4">
          <div className="flex flex-col items-center gap-1">

            <div className="w-screen lg:w-full py-4 px-6">
              <div className="flex items-center justify-between p-4 rounded-lg border-[#60829d] border-2 gap-4">
                <h1 className="font-bold lg:text-3xl">Tickets</h1>
                <Link href="/tickets/new-ticket" className="btn">
                  New ticket
                </Link>
              </div>
            </div>

            { tickets.length > 0 ? (
              <div className="w-screen px-6 md:w-full lg:px-6">
                <div className="overflow-x-auto rounded-lg border-[#60829d] border-2">
                    <table className="overflow-x-hidden divide-y divide-gray-200">

                      <thead>
                        <tr className="text-xs lg:text-sm bg-[#60829d]">
                          <th className="px-3 py-3 text-left font-medium uppercase tracking-wider">no.</th>
                          <th className="px-3 py-3 text-left font-medium uppercase tracking-wider">Ticket</th>
                          <th className="px-3 py-3 text-left font-medium uppercase tracking-wider">User name</th>
                          <th className="px-3 py-3 text-left font-medium uppercase tracking-wider">Title</th>
                          <th className="px-3 py-3 text-left font-medium uppercase tracking-wider">Description</th>
                          <th className="px-3 py-3 text-left font-medium uppercase tracking-wider">Category</th>
                          <th className="px-3 py-3 text-left font-medium uppercase tracking-wider">Status</th>
                          <th className="px-3 py-3 text-left font-medium uppercase tracking-wider">Priority</th>
                          <th className="px-3 py-3 text-left font-medium uppercase tracking-wider">Assigned to</th>
                          <th className="px-3 py-3 text-left font-medium uppercase tracking-wider">Created at</th>
                        </tr>
                      </thead>

                      <tbody className="bg-white divide-y divide-gray-200">
                        {tickets?.map((ticket, index) => (
                          
                          <tr key={index} onClick={() => handleRowClick(ticket?._id)} className="text-xs lg:text-sm hover:bg-gray-300 cursor-pointer">
                            
                            <td className="text-center px-3 py-4"> {index + 1}</td>
                            <td className="text-center px-3 py-4"># {ticket?.number}</td>
                            
                            {/* User field*/}
                            { ( ticket?.user?._id === user?._id || user?.role === "superAdmin" || ( user?.role === "admin" && !["admin", "superAdmin"].includes(ticket?.user?.role) ) ) ?
                              (<td className="px-3 py-3 z-1">
                                <Link href={`/users/view-user/${ticket.user._id}`} onClick={(e) => e.stopPropagation()} className="z-1 hover:underline hover:text-sky-500">
                                  {ticket.user.name}{user?.role !== "customer" ? " | " + userRoleDisplay(ticket.user.role) : ""}
                                </Link>
                              </td>)
                              :
                              (<td className="px-3 py-3">{ticket.user.name}{user?.role !== "customer" ? " | " + userRoleDisplay(ticket.user.role) : ""}</td>)
                            }

                            <td className="px-3 py-3">{ticket?.title}</td>
                            <td className="px-3 py-3">{ticket?.description}</td>
                            <td className="px-3 py-3">{ticket?.category}</td>
                            <td className="px-3 py-3">{ticket?.status}</td>
                            <td className="px-3 py-3">{ticket?.priority}</td>

                            {/* Assigned to field*/}
                            { ticket?.assignedUser && ( ticket?.assignedUser?._id === user?._id || user?.role === "superAdmin" || ( user?.role === "admin" && !["admin", "superAdmin"].includes(ticket?.assignedUser?.role) ) ) ?
                              (<td className="px-3 py-3 z-1">
                                <Link href={`/users/view-user/${ticket.assignedUser?._id}`} onClick={(e) => e.stopPropagation()} className="z-1 hover:underline hover:text-sky-500">
                                  { ticket?.assignedUser ? `${ticket.assignedUser?.name } | ${userRoleDisplay(ticket.assignedUser?.role)}` : "None" }
                                </Link>
                              </td>)
                              :
                              (<td className="px-3 py-3">{ ticket.assignedUser ? `${ticket.assignedUser?.name } | ${userRoleDisplay(ticket.assignedUser?.role)}` : "None" }</td>)
                            }

                            <td className="px-3 py-3">{formatDate(ticket?.createdAt)}</td>

                          </tr>
                        ))}
                      </tbody>

                    </table>
                  </div>
                </div>
            ) : (
              <p className="h-20 m-10 font-semibold">{error}</p>
            )}

          </div>
        </div>
      }
    </>
  )
}
