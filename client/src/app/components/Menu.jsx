// components/Menu.js

const Menu = () => {
    return (
      <nav className="flex items-center justify-between bg-white p-4 shadow-md border-b">
        {/* Left side menu items */}
        <div className="flex items-center">
        
          <a
            href="#support"
            className="text-black font-bold  text-lg hover:text-gray-800 mr-4 cursor-pointer"
          >
            Support
          </a>
          <a
            href="#search"
            className="text-black hover:text-gray-800 mr-4 cursor-pointer"
          >
            Search
          </a>
          <a
            href="#submit-news"
            className="text-black hover:text-gray-800 mr-4 cursor-pointer"
          >
            Submit News
          </a>
          <a
            href="#notification"
            className="text-black hover:text-gray-800 mr-4 cursor-pointer"
          >
            Notification
          </a>
        </div>
  
        {/* Right side buttons */}
        <div className="flex items-center">
          <button className="border border-black text-black px-4 py-2 rounded-lg mr-4 bg-white hover:bg-gray-200">
            Submit
          </button>
          <button className="border border-black text-black px-4 py-2 rounded-lg bg-white hover:bg-gray-200">
            Sign In
          </button>
        </div>
      </nav>
    );
  };
  
  export default Menu;
  