// components/Sidebar.js

import { useState } from 'react';

const Sidebar = () => {
  const [ticketId, setTicketId] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [category, setCategory] = useState('');
  const [attachment, setAttachment] = useState('');
  const [filters, setFilters] = useState({
    billingInquiry: false,
    technicalSupport: false,
    loginAssistance: false,
    submitNewTicket: false,
  });
  const [ticketCategories, setTicketCategories] = useState({
    technicalIssue: false,
    billingInquiries: false,
    accountAccess: false,
    resolved: false,
  });
  const [ticketStatus, setTicketStatus] = useState({
    open: false,
    inProgress: false,
    closed: false,
    loremIpsum: false,
  });
  const [priorityLevel, setPriorityLevel] = useState('');

  const handleCheckboxChange = (section, label, checked) => {
    switch (section) {
      case 'filters':
        setFilters((prevFilters) => ({
          ...prevFilters,
          [label]: checked,
        }));
        break;
      case 'ticketCategories':
        setTicketCategories((prevCategories) => ({
          ...prevCategories,
          [label]: checked,
        }));
        break;
      case 'ticketStatus':
        setTicketStatus((prevStatus) => ({
          ...prevStatus,
          [label]: checked,
        }));
        break;
      default:
        break;
    }
  };

  const handlePriorityLevelChange = (level) => {
    setPriorityLevel(level);
  };

  const handleCreateTicket = () => {
    // Logic to handle ticket creation
    console.log('Creating ticket...');
    console.log('Ticket ID:', ticketId);
    console.log('Issue Description:', issueDescription);
    console.log('Category:', category);
    console.log('Attachment:', attachment);
    console.log('Filters:', filters);
    console.log('Ticket Categories:', ticketCategories);
    console.log('Ticket Status:', ticketStatus);
    console.log('Priority Level:', priorityLevel);
    // Add your API calls or state management logic here
  };

  return (
    <div className="bg-gray-100 h-full w-80 flex flex-col p-4 space-y-4">
      {/* Your Ticket Section */}
      <div>
        <div className="flex items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2 text-gray-600 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="text-lg font-semibold text-gray-800">Your Ticket</span>
        </div>
        <div className="mb-4">
          <label htmlFor="ticketId" className="text-sm text-gray-600 block mb-1">
            Ticket ID
          </label>
          <input
            id="ticketId"
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter Ticket ID"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="issueDescription" className="text-sm text-gray-600 block mb-1">
            Issue Description
          </label>
          <textarea
            id="issueDescription"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            rows="4"
            placeholder="Describe the issue"
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="text-sm text-gray-600 block mb-1">
            Category
          </label>
          <input
            id="category"
            type="text"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="attachment" className="text-sm text-gray-600 block mb-1">
            Attachment
          </label>
          <input
            id="attachment"
            type="file"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
            onChange={(e) => setAttachment(e.target.files[0])}
          />
        </div>
        <button
          className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none"
          onClick={handleCreateTicket}
        >
          Create Ticket
        </button>
      </div>

      {/* Divider and Ticket Filter Section */}
      <hr className="my-4 border-gray-300" />
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Ticket Filter</h2>
        <div className="space-y-2">
          <Checkbox label="Billing Inquiry" checked={filters.billingInquiry} onChange={(checked) => handleCheckboxChange('filters', 'billingInquiry', checked)} />
          <Checkbox label="Technical Support" checked={filters.technicalSupport} onChange={(checked) => handleCheckboxChange('filters', 'technicalSupport', checked)} />
          <Checkbox label="Login Assistance" checked={filters.loginAssistance} onChange={(checked) => handleCheckboxChange('filters', 'loginAssistance', checked)} />
          <Checkbox label="Submit New Ticket" checked={filters.submitNewTicket} onChange={(checked) => handleCheckboxChange('filters', 'submitNewTicket', checked)} />
        </div>
      </div>

      {/* Divider and Ticket Category Section */}
      <hr className="my-4 border-gray-300" />
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Ticket Category</h2>
        <div className="space-y-2">
          <Checkbox label="Technical Issue" checked={ticketCategories.technicalIssue} onChange={(checked) => handleCheckboxChange('ticketCategories', 'technicalIssue', checked)} />
          <Checkbox label="Billing Inquiries" checked={ticketCategories.billingInquiries} onChange={(checked) => handleCheckboxChange('ticketCategories', 'billingInquiries', checked)} />
          <Checkbox label="Account Access" checked={ticketCategories.accountAccess} onChange={(checked) => handleCheckboxChange('ticketCategories', 'accountAccess', checked)} />
          <Checkbox label="Resolved" checked={ticketCategories.resolved} onChange={(checked) => handleCheckboxChange('ticketCategories', 'resolved', checked)} />
        </div>
      </div>

      {/* Divider and Ticket Status Section */}
      <hr className="my-4 border-gray-300" />
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Ticket Status</h2>
        <div className="space-y-2">
          <Checkbox label="Open" checked={ticketStatus.open} onChange={(checked) => handleCheckboxChange('ticketStatus', 'open', checked)} />
          <Checkbox label="In Progress" checked={ticketStatus.inProgress} onChange={(checked) => handleCheckboxChange('ticketStatus', 'inProgress', checked)} />
          <Checkbox label="Closed" checked={ticketStatus.closed} onChange={(checked) => handleCheckboxChange('ticketStatus', 'closed', checked)} />
          <Checkbox label="Lorem Ipsum" checked={ticketStatus.loremIpsum} onChange={(checked) => handleCheckboxChange('ticketStatus', 'loremIpsum', checked)} />
        </div>
      </div>

      {/* Divider and Priority Level Section */}
      <hr className="my-4 border-gray-300" />
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Priority Level</h2>
        <div className="space-x-2">
          <PriorityButton label="Low" selected={priorityLevel === 'Low'} onClick={() => handlePriorityLevelChange('Low')} />
          <PriorityButton label="Medium" selected={priorityLevel === 'Medium'} onClick={() => handlePriorityLevelChange('Medium')} />
          <PriorityButton label="High" selected={priorityLevel === 'High'} onClick={() => handlePriorityLevelChange('High')} />
          <PriorityButton label="Urgent" selected={priorityLevel === 'Urgent'} onClick={() => handlePriorityLevelChange('Urgent')} />
          <PriorityButton label="Criteria" selected={priorityLevel === 'Criteria'} onClick={() => handlePriorityLevelChange('Criteria')} />
        </div>
      </div>
    </div>
  );
};

// Checkbox component
const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-4 w-4 text-blue-500"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="ml-2 text-sm text-gray-700">{label}</span>
    </label>
  );
};

// Priority button component
const PriorityButton = ({ label, selected, onClick }) => {
  return (
    <button
      className={`border border-black px-3 py-1 rounded-md ${selected ? 'bg-black text-white' : 'bg-white text-black'} hover:bg-gray-200 focus:outline-none`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Sidebar;
