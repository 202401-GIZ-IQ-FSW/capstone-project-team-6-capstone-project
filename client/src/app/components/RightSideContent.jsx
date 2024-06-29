// components/RightSideContent.js

import React from 'react';

const RightSideContent = () => {
  // Mock data for demonstration
  const resultsCount = 20;
  const foundCards = [
    {
      ticketNumber: 'T123',
      submittedTime: '2 hours ago',
      status: 'Waiting',
      attachments: 3,
      category: 'Technical Issues',
      description: 'Please assist with login error.',
      tags: ['Urgent', 'High Priority'],
      views: 123,
      ticketCount: 1,
      issueCount: 1,
    },
    // Add more cards as needed
  ];

  return (
    
    <div className="w-full p-4  border-gray-300 overflow-y-auto bg-white">
        <p className="text-gray-600">{resultsCount} results found for your search</p>
        <h2 className="text-2xl font-bold mt-2 mb-4">Ticket Priority</h2>
     
        
        {foundCards.map((card, index) => (
          <div key={index} className="mb-4 bg-gray-100 border p-4 rounded-md">
            <div className="flex items-center mb-2">
              <div className="w-1/4 h-48 bg-gray-200 rounded-md mr-4"></div> {/* Square image */}
              <div className='w-3/4'>
                <p className="text-gray-800 font-bold">{card.ticketNumber}</p>
                <p className="text-sm text-gray-600">{`Submitted ${card.submittedTime}`}</p>
                <p className="text-sm text-gray-600">{card.status}</p>
                <p className="text-sm text-gray-600">{`Attachment files: ${card.attachments}`}</p>
                <p className="text-gray-800 mb-2">{card.category}</p>
            <p className="text-gray-600 mb-4">{card.description}</p>
            <div className="flex space-x-2">
              {card.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="border border-gray-300 px-2 py-1 rounded-md text-sm text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
              </div>
            </div>
           
            <div className="flex justify-between mt-4">
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">{card.views} views</span>
                <button className="text-blue-500 hover:underline">Update</button>
              </div>
              <div className="flex items-center">
                <p className="text-gray-600 mr-2">{card.ticketCount} ticket, {card.issueCount} issue</p>
                <button className="text-blue-500 border border-gray-900 px-2 py-1 rounded-md hover:underline">View Options</button>
              </div>
            </div>
          </div>
          
        ))}
      </div>
  
  );
};

export default RightSideContent;
