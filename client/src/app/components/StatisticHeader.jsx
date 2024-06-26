const StatisticHeader = () => {
    return (
      <div className="header bg-white border-b-2 border-gray-200 flex justify-between items-center px-4 py-2">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 px-2 py-1 mr-2 rounded"
          />
        
        </div>
        <div className="flex items-center">
        <div className="notifications relative">
            <span className="notification-icon bg-blue-500 text-white rounded-full px-2 py-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 19a2 2 0 01-2-2h4a2 2 0 01-2 2zm6.71-3.29l-1.83-1.83A5 5 0 0117 9V7a7 7 0 00-14 0v2a5 5 0 01-1.88 3.88l-1.83 1.83A1 1 0 002 18h16a1 1 0 00.71-1.71zM10 3a5 5 0 015 5v2H5V8a5 5 0 015-5z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center -mt-1 -mr-1">
              3
            </span>
          </div>
          <div className="profile flex items-center">
            <img
              src="/profile.jpg"
              alt="Profile Image"
              className="w-8 h-8 rounded-full object-cover mr-2"
            />
            <span className="text-gray-800 font-semibold">John Doe</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default StatisticHeader;
  