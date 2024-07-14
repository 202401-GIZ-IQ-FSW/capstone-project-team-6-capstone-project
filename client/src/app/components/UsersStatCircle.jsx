import StatusIcons from "./StatusIcons";


export default function UsersStatCircle({ users, loggedUserRole }) {

  const activeUsers = users.filter(user => user.status === 'Active');
  const pendingUsers = users.filter(user => user.status === 'Pending');
  const blockedUsers = users.filter(user => user.status === 'Blocked');

  const admins = users.filter(user => user.role === 'admin');
  const supportAgents = users.filter(user => user.status === 'supportAgent');
  const customers = users.filter(user => user.status === 'customer');

  return (
    <div className="mt-8 mb-2 flex flex-wrap items-center justify-evenly px-4 gap-4 text-sm lg:text-base">
      <StatItem label="Total" count={users?.length} />

      { loggedUserRole === "superAdmin" &&
        <StatItem label="Admins" field="admin" count={admins.length} />}
      <StatItem label="Supports" field="supportAgent" count={supportAgents.length} />
      <StatItem label="Customers" field="customer" count={customers.length} />

      <StatItem label="Active" field="Active" count={activeUsers.length} />
      <StatItem label="Pending" field="Pending" count={pendingUsers.length} />
      <StatItem label="Blocked" field="Blocked" count={blockedUsers.length} />
    </div>
  );
}


const StatItem = ({ label, field, count }) => (
  <div className="flex flex-col items-center justify-center w-[6rem] h-[6rem] lg:w-28 lg:h-28 relative">
    <svg className="absolute w-full h-full">
      <circle className="circle-border" cx="50%" cy="50%" r="45%" />
    </svg>
    <div className="flex flex-col justify-center w-full h-full rounded-full border-2 border-gray-400 space-y-1 text-center px-2">
      <p>{label}</p>
      <hr className="border border-gray-400 rounded-lg mx-1" />
      <div className="flex flex-row items-center justify-center">
        { label !== "Total" && <StatusIcons field={field} /> }
        { label !== "Total" && <div className="h-5 mx-2 border-r border-gray-400"></div> }
        <p>{count}</p>
      </div>
    </div>
  </div>
);