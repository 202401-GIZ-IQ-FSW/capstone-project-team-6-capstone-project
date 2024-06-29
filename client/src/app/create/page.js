// PostNewTicket.jsx
"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import { useRouter } from 'next/navigation';


const PostNewTicket = () => {
  const { signedIn } = useAuth();
  const router = useRouter();
  const [showTicketDialog, setShowTicketDialog] = useState(true); // Initially true to show the dialog
  const [ticketFormData, setTicketFormData] = useState({
    email: "",
    phoneNumber: "",
    name: "",
    dateOfBirth: "",
    country: "",
  });

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
        <div className="bg-white">
          <div className="max-w-screen-lg mx-auto px-4 py-8">
            {/* Create New Ticket title */}
            <h2 className=" text-gray-600 text-3xl font-bold mb-4 text-left">Create New Ticket</h2>
            {/* Ticket Details title */}
            <h3 className=" text-gray-600 text-xl font-semibold mb-4">Ticket Details</h3>
            
            {/* Form for creating a new ticket */}
            <form className="space-y-4">
              {/* Email Address and Phone Number fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 block mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input-field w-full px-4 py-2 border border-gray-900 bg-gray-100 rounded-md focus:outline-none focus:border-blue-500"
                    value={ticketFormData.email}
                    onChange={(e) =>
                      setTicketFormData({ ...ticketFormData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className=" text-gray-600 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="input-field w-full px-4 py-2 border border-gray-900 bg-gray-100 rounded-md focus:outline-none focus:border-blue-500"
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
                <label className="text-gray-600 block mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input-field w-full px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                  value={ticketFormData.name}
                  onChange={(e) =>
                    setTicketFormData({ ...ticketFormData, name: e.target.value })
                  }
                />
              </div>
    
              {/* Date of Birth field */}
              <div >
                <label className=" text-gray-600 block mb-1 ">Date of Birth</label>
                <input
                  type="date"
                  className=" text-gray-400 input-field w-full px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500"
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
                <label className="text-gray-600 block mb-1">Country</label>
                <input 
                  type="text"
                  placeholder="Enter your country"
                  className=" bg-gray-100 input-field w-full px-4 py-3 border border-gray-900 rounded-md focus:outline-none focus:border-blue-500"
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
                  className={`bg-gray-800 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded ${
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
      }
    </>
  );
};

export default PostNewTicket;
