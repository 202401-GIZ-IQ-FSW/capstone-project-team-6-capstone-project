"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import { useRouter } from 'next/navigation';
import Link from "next/link";


export default function usersPage() {
  const { signedIn, user } = useAuth();
  const router = useRouter();
  const [ users, setUsers ] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const roles = ["superAdmin", "admin"];

  useEffect(() => {
    if (signedIn === false) {
      setTimeout(() => {
        router.push('/signin'); // Adjust the path as needed
      }, 1000);
    } else if ( signedIn === true && !roles.includes(user?.role) ) {
      setTimeout(() => {
        router.push('/'); // Adjust the path as needed
      }, 1000);
    }
  }, [router, signedIn, user]);

  useEffect(() => {
    if (signedIn) {
      setLoading(true);
      setError(""); // Reset error

      const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:3001/admin/view-users', {
            credentials: 'include'
          });

          const data = await response.json();

          if (response.ok) {
            setUsers(data);
          } else {
            setError(data.error);
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }
  }, [signedIn, user]);

  if (signedIn === null || loading) {
    return (
      <div className="bg-white flex justify-center items-center m-52">
        <div className="bg-white  pageLoader"></div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleRowClick = (id) => {
    router.push(`/users/view-user/${id}`);
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
        <div className="bg-white px-5 py-40">
          <div className="bg-white flex flex-col items-center justify-center gap-6 lg:text-lg font-semibold">
            <h1>Only signed in users can view this page</h1>
            <p>Redirecting to sign in page ......</p>
          </div>
        </div>
      }
      { ( signedIn === true && !roles.includes(user?.role) ) && 
        <div className="bg-white px-5 py-40">
          <div className="bg-white flex flex-col items-center justify-center gap-6 lg:text-lg font-semibold">
            <h1>Only admins can view this page</h1>
            <p>Redirecting to home page ......</p>
          </div>
        </div>
      }
      { ( signedIn === true && roles.includes(user?.role) ) && 
        <div className="bg-white text-gray-900 flex justify-center mx-auto px-4 py-4">
          <div className="flex flex-col items-center gap-1">

            <div className="w-screen lg:w-full py-4 px-6">
              <div className="text-center p-4 rounded-lg border-[#60829d] border-2">
                <h1 className="font-bold lg:text-3xl">Users</h1>
              </div>
            </div>

            { users.length > 0 ? (
              <div className="text-gray-900 w-screen px-6 md:w-full lg:px-6">
                <div className="overflow-x-auto rounded-lg border-[#60829d] border-2">
                    <table className="overflow-x-hidden divide-y divide-gray-200">
                      <thead>
                        <tr className="text-xs lg:text-sm bg-[#60829d]">
                          <th className="px-3 py-3 text-left font-medium uppercase tracking-wider">No.</th>
                          <th className="px-3 py-3 text-left font-medium uppercase tracking-wider">Name</th>
                          <th className="px-3 py-3 text-left font-medium uppercase tracking-wider">Username</th>
                          <th className="px-3 py-3 text-left font-medium uppercase tracking-wider">Email</th>
                          <th className="px-3 py-3 text-left font-medium uppercase tracking-wider">Role</th>
                          <th className="px-3 py-3 text-left font-medium uppercase tracking-wider">Created at</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users?.map((user, index) => (
                          
                          <tr key={index} onClick={() => handleRowClick(user?._id)} className="text-xs lg:text-sm hover:bg-gray-300 cursor-pointer">
                            <td className="text-center px-3 py-4">{index+1}</td>
                            <td className="px-3 py-3">{user?.name}</td>
                            <td className="px-3 py-3">{user?.username}</td>
                            <td className="px-3 py-3">{user?.email}</td>
                            <td className="px-3 py-3">{userRoleDisplay(user?.role)}</td>
                            <td className="px-3 py-3">{formatDate(user?.createdAt)}</td>
                          </tr>

                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
            ) : (
              <p className="m-10 font-semibold">{error}</p>
            )}

          </div>
        </div>
      }
    </>

  )
}
