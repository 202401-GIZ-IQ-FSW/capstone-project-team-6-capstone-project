import StatisticSidebar from "../components/StatisticSidebar";
import StatisticHeader from "../components/StatisticHeader";
import StCard from "../components/StCard";
import SupportStat from "../components/SupportStat";
const StatisticsPage = () => {
  return (
    <div className="flex">
      <StatisticSidebar />
      <div className="flex-1 bg-white">
        <div className="p-8">
          <StatisticHeader/>
          <h1 className="text-2xl font-bold mb-4">Statistics Dashboard</h1>
          <div className="flex justify-between">
            <div className=" grid grid-cols-2 gap-4 w-3/5"> 
          <StCard/>
         <StCard/>
         <StCard/>
         <StCard/>
         </div>
         
             <div className="w-2/5 ml-2 ">   <SupportStat/></div>
           
          
          </div>
         
          
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
