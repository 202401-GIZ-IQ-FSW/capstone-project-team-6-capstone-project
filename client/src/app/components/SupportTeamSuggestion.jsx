import React from 'react';

const SupportTeamSuggestion = () => {
  return (
    <div className="ml-3 bg-white rounded-lg shadow-md p-4">
      {/* Title */}
     
      {/* Divider Line */}
      <div className="border-b-2 border-gray-200 mb-4"></div>

      {/* Content Section */}
      <div className="flex items-center space-x-4">
        {/* Circular Image */}
        <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-gray-300">
          <img
            src="/path/to/your/image.jpg"  // Replace with your actual image path
            alt="Support Agent"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Text: Support Agent Name */}
        <div className="flex-1 text-center">
          <p className="text-lg font-semibold">Support Agent: Laura</p>
        </div>

        {/* Buttons Section */}
        <div className="space-x-2">
          {/* Plus Button */}
          <button className="bg-blue-500 text-white rounded-md px-3 py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM5 9a1 1 0 011-1h3V5a1 1 0 112 0v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Close Button */}
          <button className="bg-red-500 text-white rounded-md px-3 py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportTeamSuggestion;
