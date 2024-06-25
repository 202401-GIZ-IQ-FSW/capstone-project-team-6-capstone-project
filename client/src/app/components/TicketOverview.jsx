// components/TicketOverview.js

const TicketOverview = () => {
    return (
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h4 className="text-lg font-bold mb-2">Ticket Statistic Overview</h4>
  
        {/* Three Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Box 1: Resolved Ticket */}
          <div className="bg-white p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-green-500 mb-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2C5.53 2 2 5.53 2 10c0 2.91 1.5 5.46 3.76 6.95l-.65 1.77 1.84-.66A7.95 7.95 0 0010 18c4.41 0 8-3.59 8-8s-3.59-8-8-8zm1.32 10.55l-3.56-3.56-1.06 1.06 4.49 4.49 7.07-7.07-1.06-1.06-6.01 6.04z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-gray-600">Resolved Tickets</p>
            <p className="font-bold">3</p>
          </div>
  
          {/* Box 2: Hours Spent */}
          <div className="bg-white p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-blue-500 mb-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2C5.53 2 2 5.53 2 10c0 2.91 1.5 5.46 3.76 6.95l-.65 1.77 1.84-.66A7.95 7.95 0 0010 18c4.41 0 8-3.59 8-8s-3.59-8-8-8zm1.32 10.55l-3.56-3.56-1.06 1.06 4.49 4.49 7.07-7.07-1.06-1.06-6.01 6.04z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-gray-600">Hours Spent</p>
            <p className="font-bold">23 hr</p>
          </div>
  
          {/* Box 3: Technical Skills */}
          <div className="bg-white p-4 rounded-lg flex flex-col items-center justify-center text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-purple-500 mb-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2C5.53 2 2 5.53 2 10c0 2.91 1.5 5.46 3.76 6.95l-.65 1.77 1.84-.66A7.95 7.95 0 0010 18c4.41 0 8-3.59 8-8s-3.59-8-8-8zm1.32 10.55l-3.56-3.56-1.06 1.06 4.49 4.49 7.07-7.07-1.06-1.06-6.01 6.04z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-gray-600">Technical Skills</p>
            <p className="font-bold">7</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default TicketOverview;
  