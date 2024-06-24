

// pages/index.js
"use client"
import { useState} from 'react';
import Menu from '../components/Menu';
import Sidebar from '../components/Sidebar';
import RightSideContent from '../components/RightSideContent';

export default function Home() {
  const [ticketId, setTicketId] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [category, setCategory] = useState('');

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

  return (
   <><Menu/>
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

      
    </div></>
  );
}
