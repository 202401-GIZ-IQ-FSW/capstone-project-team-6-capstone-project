"use client"
import { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import Sidebar from '../components/Sidebar';
import RightSideContent from '../components/RightSideContent';
import { useAuth } from "../components/AuthContext";
import { useRouter } from 'next/navigation';


export default function searchPage() {
  const [ticketId, setTicketId] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [category, setCategory] = useState('');
  const { signedIn } = useAuth();
  const router = useRouter();

  const handleInputChange = (field, value) => {
    switch (field) {
      case 'ticketId':
        setTicketId(value);
        break;
      case 'issueDescription':
        setIssueDescription(value);
        break;
      case 'category':
        setCategory(value);
        break;
      default:
        break;
    }
  };

  const handleCreateTicket = () => {
    // Logic to handle ticket creation
    console.log('Creating ticket...');
    console.log('Ticket ID:', ticketId);
    console.log('Issue Description:', issueDescription);
    console.log('Category:', category);
    // Add your API calls or state management logic here
  };
  
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
        <>
          <Menu/>
          <div className="flex"> 
            <Sidebar
              ticketId={ticketId}
              issueDescription={issueDescription}
              category={category}
              onInputChange={handleInputChange}
              onCreateTicket={handleCreateTicket}
            />
            <div className="flex-1 p-8 bg-white">
              <RightSideContent />
            </div>
          </div>
        </>
      }
    </>
  );
}
