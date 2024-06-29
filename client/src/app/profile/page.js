"use client"
import { useState, useEffect } from 'react';
import ProfileMenu from '../components/ProfileMenu';
import TicketOverview from '../components/TicketOverview';
import SupportCard from '../components/SupportCard';
import SupportAchievementOverview from '../components/SupportAchievementOverview';
import SupportTeamSuggestion from '../components/SupportTeamSuggestion';
import { useAuth } from "../components/AuthContext";
import { useRouter } from 'next/navigation';


const profilePage = () => {
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
        <div className="flex py-5 px-5">
          <ProfileMenu />
          {/* Right Side Content */}
          <div className="flex-1 flex w-full  ">
            <div>  <SupportCard />
            <TicketOverview />
            <SupportAchievementOverview/>
            </div>
            <div>
            <h2 className="text-lg font-semibold mb-4 ml-3">Support Team Suggestion</h2>
            <SupportTeamSuggestion/>
            <SupportTeamSuggestion/>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default profilePage;
