import StatBox from "./StatBox";
const SupportStat = () => {
    return (
      <div className="bg-gray-200 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-800">Support Statistics</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-gray-900 border-2 px-4 py-2 rounded">
            View Today's Statistics
          </button>
        </div>
       <StatBox/>
       <StatBox/>     <StatBox/>     <StatBox/>
      </div>
    );
  };
  
  export default SupportStat;
  