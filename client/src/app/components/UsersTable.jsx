import { useRouter } from 'next/navigation';
import Link from "next/link";


export default function UsersTable({users, filteredUsers, errorMessage, user}) {
  const router = useRouter();
  const resultsCount = filteredUsers? filteredUsers.length : 0;

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
    <div className="p-4 pt-0 border-gray-300 overflow-y-auto bg-white">
        <h2 className="text-lg lg:text-2xl font-bold text-gray-800">Users</h2>
        <p className="text-gray-600 mt-2 mb-4 text-sm lg:text-base">{resultsCount} results found for your search</p>

        { users.length > 0 ? (
            <div className="mb-4">
                <div className="overflow-x-auto rounded-lg border-gray-500 border-2">
                    
                    <table className="w-screen xl:w-full divide-y divide-gray-200">
                        
                        <thead>
                        <tr className="text-xs lg:text-sm bg-gray-400 text-gray-800 align-top text-center font-medium uppercase tracking-wider">
                            <th className="px-1 py-3 text-center">No.</th>
                            <th className="px-1 py-3">Name</th>
                            <th className="px-1 py-3">Username</th>
                            <th className="px-1 py-3">Email</th>
                            <th className="px-1 py-3">Role</th>
                            <th className="px-1 py-3 text-center">Age</th>
                            <th className="px-1 py-3 text-center">Phone</th>
                            <th className="px-1 py-3 text-center">Status</th>
                            <th className="px-1 py-3">Created at</th>
                        </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                        {users?.map((user, index) => (
                            
                            <tr key={index} onClick={() => handleRowClick(user?._id)} className="text-nowrap text-center text-xs lg:text-sm hover:bg-gray-300 cursor-pointer">
                            <td className="text-center px-1 py-4">{index+1}</td>
                            <td className="px-1 py-3">{user?.name}</td>
                            <td className="px-1 py-3">{user?.username}</td>
                            <td className="px-1 py-3">{user?.email}</td>
                            <td className="px-1 py-3">{userRoleDisplay(user?.role)}</td>
                            <td className="px-1 py-3 text-center">{user?.age || "-"}</td>
                            <td className="px-1 py-3 text-center">{user?.phone || "-"}</td>
                            <td className="px-1 py-3">{user?.status}</td>
                            <td className="px-1 py-3">{formatDate(user?.createdAt)}</td>
                            </tr>

                        ))}
                        </tbody>

                    </table>

                </div>
            </div>
        ) : (
            <p className="m-10 font-semibold">{errorMessage}</p>
        )}

    </div>
  )
}
