

// components/SupportCard.js

const SupportCard = () => {
  return (
    <div className="flex flex-col w-full mb-3 bg-white p-4">
      {/* Top Section: Image and Title */}
      <div className="flex items-center mb-4">
        {/* Image */}
        <div className="flex-shrink-0 mr-4">
          <img
            src="/path/to/your/image.jpg"  // Replace with your actual image path
            alt="User Avatar"
            className="h-20 w-20 rounded-full object-cover"
          />
        </div>
        
        {/* Title */}
        <div>
          <h3 className="text-lg font-bold">Technical Support</h3>
          <p className="text-gray-600">User Title</p>
        </div>
      </div>

      {/* Bottom Section: Information Box */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <div className="grid grid-cols-3 gap-4">
          {/* Column 1: My Tickets */}
          <div className="text-center">
            <p className="text-gray-600">0</p>
            <p className="text-gray-600">My Tickets</p>
          </div>

          {/* Column 2: Supporters */}
          <div className="text-center">
            <p className="text-gray-600">2</p>
            <p className="text-gray-600">Supporters</p>
          </div>

          {/* Column 3: Total Tickets */}
          <div className="text-center">
            <p className="text-gray-600">32</p>
            <p className="text-gray-600">Tickets</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportCard;
