const StatisticSidebar = () => {
  return (
    <div className="sidebar bg-gray-800 text-white h-screen w-1/5">
      <nav className="mt-10">
        <ul>
          <li className="mb-4">
            <a href="/statistics" className="block px-4 py-2 hover:bg-gray-700">Home</a>
          </li>
          <li className="mb-4">
            <a href="/statistics/tickets" className="block px-4 py-2 hover:bg-gray-700">Tickets</a>
          </li>
          <li className="mb-4">
            <a href="/statistics/profile" className="block px-4 py-2 hover:bg-gray-700">Profile</a>
          </li>
          <li className="mb-4">
            <a href="/statistics/settings" className="block px-4 py-2 hover:bg-gray-700">Settings</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default StatisticSidebar;
