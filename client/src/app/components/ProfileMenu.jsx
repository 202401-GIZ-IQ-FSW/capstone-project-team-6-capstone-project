// components/ProfileMenu.js

const ProfileMenu = () => {
    return (
      <div className="flex flex-col justify-between h-screen bg-gray-200 text-gray-900 p-4">
        {/* Logo or Branding */}
        <div className="text-3xl font-bold mb-8">Logo</div>
  
        {/* Menu Items */}
        <div className="space-y-4">
          {/* Home */}
          <a href="/" className="flex items-center space-x-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M5 10h14M12 3v10l3-3m-6 4H9"
              />
            </svg>
            <span>Home</span>
          </a>
  
          {/* Find */}
          <a href="/find" className="flex items-center space-x-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-5.2-5.2a7.5 7.5 0 10-2.8 2.8L21 21z"
              />
            </svg>
            <span>Find</span>
          </a>
  
          {/* MY */}
          <a href="/my" className="flex items-center space-x-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 10l5 5L17 9"
              />
            </svg>
            <span>MY</span>
          </a>
  
          {/* Bookmark */}
          <a href="/bookmark" className="flex items-center space-x-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v18l7-4 7 4V3"
              />
            </svg>
            <span>Bookmark</span>
          </a>
        </div>
  
        {/* Back */}
        <div className="mt-8">
          <a href="#" className="flex items-center space-x-2 cursor-pointer px-4 py-2 rounded-lg hover:bg-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back</span>
          </a>
        </div>
      </div>
    );
  };
  
  export default ProfileMenu;
  