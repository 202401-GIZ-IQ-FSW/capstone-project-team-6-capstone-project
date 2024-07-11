"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import UsersSearch from '../components/UsersSearch';
import UsersTable from '../components/UsersTable';


export default function usersPage() {
  const { signedIn, user } = useAuth();
  const router = useRouter();
  const [ users, setUsers ] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [hideSearch, setHideSearch] = useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    role: [],
    gender: [],
    searchQuery: "",
    searchField: "name"
  });

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
            setFilteredUsers(data);
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

  useEffect(() => {
    const applyFilters = () => {
      let filtered = users;

      if (filters.role.length > 0) {
        filtered = filtered.filter(user => filters.role.includes(user.role));
      }

      if (filters.gender.length > 0) {
        filtered = filtered.filter(user => filters.gender.includes(user.gender));
      }

      if (filters.searchQuery) {
        filtered = filtered.filter(user => {

          const fieldValue = user[filters.searchField];
          
          const query = filters.searchQuery.toLowerCase();

          if (typeof fieldValue === 'string') {
            return fieldValue.toLowerCase().includes(query);
          } else if (typeof fieldValue === 'number') {
            return fieldValue.toString().includes(query);
          }

          return false;
        });
      }

      setFilteredUsers(filtered);
    };

    applyFilters();
    // console.log("filters", filters)
  }, [filters, users]);

  if (signedIn === null || loading) {
    return (
      <div className="flex justify-center items-center m-52">
        <div className="pageLoader"></div>
      </div>
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
      { ( signedIn === true && !roles.includes(user?.role) ) && 
        <div className="px-5 py-40">
          <div className="flex flex-col items-center justify-center gap-6 lg:text-lg font-semibold">
            <h1>Only admins can view this page</h1>
            <p>Redirecting to home page ......</p>
          </div>
        </div>
      }
      { ( signedIn === true && roles.includes(user?.role) ) && 
        <>
            {/* View For Mobile and Tablet */}
            <div className="flex xl:hidden">
                {/* Search Sidebar */}
                {!hideSearch && 
                    <div className="flex justify-center w-full bg-gray-50">
                    <div className="bg-gray-100 h-auto w-auto flex flex-col justify-center py-4 px-4 space-y-4 my-4 mx-4 drop-shadow-lg rounded-lg">
                        <UsersSearch onFiltersChange={setFilters} loggedUserRole={user?.role} />
                        {/* Button for Search */}
                        <button className="btn border-gray-900" onClick={ () => setHideSearch(true) }>Search</button>
                    </div>
                    </div>
                }
                {/* Users View */}
                {hideSearch && 
                    <div className="flex-1 w-screen xl:w-auto pt-6 pl-2 pr-2 bg-white">
                        <div className="flex flex-row pl-4 pr-4 gap-2">
                            {/* Button for Search */}
                            <button className="btn w-full border-gray-900" onClick={ () => setHideSearch(false) }>Search</button>
                        </div>
                        {/* Users Table */}
                        <UsersTable users={filteredUsers} errorMessage={error} user={user} />
                    </div>
                }
            </div>

            {/* View For Laptop and Desktop */}
            <div className="hidden xl:flex">
                {/* Search Sidebar */}
                <div className="bg-gray-100 h-full w-2/12 flex flex-col p-4 pt-6 space-y-4">
                    <UsersSearch onFiltersChange={setFilters} loggedUserRole={user?.role} />
                </div>
                {/* Users Table */}
                <div className="flex-1 pt-6 pl-2 pr-4 bg-white">
                    <UsersTable users={filteredUsers} errorMessage={error} user={user} />
                </div>
            </div>
        </>
      }
    </>

  )
}
