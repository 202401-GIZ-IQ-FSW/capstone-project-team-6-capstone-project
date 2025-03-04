// components/RightSideContent.js

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserCog, faUserGear} from '@fortawesome/free-solid-svg-icons';
import StatusIcons from "./StatusIcons";


const RightSideContent = ({tickets, filteredTickets, errorMessage, user}) => {
  const router = useRouter();
  const resultsCount = filteredTickets ? filteredTickets.length : 0;

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

  const handleRowClick = (id) => {
    router.push(`/tickets/view-ticket/${id}`);
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

  return (
    
    <div className="w-full p-4 border-gray-300 overflow-y-auto bg-white">
        
        <h2 className="text-lg lg:text-2xl font-bold ">Tickets</h2>
        <p className="text-gray-600 mt-2 mb-4 text-sm lg:text-base">{resultsCount} results found for your search</p>

        {tickets.length > 0 ? tickets.map((ticket, index) => (
          <div 
            key={index} 
            className="mb-4 bg-gray-100 border p-4 rounded-md hover:bg-slate-300 cursor-pointer"
            onClick={() => handleRowClick(ticket?._id)} href={`/tickets/view-ticket/${ticket._id}`}
          >
            <div className="flex flex-col md:flex-row items-center">

              {/* Image */}
              <div className="flex justify-center text-center z-1 w-[88%] sm:w-[88%] md:w-7/12 lg:w-5/12 sm:h-56 md:h-52 lg:h-56 rounded-md mb-2 md:mb-0 md:mr-4">
                {ticket?.imageURL ? 
                  <a href={ticket?.imageURL} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="w-[88%] h-[11rem] sm:w-[88%] sm:h-56 md:w-full md:h-52 lg:h-56 rounded-lg text-center">
                    <img src={ticket?.imageURL? extractImageId(ticket.imageURL) : ""}
                      className="w-[88%] h-[11rem] sm:w-[88%] sm:h-56 md:w-full md:h-52 lg:h-56 rounded-md text-center"
                      title="Click for the larger version."
                      alt="image for ticket problem"
                    />
                  </a>
                :
                  <img 
                    className="w-[88%] h-[11rem] sm:w-[88%] sm:h-56 md:w-full md:h-52 lg:h-56 rounded-md text-center" 
                    src="/laptop-desk.png"
                    alt="default site logo"
                  />
                }
              </div>

              <div className='w-3/4 space-y-4 md:space-y-3 lg:space-y-4 mt-2 md:mt-0'>

                <div className="flex flex-col md:flex-row justify-between gap-2">
                  <p className="text-gray-800 font-bold"># {ticket.number} {ticket.title}</p>
                  <p className="text-gray-600 text-sm"><b>Created At:</b> {formatDate(ticket.createdAt)}</p>
                </div>

                
                <p className="text-gray-600 pb-2 md:py-3 lg:pb-4 lg:pt-3 min-w-20 md:max-w-sm lg:max-w-[37rem] xl:max-w-[38rem] overflow-clip overflow-ellipsis whitespace-nowrap">
                  {ticket.description}
                </p>
                

                <div className="flex flex-col md:flex-row gap-2">
                  <p className="w-fit border border-slate-400 px-2 py-1 rounded-md text-sm text-gray-800">
                    <StatusIcons field={ticket.priority} /> {ticket.priority}
                  </p>
                  <p className="w-fit border border-slate-400 px-2 py-1 rounded-md text-sm text-gray-800">
                    <StatusIcons field={ticket.status} /> {ticket.status}
                  </p>
                  <p className="w-fit border border-slate-400 px-2 py-1 rounded-md text-sm text-gray-800">
                    <StatusIcons field={ticket.category} /> {ticket.category}
                  </p>
                </div>
                
                <div className="text-sm flex flex-col gap-2">

                  {/* Created By field*/}
                  { ( ticket.user?._id === user?._id || user?.role === "superAdmin" || ( user?.role === "admin" && !["admin", "superAdmin"].includes(ticket.user?.role) ) ) ?
                    (<Link onClick={(e) => e.stopPropagation()} href={`/users/view-user/${ticket.user?._id}`} className="text-gray-600 gap-1 z-1 hover:text-sky-500 group flex flex-col md:flex-row">
                      <p><b>Created By:</b></p>
                      <div className="flex flex-row gap-1">
                        <p> {ticket.user?.name}</p>
                        {user?.role !== "customer" && 
                          <p>|</p>}
                        {user?.role !== "customer" && 
                         <p className="flex items-center gap-1">
                          <span>{userRoleDisplay(ticket.user?.role)}</span>
                          {ticket?.user?.role === "customer" &&
                            <StatusIcons field={ticket?.user?.role} className="text-gray-500 group-hover:text-sky-500" />}
                          {ticket?.user?.role !== "customer" &&
                            <StatusIcons field={ticket?.user?.role} className="text-gray-500 group-hover:text-sky-500" />}
                         </p>
                        }
                      </div>
                    </Link>)
                    :
                    (<div className="text-gray-600 flex flex-col md:flex-row gap-1">
                      <p><b>Created By:</b></p> 
                      <div className="flex flex-row gap-1">
                        <p> {ticket.user?.name}</p>
                        {user?.role !== "customer" &&
                          <p>|</p>}
                        {user?.role !== "customer" &&  
                          <p className="flex items-center gap-1">
                            <span>{userRoleDisplay(ticket.user?.role)}</span>
                            {ticket?.user?.role === "customer" && 
                              <StatusIcons field={ticket?.user?.role} className="text-gray-500" />}
                            {ticket?.user?.role !== "customer" && 
                              <StatusIcons field={ticket?.user?.role} className="text-gray-500" />}
                          </p>
                        }
                      </div>
                    </div>)
                  }

                  {/* Assigned To field*/}
                  { ticket?.assignedUser && ( ticket?.assignedUser?._id === user?._id || user?.role === "superAdmin" || ( user?.role === "admin" && !["admin", "superAdmin"].includes(ticket?.assignedUser?.role) ) ) ?
                    (<Link onClick={(e) => e.stopPropagation()} href={`/users/view-user/${ticket.assignedUser?._id}`} className="text-gray-600 group gap-1 z-1 hover:text-sky-500 flex flex-col md:flex-row">
                      <p><b>Assigned To:</b> </p>
                      { ticket?.assignedUser && 
                        <div className="flex flex-row  gap-1">
                          <p>{ticket.assignedUser?.name }</p>
                          <p>|</p> 
                          <p>{userRoleDisplay(ticket?.assignedUser?.role)} <StatusIcons field={ticket?.assignedUser?.role} className="text-gray-500 group-hover:text-sky-500" /></p>
                        </div>
                      || "None" }
                    </Link>)
                    :
                    (<div className="text-gray-600 gap-1 flex flex-col md:flex-row">
                      <p><b>Assigned To:</b></p> 
                      { ticket?.assignedUser &&
                        <div className="flex flex-row gap-1">
                          <p>{ticket.assignedUser?.name }</p>
                          <p>|</p>
                          <p>{userRoleDisplay(ticket?.assignedUser?.role)} <StatusIcons field={ticket?.assignedUser?.role} className="text-gray-500" /></p>
                        </div>
                      || "None" }
                    </div>)
                  }

                </div>
              </div>

            </div>
          </div>
          ))
        :
          <p className="font-semibold">{errorMessage ? errorMessage : "No Tickets Found"}</p>
        }
      </div>
  );
};

export default RightSideContent;
