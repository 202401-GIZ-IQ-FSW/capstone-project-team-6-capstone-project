// components/RightSideContent.js

import Link from "next/link";

const RightSideContent = ({tickets, errorMessage}) => {
  
  const resultsCount = tickets? tickets.length : 0;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    
    <div className="w-full p-4  border-gray-300 overflow-y-auto bg-white">
        <p className="text-gray-600">{resultsCount} results found for your search</p>
        <h2 className="text-2xl font-bold mt-2 mb-4">Tickets</h2>
     
        {tickets.length > 0 ? tickets?.map((ticket, index) => (
          <div key={index} className="mb-4 bg-gray-100 border p-4 rounded-md hover:bg-slate-300">

            <Link href={`/tickets/view-ticket/${ticket._id}`}>
              <div className="flex flex-col md:flex-row items-center">
  
                {/* Square image */}
                <div className="w-full md:w-7/12 lg:w-5/12 h-24 md:h-48 bg-gray-200 rounded-md mb-2 md:mb-0 md:mr-4">
                </div>
  
                <div className='w-3/4 space-y-4 md:space-y-3 lg:space-y-6 mt-2 md:mt-0'>
                  <p className="text-gray-800 font-bold"># {ticket.number} {ticket.title}</p>
                  <p className="text-gray-600 ">{ticket.description}</p>

                  <div className="flex flex-col md:flex-row gap-2">
                    <p className="w-fit border border-slate-400 px-2 py-1 rounded-md text-sm text-gray-800">
                      {ticket.priority}
                    </p>
                    <p className="w-fit border border-slate-400 px-2 py-1 rounded-md text-sm text-gray-800">
                      {ticket.status}
                    </p>
                    <p className="w-fit border border-slate-400 px-2 py-1 rounded-md text-sm text-gray-800">
                      {ticket.category}
                    </p>
                  </div>

                  <div className="text-sm flex flex-col md:flex-row justify-between  gap-2">
                    <p className="text-gray-600"><b>Created By:</b> {ticket.user.name}</p>
                    <p className="text-gray-600"><b>Created At:</b> {formatDate(ticket.createdAt)}</p>
                  </div>
                </div>
  
              </div>
            </Link>
          </div>
          ))
        :
          <p className="font-semibold">{errorMessage ? errorMessage : "No Tickets Found"}</p>
        }
      </div>
  );
};

export default RightSideContent;
