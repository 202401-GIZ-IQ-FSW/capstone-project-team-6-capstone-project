"use client"
import { useState, useEffect } from 'react';
import StatisticSidebar from "../components/StatisticSidebar";
import StatisticHeader from "../components/StatisticHeader";
import StCard from "../components/StCard";
import SupportStat from "../components/SupportStat";
import { useAuth } from "../components/AuthContext";
import { useRouter } from 'next/navigation';


const StatisticsPage = () => {
  const { signedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (signedIn === false) {
      setTimeout(() => {
        router.push('/signin'); // Adjust the path as needed
      }, 1000);
    }
  }, [router, signedIn]);

  if (signedIn === null) {
    return (
      <div className="flex justify-center items-center m-52">
        <div className="pageLoader"></div>
      </div>
    );
  }

  return (
    <>
      {signedIn === false && 
        <div className="px-5 py-40">
          <div className="flex flex-col items-center justify-center gap-6 lg:text-lg font-semibold">
            <h1>Only signed in users can view this page</h1>
            <p>Redirecting to sign in page ......</p>
          </div>
        </div>
      }
      {signedIn === true &&
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
                <div className="w-2/5 ml-2 ">   
                  <SupportStat/>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default StatisticsPage;
