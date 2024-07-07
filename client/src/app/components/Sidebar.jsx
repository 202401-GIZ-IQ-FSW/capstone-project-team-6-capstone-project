// components/Sidebar.js

import { useState, useEffect } from 'react';

const Sidebar = ({ onFiltersChange, userRole }) => {
 
  const [ticketPriority, setTicketPriority] = useState({
    Low: false,
    Medium: false,
    High: false,
    Urgent: false,
    Critical:false
  });

  const [ticketCategories, setTicketCategories] = useState({
    "General Inquiry": false,
    Technical: false,
    "Bug Report": false,
  });
  
  const [ticketStatus, setTicketStatus] = useState({
    Open: false,
    "In Progress": false,
    Closed: false,
  });

  const [ticketAssignedTo, setTicketAssignedTo] = useState({
    "Assigned to me": false,
    None: false,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("title");

  useEffect(() => {
    const newFilters = {
      assignedTo: Object.keys(ticketAssignedTo).filter(key => ticketAssignedTo[key]),
      category: Object.keys(ticketCategories).filter(key => ticketCategories[key]),
      status: Object.keys(ticketStatus).filter(key => ticketStatus[key]),
      priority: Object.keys(ticketPriority).filter(key => ticketPriority[key]),
      searchQuery,
      searchField,
    };
    // console.log("new filters", newFilters)
    onFiltersChange(newFilters);
  }, [ticketAssignedTo, ticketCategories, ticketStatus, ticketPriority, searchQuery, searchField, onFiltersChange]);

  const handleCheckboxChange = (section, label, checked) => {
    switch (section) {
      case 'ticketAssignedTo':
        setTicketAssignedTo(prev => ({ ...prev, [label]: checked }));
        break;
      case 'ticketCategories':
        setTicketCategories(prev => ({ ...prev, [label]: checked }));
        break;
      case 'ticketStatus':
        setTicketStatus(prev => ({ ...prev, [label]: checked }));
        break;
      case 'ticketPriority':
        setTicketPriority(prev => ({ ...prev, [label]: checked }));
        break;
      default:
        break;
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchFieldChange = (e) => setSearchField(e.target.value);

  return (
    <div className="bg-gray-100 h-full w-4/12 md:w-3/12 flex flex-col p-4 space-y-4">

      {/* Search Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Search By</h2>

        <select
          value={searchField}
          onChange={handleSearchFieldChange}
          className="w-full px-4 py-2 border rounded-md mb-2"
        >
          <option value="title">Ticket Title</option>
          {userRole !== "customer" && <option value="user">User</option>}
          <option value="assigned to">Assigned To</option>
          <option value="number">Ticket Number</option>
          <option value="description">Ticket Description</option>
        </select>

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-md"
          placeholder={`Search by ${searchField}`}
        />
      </div>

      {/* Divider and Ticket Assigned to Section */}
      <hr className="my-4 border-gray-300" />
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Assigned to</h2>
        <div className="space-y-2">
          <Checkbox label="Assigned to me" checked={ticketAssignedTo["Assigned to me"]} onChange={(checked) => handleCheckboxChange('ticketAssignedTo', 'Assigned to me', checked)} />
          <Checkbox label="None" checked={ticketAssignedTo.None} onChange={(checked) => handleCheckboxChange('ticketAssignedTo', 'None', checked)} />
        </div>
      </div>

      {/* Divider and Ticket Category Section */}
      <hr className="my-4 border-gray-300" />
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Ticket Category</h2>
        <div className="space-y-2">
          <Checkbox label="General Inquiry" checked={ticketCategories["General Inquiry"]} onChange={(checked) => handleCheckboxChange('ticketCategories', 'General Inquiry', checked)} />
          <Checkbox label="Technical" checked={ticketCategories.Technical} onChange={(checked) => handleCheckboxChange('ticketCategories', 'Technical', checked)} />
          <Checkbox label="Bug Report" checked={ticketCategories["Bug Report"]} onChange={(checked) => handleCheckboxChange('ticketCategories', 'Bug Report', checked)} />
        </div>
      </div>

      {/* Divider and Ticket Status Section */}
      <hr className="my-4 border-gray-300" />
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Ticket Status</h2>
        <div className="space-y-2">
          <Checkbox label="Open" checked={ticketStatus.Open} onChange={(checked) => handleCheckboxChange('ticketStatus', 'Open', checked)} />
          <Checkbox label="In Progress" checked={ticketStatus["In Progress"]} onChange={(checked) => handleCheckboxChange('ticketStatus', 'In Progress', checked)} />
          <Checkbox label="Closed" checked={ticketStatus.Closed} onChange={(checked) => handleCheckboxChange('ticketStatus', 'Closed', checked)} />
        </div>
      </div>

      {/* Divider and Ticket Priority Level Section */}
      <hr className="my-4 border-gray-300" />
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Ticket Priority Level</h2>
        <div className="space-y-2">
          <Checkbox label="Low" checked={ticketPriority.Low} onChange={(checked) => handleCheckboxChange('ticketPriority', 'Low', checked)} />
          <Checkbox label="Medium" checked={ticketPriority.Medium} onChange={(checked) => handleCheckboxChange('ticketPriority', 'Medium', checked)} />
          <Checkbox label="High" checked={ticketPriority.High} onChange={(checked) => handleCheckboxChange('ticketPriority', 'High', checked)} />
          <Checkbox label="Urgent" checked={ticketPriority.Urgent} onChange={(checked) => handleCheckboxChange('ticketPriority', 'Urgent', checked)} />
          <Checkbox label="Critical" checked={ticketPriority.Critical} onChange={(checked) => handleCheckboxChange('ticketPriority', 'Critical', checked)} />
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

export default Sidebar;
