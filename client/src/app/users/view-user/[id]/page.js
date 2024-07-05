"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../../components/AuthContext";
import { useRouter } from 'next/navigation';
import Link from "next/link";


export default function viewUserPage({params}) {
  const { signedIn, user } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const userId = params.id; 
  const roles = ["superAdmin", "admin"];

  const [userFormData, setUserFormData] = useState({
    role: ""
  });

  useEffect(() => {
    if (signedIn === false) {
      setTimeout(() => {
        router.push('/signin');
      }, 1000);
    } else if ( signedIn === true && userFormData?._id && userFormData?._id !== user?._id && user?.role !== "superAdmin" && userFormData?.role && !( user?.role === "admin" && !roles.includes(userFormData?.role) ) ) {
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  }, [router, signedIn, user, userFormData]);

  useEffect(() => {
    if (signedIn) {
      setLoading(true);

      const fetchUser = async () => {
        try {
          let response;

          if (roles.includes(user?.role)) {
            response = await fetch(`http://localhost:3001/admin/view-user/${userId}`, { credentials: 'include' });
          } else {
            response = await fetch(`http://localhost:3001/user/profile`, { credentials: 'include' });
          }

          const data = await response.json();

          if (response.ok) {
            setUserFormData(data);
          } else {
            setError(data.error);
          }
        } catch (error) {
            setError(error);
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    }
  }, [signedIn]);

  if (signedIn === null || loading) {
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
      const response = await fetch(`http://localhost:3001/admin/update-user-role/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userFormData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("User role updated successfully");
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

    console.log("Updating user role:", userFormData);
  }

  function handleUserFormValid() {
    return (
      userFormData.role.trim() !== ""
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDateOfBirth = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const userRoleDisplay = (role) => {
    switch (role) {
      case 'superAdmin':
        return 'Super Admin';
      case 'admin':
        return 'Admin';
      case 'supportAgent':
        return 'Support Agent';
      case 'customer':
        return 'Customer';
      default:
        return '';
    }
  };

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
      { ( signedIn === true && userFormData?._id && userFormData?._id !== user?._id && user?.role !== "superAdmin" && userFormData?.role && !( user?.role === "admin" && !roles.includes(userFormData?.role) ) ) && 
        <div className="px-5 py-40">
          <div className="flex flex-col items-center justify-center gap-6 lg:text-lg font-semibold">
            <h1>Not Authorized</h1>
            <p>Redirecting to home page ......</p>
          </div>
        </div>
      }
      {signedIn === true && 
        <div className="bg-white">
          <div className="max-w-screen-lg mx-auto px-4 py-8">
          
            <div className="flex mb-4 gap-2">
            { userFormData?._id === user?._id &&
                <Link href={`/users/edit-user/${userId}`}>
                  <button className="bg-sky-500 hover:opacity-50 text-white font-bold py-2 px-4 rounded text-sm lg:text-base">
                    Edit User
                  </button>
                </Link>
              }
              { ( userFormData?._id === user?._id || user?.role === "superAdmin" || ( user?.role === "admin" && !roles.includes(userFormData?.role) ) ) &&
                <Link href={`/users/delete-user/${userId}`}>
                  <button className="bg-red-500 hover:opacity-50 text-white font-bold py-2 px-4 rounded text-sm lg:text-base">
                    Delete User
                  </button>
                </Link>
              }
            </div>

            <h2 className=" text-gray-600 text-lg lg:text-3xl font-bold mb-4 text-left">Name: {userFormData?.name}</h2>
            <h3 className=" text-gray-600 text-base lg:text-xl font-semibold mb-4">Username: {userFormData?.username}</h3>
            <h3 className=" text-gray-600 text-base lg:text-xl font-semibold mb-4">Email: {userFormData?.email}</h3>
            <h3 className=" text-gray-600 text-sm lg:text-lg font-normal mb-4"><b>Created at:</b> {formatDate(userFormData?.createdAt)}</h3>
            <h3 className=" text-gray-600 text-sm lg:text-lg font-normal mb-4"><b>Updated at:</b> {formatDate(userFormData?.updatedAt)}</h3>
            <p className=" text-gray-600 lg:text-lg font-normal mb-4"><b>Gender:</b> {userFormData?.gender}</p>
            <p className=" text-gray-600 lg:text-lg font-normal mb-4"><b>Phone:</b> {userFormData?.phone ? userFormData?.phone : ""}</p>
            <p className=" text-gray-600 lg:text-lg font-normal mb-4"><b>Country:</b> {userFormData?.country ? userFormData?.country : ""}</p>
            <p className=" text-gray-600 lg:text-lg font-normal mb-4"><b>Date of birth:</b> {userFormData?.dateOfBirth ? formatDateOfBirth(userFormData?.dateOfBirth) : ""}</p>
            <p className=" text-gray-600 lg:text-lg font-normal mb-4"><b>Age:</b> {userFormData?.age ? userFormData?.age : ""}</p>
            <p className=" text-gray-600 lg:text-lg font-normal mb-4"><b>Account Type:</b> {userRoleDisplay(userFormData.role)}</p>

            { ( (user?.role === "superAdmin" && user?._id !== userId) || ( user?.role === "admin" && !roles.includes(userFormData?.role) ) ) &&
                <p className=" text-gray-600 text-lg font-normal my-2 text-wrap"><b>Change User Role</b></p>
            }

            {/* Form for updating user role */}
            { ( (user?.role === "superAdmin" && user?._id !== userId) || ( user?.role === "admin" && !roles.includes(userFormData?.role) ) ) &&
              <form className="space-y-4" onSubmit={handleUpdateUser}>

              {/* Role field */}
              <div>
                <label className="text-gray-600 block mb-1">Role</label>
                <select 
                  name="role" 
                  value={userFormData.role}
                  onChange={(e) =>
                    setUserFormData({
                      ...userFormData,
                      role: e.target.value,
                    })} 
                  className="w-min px-4 py-2 border bg-gray-100 border-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                >
                  { user?.role === "superAdmin" && <option value="admin">Admin</option> }
                  <option value="supportAgent">Support Agent</option>
                  <option value="customer">Customer</option>
                </select>
              </div>
              
              <div className="w-full">
                {message && <div className="flex justify-center mb-6 p-2 bg-emerald-300 rounded-md"><br/><p>{message}</p><br/></div>}
                {error && <div className="flex justify-center mb-6 p-2 bg-red-500 rounded-md"><br/><p>{error}</p><br/></div>}
              </div>
    
              <div className="flex justify-start">
                <button
                  type="submit"
                  className={`bg-blue hover:bg-gray-400 text-white font-bold py-2 px-4 rounded ${
                    !handleUserFormValid() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={!handleUserFormValid()}
                >
                  Update User Role
                </button>
              </div>
            </form>}

          </div>
        </div>
      }
    </>
  )
}
