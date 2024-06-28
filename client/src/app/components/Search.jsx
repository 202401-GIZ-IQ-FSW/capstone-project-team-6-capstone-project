"use client";
import React from 'react';

import Link from 'next/link';
import { useState } from "react";



export default function Search() {
  const [ticketId, setTicketId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Here you can perform actions like API calls, state updates, etc.
    console.log("Submitted ticket ID:", ticketId);
  };


  return (
    <div className=" flex-auto">
      <dialog id="my_modal_3" className=" modal">
        <div className="bg-gray-400 modal-box">
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => document.getElementById("my_modal_3").close()}
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Search Ticket</h3>
          <form onSubmit={handleSubmit}>
            <div className="mt-4 space-y-2">
              <label>Tieket ID</label>
              <br />
              <input
                type="text"
                name="Tieket ID<"
                placeholder="Enter Tieket ID"
                className="bg-gray-100 text-gray-600 w-80 px-3 py-1 border rounded-md outline-none"
              />
            </div>

          

            <div  className="flex justify-center mt-6">
            
              <button
                type="submit"
                className="bg-gray-800 text-white rounded-md px-3 py-1 hover:bg-gray-400 duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

