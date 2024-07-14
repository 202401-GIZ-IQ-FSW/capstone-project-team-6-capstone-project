"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../components/AuthContext";
import { useRouter } from 'next/navigation';
// import Dropzone from 'react-dropzone';


export default function newTicketPage() {
  const { signedIn } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // const [image, setImage] = useState(null);
  // const [uploadMessage, setUploadMessage] = useState("");
  // const [uploadError, setUploadError] = useState("");

  const [ticketFormData, setTicketFormData] = useState({
    title: "",
    description: "",
    category: "General Inquiry",
    imageURL: ""
  });

  useEffect(() => {
    if (signedIn === false) {
      setTimeout(() => {
        router.push('/signin');
      }, 1000);
    }
  }, [router, signedIn]);

  if (signedIn === null) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center m-52">
          <div className="pageLoader"></div>
        </div>
      </div>
    );
  }
  
  const handleCreateTicket = async (event) => {
    event.preventDefault();
    setMessage(""); // Reset message
    setError(""); // Reset error
    // setUploadMessage(""); // Reset message
    // setUploadError(""); // Reset error

    try {
      // Image Upload
      // let imageURL = "";
      // if (image) {
      //   const formData = new FormData();
      //   formData.append("files", image);
      //   const uploadResponse = await fetch('http://localhost:3001/imagesApi/uploadImage', {
      //     method: 'POST',
      //     credentials: 'include',
      //     body: formData
      //   })
      //   const uploadData = await uploadResponse.json();
      //   if (uploadResponse.ok) {
      //     console.log("Image Res data", uploadData);
      //     if (uploadData.success) {
      //       imageURL = uploadData.data[0]?.img.split('.').shift();
      //       setUploadMessage(uploadData.message);
      //       setTimeout(() => {
      //         setUploadMessage("");
      //       }, 2000);
      //     } else {
      //       console.error("Image upload failed:", uploadData.error);
      //       setUploadError(uploadData.error);
      //     }
      //   } else {
      //     setUploadError(uploadData.error || 'Failed to upload image');
      //     throw new Error(`HTTP error! Status: ${res.status}`);
      //   }
      // };
      
      const response = await fetch('http://localhost:3001/tickets', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketFormData)
        // body: JSON.stringify({ ...ticketFormData, imageURL })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Ticket created successfully");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      } else {
        // Handle server errors
        setError(data.error);
      }
    } catch (error) {
      setError(error);
    }

    console.log("Updating ticket:", ticketFormData);
  }

  function handleTicketFormValid() {
    return (
      ticketFormData.title.trim() !== "" &&
      ticketFormData.description.trim() !== "" &&
      ticketFormData.category.trim() !== ""
    );
  }

  return (
    <>
      {signedIn === false && 
        <div className="h-screen px-5 py-40">
          <div className="flex flex-col items-center justify-center gap-6 lg:text-lg font-semibold">
            <h1>Only signed in users can view this page</h1>
            <p>Redirecting to sign in page ......</p>
          </div>
        </div>
      }
      {signedIn === true && 
        <div className="bg-white">
          <div className="max-w-screen-lg mx-auto px-4 py-8">

            <h2 className=" text-gray-600 text-3xl font-bold mb-4 text-left">Create New Ticket</h2>

            <h3 className=" text-gray-600 text-xl font-semibold mb-4">Ticket Details</h3>
            
            {/* Form for creating a new ticket */}
            <form className="space-y-4" onSubmit={handleCreateTicket}>
              
              {/* Title field */}
              <div>
                <label className="text-gray-600 block mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Enter your ticket title"
                  className="input-field w-full px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                  value={ticketFormData.title}
                  onChange={(e) =>
                    setTicketFormData({ ...ticketFormData, title: e.target.value })
                  }
                />
              </div>

              {/* Description field */}
              <div>
                <label className="text-gray-600 block mb-1">Description *</label>
                <textarea
                  type="text"
                  name="description"
                  required
                  placeholder="Describe your issue"
                  className="input-field w-full px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                  value={ticketFormData.description}
                  onChange={(e) =>
                    setTicketFormData({ ...ticketFormData, description: e.target.value })
                  }
                />
              </div>

              {/* Image URL field */}
              <div>
                <label className="text-gray-600 block mb-1">Image URL</label>
                <input
                  type="text"
                  name="imageURL"
                  placeholder="Provide an image of the problem if any using google drive public image url only"
                  className="input-field w-full px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                  value={ticketFormData.imageURL}
                  onChange={(e) =>
                    setTicketFormData({ ...ticketFormData, imageURL: e.target.value })
                  }
                />
              </div>
    
              {/* Category field */}
              <div>
                <label className="text-gray-600 block mb-1">Category</label>
                <select 
                  name="category" 
                  value={ticketFormData.category}
                  onChange={(e) =>
                    setTicketFormData({
                      ...ticketFormData,
                      category: e.target.value,
                    })
                  } 
                  className="w-full px-4 py-2 border bg-gray-100 text-gray-700 border-gray-900 rounded-md focus:outline-none focus:border-blue-500">
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical">Technical</option>
                  <option value="Bug Report">Bug Report</option>
                </select>
              </div>
                
              {/* Image Upload Field */}
              {/* <div>
                <label className="text-gray-600 block mb-1">Upload Image</label>
                <Dropzone onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className="dropzone border border-gray-900 rounded-md p-4">
                      <input {...getInputProps()} />
                      <p>Drag and drop an image here, or click to select one</p>
                    </div>
                  )}
                </Dropzone>
                {image && <p className="mt-2">{image?.name}</p>}
              </div> */}
              {/* Image Upload Server Messages */}
              {/* <div className="w-full pt-2">
                {uploadMessage && <div className="flex justify-center mb-6 p-2 bg-emerald-300 rounded-md"><br/><p>{uploadMessage}</p><br/></div>}
                {uploadError && <div className="flex justify-center mb-6 p-2 bg-red-500 rounded-md"><br/><p>{uploadError}</p><br/></div>}
              </div> */}

              {/* Ticket Server Messages */}
              <div className="w-full pt-2">
                {message && <div className="flex justify-center mb-6 p-2 bg-emerald-300 rounded-md"><br/><p>{message}</p><br/></div>}
                {error && <div className="flex justify-center mb-6 p-2 bg-red-500 rounded-md"><br/><p>{error}</p><br/></div>}
              </div>
              
              {/* Create Ticket button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  
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
