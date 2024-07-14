"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import { useRouter } from 'next/navigation';
import UsersSearch from '../components/UsersSearch';
import UsersTable from '../components/UsersTable';
import Pagination from "../components/Pagination ";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import UsersStatCircle from "../components/UsersStatCircle";
import AllowAll from "../components/AllowAll";



export default function usersPage() {
  const { signedIn, user } = useAuth();
  const router = useRouter();
  const [ users, setUsers ] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [hideSearch, setHideSearch] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    role: [],
    status: [],
    gender: [],
    searchQuery: "",
    searchField: "name"
  });
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // Number of tickets per page

  const roles = ["superAdmin", "admin"];

  useEffect(() => {
    if (signedIn === false) {
      setLoading(false);
      setTimeout(() => {
        router.push('/signin');
      }, 1000);
    } else if ( signedIn === true && !roles.includes(user?.role) ) {
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  }, [router, signedIn, user]);

  // Fetch Users
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

// Filter and Sort Users
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...users];

      if (filters.role.length > 0) {
        filtered = filtered.filter(user => filters.role.includes(user.role));
      }

      if (filters.status.length > 0) {
        filtered = filtered.filter(user => filters.status.includes(user.status));
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

      filtered = filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        // Convert age fields to a number if they exist, otherwise set them to a very high or very low value
        if (sortField === 'age') {
          aValue = aValue ? aValue : (sortOrder === 'asc' ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER);
          bValue = bValue ? bValue : (sortOrder === 'asc' ? Number.MAX_SAFE_INTEGER : Number.MIN_SAFE_INTEGER);
        } else {
          if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
          }
        }

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      setFilteredUsers(filtered);

      // Check if current page is within the valid range 
      // And Reset the current page if there are no results for the current page
      const totalPages = Math.ceil(filtered.length / usersPerPage);
      if (currentPage > totalPages) {
        setCurrentPage(totalPages > 0 ? totalPages : 1);
      } else if (filtered.length === 0) {
        setCurrentPage(1);
      }

    };

    applyFilters();
    // console.log("filters", filters)
  }, [filters, users, sortField, sortOrder, currentPage, usersPerPage]);

  if (signedIn === null || loading) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center m-52">
          <div className="pageLoader"></div>
        </div>
      </div>
    );
  }

  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser= indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {signedIn === false && 
        <div className="h-screen px-5 py-28">
          <div className="flex flex-col items-center justify-center gap-6 lg:text-lg font-semibold">
            <h1>Only signed in users can view this page</h1>
            <p>Redirecting to sign in page......</p>
          </div>
        </div>
      }
      { ( signedIn === true && !roles.includes(user?.role) ) && 
        <div className="h-screen px-5 py-28">
          <div className="flex flex-col items-center justify-center gap-6 lg:text-lg font-semibold">
            <h1>Only admins can view this page</h1>
            <p>Redirecting to home page......</p>
          </div>
        </div>
      }
      { ( signedIn === true && roles.includes(user?.role) ) && 
        <>
          {/* View For Mobile and Tablet */}
          <div className="flex xl:hidden">

            {/* Search Sidebar */}
            { !hideSearch && 
              <div className="flex justify-center w-full bg-gray-50">

                <div className="bg-gray-100 h-auto w-auto flex flex-col justify-center py-4 px-4 space-y-4 my-4 mx-4 drop-shadow-lg rounded-lg">
                  
                  {/* Search */}
                  <UsersSearch 
                    onFiltersChange={setFilters} 
                    loggedUserRole={user?.role} 
                    onSortChange={handleSortChange}
                    sortField={sortField}
                    sortOrder={sortOrder}
                  />

                  {/* Button for Search */}
                  <button className="btn border-gray-900" onClick={ () => setHideSearch(true) }>
                    Search
                  </button>

                </div>
              </div>
            }

            {/* Users View */}
            { hideSearch && 
              <div className="flex-1 w-screen xl:w-auto pt-6 pl-2 pr-2 bg-white">

                {/* Button for Search and Stats */}
                <div className="flex flex-row pl-4 pr-4 gap-4">

                  {/* Button for Search */}
                  <button className="btn w-[49%] text-xs border-gray-900" onClick={ () => setHideSearch(false) }>
                    Search
                  </button>

                  {/* Button for Stats */}
                  <button className="btn w-[49%] text-xs border-gray-900" onClick={ () => setShowStats(!showStats) }>
                    {showStats ? "Hide Stats" : "Show Stats"}
                    <FontAwesomeIcon icon={ showStats ? faChevronUp : faChevronDown } className="pt-0.5" />
                  </button>

                </div>

                {/* Stats View */}
                { showStats &&
                  <UsersStatCircle users={users} loggedUserRole={user?.role}  />
                }

                {/* Allow All */}
                <AllowAll />

                {/* Users Table */}
                <UsersTable users={currentUsers} filteredUsers={filteredUsers} errorMessage={error} user={user} />
                
                {/* Pagination */}
                { filteredUsers.length > 0  &&
                  <Pagination
                    resultPerPage={usersPerPage} 
                    totalResult={filteredUsers.length} 
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                }

              </div>
            }
          </div>

          {/* View For Laptop and Desktop */}
          <div className="hidden xl:flex">

              {/* Search Sidebar */}
              <div className="bg-gray-100 w-2/12 flex flex-col p-4 pt-6 space-y-4">
                <UsersSearch 
                  onFiltersChange={setFilters} 
                  loggedUserRole={user?.role} 
                  onSortChange={handleSortChange}
                  sortField={sortField}
                  sortOrder={sortOrder}
                />
              </div>

              {/* Users View*/}
              <div className="flex-1 pt-6 pl-2 pr-4 bg-white">

                {/* Button for Stats */}
                <div className="flex flex-row pl-4 pr-4 gap-2">

                  <button className="btn text-base w-full border-gray-900" onClick={ () => setShowStats(!showStats) }>
                    { showStats ? "Hide Stats" : "Show Stats" }
                    <FontAwesomeIcon icon={ showStats ? faChevronUp : faChevronDown } className="pt-0.5 pl-2" />
                  </button>

                </div>

                {/* Stats View */}
                { showStats &&
                  <UsersStatCircle users={users} loggedUserRole={user?.role} />
                }

                {/* Allow All */}
                <AllowAll />

                {/* Users Table */}
                <UsersTable users={currentUsers} filteredUsers={filteredUsers} errorMessage={error} user={user} />

                {/* Pagination */}
                { filteredUsers.length > 0  &&
                  <Pagination
                    resultPerPage={usersPerPage} 
                    totalResult={filteredUsers.length} 
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                }
              </div>
          </div>
        </>
      }
    </>

  )
}
