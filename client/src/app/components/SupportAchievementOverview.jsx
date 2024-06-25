// components/SupportAchievementOverview.js

const SupportAchievementOverview = () => {
    return (
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h4 className="text-lg font-bold mb-4">Support Achievement Overview</h4>
  
        {/* First Card: Dedicated Supporter */}
        <div className="bg-white p-4 rounded-lg flex items-center justify-between mb-4">
          {/* Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 6.35 6.35"
            className="h-12 w-12 text-blue-500 mr-4"
          >
            <path
              fillRule="evenodd"
              d="M12.004.998C5.94.998.996 5.935.996 11.998s4.945 11.006 11.008 11.006c6.063 0 10.998-4.943 10.998-11.006 0-6.063-4.935-11-10.998-11zm0 2a8.983 8.983 0 0 1 8.998 9 8.988 8.988 0 0 1-8.998 9.006 8.997 8.997 0 0 1-9.008-9.006c0-4.982 4.026-9 9.008-9zm-.016 1.986a1 1 0 0 0-.99 1.02v5.994a1 1 0 0 0 .297.707l4 4.002a1 1 0 1 0 1.41-1.418L13 11.584v-5.58a1 1 0 0 0-1.012-1.02z"
              fill="currentColor"
            />
          </svg>
          
          {/* Text Content */}
          <div>
            <p className="text-gray-600">Dedicated Supporter</p>
            <p className="text-lg font-bold">2/3</p>
            <p>Reach 3 day streak of resolved tickets</p>
          </div>
        </div>
  
        {/* Second Card: Points Earned Progress */}
        <div className="bg-white p-4 rounded-lg flex items-center justify-between">
          {/* Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 6.35 6.35"
            className="h-12 w-12 text-purple-500 mr-4"
          >
            <path
              fillRule="evenodd"
              d="M12.004.998C5.94.998.996 5.935.996 11.998s4.945 11.006 11.008 11.006c6.063 0 10.998-4.943 10.998-11.006 0-6.063-4.935-11-10.998-11zm0 2a8.983 8.983 0 0 1 8.998 9 8.988 8.988 0 0 1-8.998 9.006 8.997 8.997 0 0 1-9.008-9.006c0-4.982 4.026-9 9.008-9zm-.016 1.986a1 1 0 0 0-.99 1.02v5.994a1 1 0 0 0 .297.707l4 4.002a1 1 0 1 0 1.41-1.418L13 11.584v-5.58a1 1 0 0 0-1.012-1.02z"
              fill="currentColor"
            />
          </svg>
          
          {/* Text Content */}
          <div>
            <p className="text-gray-600">Points Earned Progress</p>
            <p className="text-lg font-bold">200/300</p>
            <p>Earn 300 points to unlock achievements</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default SupportAchievementOverview;
  