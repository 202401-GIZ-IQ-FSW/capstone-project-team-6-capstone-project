"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../../components/AuthContext";
import { useRouter } from 'next/navigation';


export default function editUserPage({params}) {
  const { signedIn, user } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const userId = params.id; 

  const [userFormData, setUserFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    dateOfBirth: "",
    gender: "Prefer not to disclose",
  });

  useEffect(() => {
    if (signedIn === false) {
      setTimeout(() => {
        router.push('/signin');
      }, 1000);
    } else if ( signedIn === true && userFormData?._id && userFormData?._id !== user?._id ) {
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  }, [router, signedIn, user, userFormData]);

  useEffect(() => {
    if (signedIn) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`http://localhost:3001/user/profile`, {
            credentials: 'include'
          });

          const data = await response.json();

          if (response.ok) {
            if (data.dateOfBirth) {
              data.dateOfBirth = new Date(data.dateOfBirth).toISOString().split('T')[0]; // Format date to yyyy-mm-dd
            }
            setUserFormData(data);
          } else {
            setError(data.error);
          }
        } catch (error) {
            setError(error);
        }
      };

      fetchUser();
    }
  }, [signedIn]);

  if (signedIn === null) {
    return (
      <div className="flex justify-center items-center m-52">
        <div className="pageLoader"></div>
      </div>
    );
  }
  
  const handleUpdateUser = async (event) => {
    event.preventDefault();
    setMessage(""); // Reset message
    setError(""); // Reset error

    try {
      const response = await fetch(`http://localhost:3001/user/profile`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userFormData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("User updated successfully");
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
    
    console.log("Updating User:", userFormData);
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
      { ( signedIn === true && userFormData?._id && userFormData?._id !== user?._id ) && 
        <div className="px-5 py-40">
          <div className="flex flex-col items-center justify-center gap-6 lg:text-lg font-semibold">
            <h1>User can only edit their own account</h1>
            <p>Redirecting to home page ......</p>
          </div>
        </div>
      }
      {signedIn === true && 
        <div className="bg-white">
          <div className="max-w-screen-lg mx-auto px-4 py-8">
            
            <h2 className=" text-gray-600 text-3xl font-bold mb-4 text-left">User Account Details</h2>
            
            <h3 className=" text-gray-600 text-xl font-semibold mb-4">User Details</h3>
            
            {/* Form for updating a user */}
            <form className="space-y-4" onSubmit={handleUpdateUser}>
              
              {/* Name field */}
              <div>
                <label className="text-gray-600 block mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className="input-field w-full px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                  value={userFormData.name ? userFormData.name : ""}
                  onChange={(e) =>
                    setUserFormData({ ...userFormData, name: e.target.value })
                  }
                />
              </div>
  
              {/* Username field */}
              <div>
                <label className="text-gray-600 block mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="input-field w-full px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                  value={userFormData.username ? userFormData.username : ""}
                  onChange={(e) =>
                    setUserFormData({ ...userFormData, username: e.target.value })
                  }
                />
              </div>
    
              {/* Email field */}
              <div>
                <label className="text-gray-600 block mb-1">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  className="input-field w-full px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                  value={userFormData.email ? userFormData.email : ""}
                  onChange={(e) =>
                    setUserFormData({ ...userFormData, email: e.target.value })
                  }
                />
              </div>
   
              {/* Password field */}
              <div>
                <label className="text-gray-600 block mb-1">Password</label>
                <input
                  type="text"
                  name="password"
                  placeholder="Enter your password"
                  className="input-field w-full px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                  value={userFormData.password ? userFormData.password : ""}
                  onChange={(e) =>
                    setUserFormData({ ...userFormData, password: e.target.value })
                  }
                />
              </div>
    
              {/* Phone field */}
              <div>
                <label className="text-gray-600 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+123 1234 123 1234"
                  className="input-field w-full px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                  value={userFormData.phone ? userFormData.phone : ""}
                  onChange={(e) =>
                    setUserFormData({ ...userFormData, phone: e.target.value })
                  }
                />
              </div>
  
              {/* Country field */}
              <div>
                <label className="text-gray-600 block mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  placeholder="Enter you country"
                  className="input-field w-full px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                  value={userFormData.country ? userFormData.country : ""}
                  onChange={(e) =>
                    setUserFormData({ ...userFormData, country: e.target.value })
                  }
                />
              </div>

              {/* Date of Birth field */}
              <div>
                <label className="text-gray-600 block mb-1">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  className="input-field w-full px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                  value={userFormData.dateOfBirth ? userFormData.dateOfBirth : ""}
                  onChange={(e) =>
                    setUserFormData({ ...userFormData, dateOfBirth: e.target.value })
                  }
                />
              </div>

              {/* Gender field */}
              <div>
                <label className="text-gray-600 block mb-1">Gender</label>
                <select 
                  name="gender" 
                  value={userFormData.gender}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      gender: e.target.value,
                    })
                  } 
                  className="w-full px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500">
                  <option value="Prefer not to disclose">Prefer not to disclose</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="w-full pt-2">
                {message && <div className="flex justify-center mb-6 p-2 bg-emerald-300 rounded-md"><br/><p>{message}</p><br/></div>}
                {error && <div className="flex justify-center mb-6 p-2 bg-red-500 rounded-md"><br/><p>{error}</p><br/></div>}
              </div>
    
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`bg-blue hover:bg-gray-400 hover:opacity-50 text-white font-bold py-2 px-4 rounded`}
                >
                  Update Account
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  );
};
