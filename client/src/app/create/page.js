// PostNewTicket.jsx
"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";

const PostNewTicket = () => {
  const [showTicketDialog, setShowTicketDialog] = useState(true); // Initially true to show the dialog
  const [ticketFormData, setTicketFormData] = useState({
    email: "",
    phoneNumber: "",
    name: "",
    dateOfBirth: "",
    country: "",
  });

  function handleCreateTicket() {
    // Mock API call or any other logic to create a new ticket
    console.log("Creating ticket:", ticketFormData);
    // Add your logic here to create a new ticket (e.g., API call)
    // After successful creation, you can reset the form and close the dialog
    setTicketFormData({
      email: "",
      phoneNumber: "",
      name: "",
      dateOfBirth: "",
      country: "",
    });
    setShowTicketDialog(false);
  }

  function handleTicketFormValid() {
    // Basic validation logic (adjust as per your requirements)
    return (
      ticketFormData.email.trim() !== "" &&
      ticketFormData.phoneNumber.trim() !== "" &&
      ticketFormData.name.trim() !== "" &&
      ticketFormData.dateOfBirth.trim() !== "" &&
      ticketFormData.country.trim() !== ""
    );
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        {/* Create New Ticket title */}
        <h2 className="text-3xl font-bold mb-4 text-left">Create New Ticket</h2>
        {/* Ticket Details title */}
        <h3 className="text-xl font-semibold mb-4">Ticket Details</h3>
        
        {/* Form for creating a new ticket */}
        <form className="space-y-4">
          {/* Email Address and Phone Number fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={ticketFormData.email}
                onChange={(e) =>
                  setTicketFormData({ ...ticketFormData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="input-field w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={ticketFormData.phoneNumber}
                onChange={(e) =>
                  setTicketFormData({
                    ...ticketFormData,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </div>
          </div>

          {/* Name field */}
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input-field w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={ticketFormData.name}
              onChange={(e) =>
                setTicketFormData({ ...ticketFormData, name: e.target.value })
              }
            />
          </div>

          {/* Date of Birth field */}
          <div>
            <label className="block mb-1">Date of Birth</label>
            <input
              type="date"
              className="input-field w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={ticketFormData.dateOfBirth}
              onChange={(e) =>
                setTicketFormData({
                  ...ticketFormData,
                  dateOfBirth: e.target.value,
                })
              }
            />
          </div>

          {/* Country field */}
          <div>
            <label className="block mb-1">Country</label>
            <input
              type="text"
              placeholder="Enter your country"
              className="input-field w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              value={ticketFormData.country}
              onChange={(e) =>
                setTicketFormData({
                  ...ticketFormData,
                  country: e.target.value,
                })
              }
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button" // Change to "submit" if integrating with form submission
              onClick={handleCreateTicket}
              className={`bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ${
                !handleTicketFormValid() ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!handleTicketFormValid()}
            >
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostNewTicket;
