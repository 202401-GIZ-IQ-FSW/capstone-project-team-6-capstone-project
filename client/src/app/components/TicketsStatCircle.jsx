import StatusIcons from "./StatusIcons";


export default function UsersStatCircle({ tickets }) {

    const categoryGeneral = tickets.filter(ticket => ticket.category === 'General Inquiry');
    const categoryTechnical = tickets.filter(ticket => ticket.category === 'Technical');
    const categoryBug = tickets.filter(ticket => ticket.category === 'Bug Report');

    const statusOpen = tickets.filter(ticket => ticket.status === 'Open');
    const statusInProgress = tickets.filter(ticket => ticket.status === 'In Progress');
    const statusClosed = tickets.filter(ticket => ticket.status === 'Closed');

    const priorityLow = tickets.filter(ticket => ticket.priority === 'Low');
    const priorityMedium = tickets.filter(ticket => ticket.priority === 'Medium');
    const priorityHigh = tickets.filter(ticket => ticket.priority === 'High');
    const priorityUrgent = tickets.filter(ticket => ticket.priority === 'Urgent');
    const priorityCritical = tickets.filter(ticket => ticket.priority === 'Critical');
  
    return (
      <>
        <div className="mt-8 mb-2 flex flex-wrap items-center justify-center px-4 gap-14 text-sm lg:text-base">
            
            <StatItem label="Total" count={tickets?.length} />
            
            <StatItem label="Open" count={statusOpen.length} />
            <StatItem label="In Progress" count={statusInProgress.length} />
            <StatItem label="Closed" count={statusClosed.length} />

            <StatItem label="General" count={categoryGeneral.length} />
            <StatItem label="Technical" count={categoryTechnical.length} />
            <StatItem label="Bug Report" count={categoryBug.length} />
        
            <StatItem label="Low" count={priorityLow?.length} />
            <StatItem label="Medium" count={priorityMedium.length} />
            <StatItem label="High" count={priorityHigh.length} />
            <StatItem label="Urgent" count={priorityUrgent.length} />
            <StatItem label="Critical" count={priorityCritical.length} />

        </div>
      </>
    );
  }
  
  
  const StatItem = ({ label, count }) => (
    <div className="flex flex-col items-center justify-center w-[6rem] h-[6rem] lg:w-28 lg:h-28 relative">
      <svg className="absolute w-full h-full">
        <circle className="circle-border" cx="50%" cy="50%" r="45%" />
      </svg>
      <div className="flex flex-col justify-center w-full h-full rounded-full border-2 border-gray-400 space-y-1 text-center px-2">
        <p>{label}</p>
        <hr className="border border-gray-400 rounded-lg mx-1" />
        <div className="flex flex-row items-center justify-center">
            { label !== "Total" && <StatusIcons field={ label !== "General" ? label : "General Inquiry" } /> }
            { label !== "Total" && <div className="h-5 mx-2 border-r border-gray-400"></div> }
            <p>{count}</p>
        </div>
      </div>
    </div>
  );