import { useRouter } from 'next/navigation';
import Link from "next/link";


export default function TicketsTable({tickets, filteredTickets, errorMessage, user}) {
  const router = useRouter();
  const resultsCount = filteredTickets? filteredTickets.length : 0;

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
    <div className="p-4 border-gray-300 overflow-y-auto bg-white">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-800">Tickets</h2>
        <p className="text-gray-600 mt-2 mb-4 text-sm lg:text-base">{resultsCount} results found for your search</p>

        { tickets.length > 0 ? (
            <div className="mb-4">
                <div className="overflow-x-auto rounded-lg border-gray-500 border-2">
                    <table className="w-screen xl:w-full divide-y divide-gray-200">

                        <thead>
                            <tr className="text-xs lg:text-sm bg-gray-400 text-gray-800 align-top text-center font-medium uppercase tracking-wider">
                                <th className="px-2 py-3">no.</th>
                                <th className="px-2 py-3">Ticket</th>                          
                                <th className="px-2 py-3">Title</th>
                                {/* <th className="px-2 py-3">Description</th> */}
                                <th className="px-2 py-3">Category</th>
                                <th className="px-2 py-3">Status</th>
                                <th className="px-2 py-3">Priority</th>
                                <th className="px-2 py-3 text-center">Created By</th>
                                {user?.role !== "customer" && <th className="px-2 py-3">Role</th>}
                                <th className="px-2 py-3 text-center">Assigned to</th>
                                <th className="px-2 py-3">Role</th>
                                <th className="px-2 py-3">Created at</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tickets?.map((ticket, index) => (
                                
                                <tr key={index} onClick={() => handleRowClick(ticket?._id)} className="text-center text-xs lg:text-sm hover:bg-gray-300 cursor-pointer">
                                
                                    <td className="text-center px-2 py-4"> {index + 1}</td>
                                    <td className="text-center px-2 py-4"># {ticket?.number}</td>
                                    <td className="px-2 py-3">{ticket?.title}</td>
                                    {/* <td className="px-2 py-3">{ticket?.description}</td> */}
                                    <td className="px-2 py-3">{ticket?.category}</td>
                                    <td className="px-2 py-3">{ticket?.status}</td>
                                    <td className="px-2 py-3">{ticket?.priority}</td>
                                    
                                    {/* User field*/}
                                    { ( ticket?.user?._id === user?._id || user?.role === "superAdmin" || ( user?.role === "admin" && !["admin", "superAdmin"].includes(ticket?.user?.role) ) ) ?
                                        (<td className="px-2 py-3 z-1">
                                        <Link href={`/users/view-user/${ticket.user._id}`} onClick={(e) => e.stopPropagation()} className="z-1 hover:underline hover:text-sky-500">
                                            {ticket.user.name}
                                        </Link>
                                        </td>)
                                        :
                                        (<td className="px-2 py-3">{ticket.user.name}</td>)
                                    }

                                    {user?.role !== "customer" && <td className="px-2 py-3">{userRoleDisplay(ticket?.user?.role)}</td>}

                                    {/* Assigned to field*/}
                                    { ticket?.assignedUser && ( ticket?.assignedUser?._id === user?._id || user?.role === "superAdmin" || ( user?.role === "admin" && !["admin", "superAdmin"].includes(ticket?.assignedUser?.role) ) ) ?
                                        (<td className="px-2 py-3 z-1">
                                        <Link href={`/users/view-user/${ticket.assignedUser?._id}`} onClick={(e) => e.stopPropagation()} className="z-1 hover:underline hover:text-sky-500">
                                            { ticket?.assignedUser ? ticket.assignedUser?.name : "None" }
                                        </Link>
                                        </td>)
                                        :
                                        (<td className="px-2 py-3">{ ticket.assignedUser ? ticket.assignedUser?.name : "None" }</td>)
                                    }

                                    <td className="px-2 py-3">{ ticket.assignedUser ? userRoleDisplay(ticket.assignedUser?.role) : "None" }</td>

                                    <td className="px-2 py-3">{formatDate(ticket?.createdAt)}</td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        ) : (
            <p className="m-10 font-semibold">{errorMessage}</p>
        )}
      
    </div>
  )
}
