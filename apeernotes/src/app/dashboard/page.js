import DashboardCard from '@/components/DashboardCard';
import prisma from '../../../lib/prisma'; // or wherever your prisma client is

export default async function DashboardPage() {
  // 1. Fetch data from the database
  const user = await prisma.user.findUnique({
    where: { id: 1 } // In a real app, you'd get this from the session
  });

  // 2. Prepare the variables
  const lastUnit = user?.lastUnitAccessed || "No units started yet";
  const lastLink = user?.lastUnitLink || "/resources";

  return (
    <div className="dashboard-grid">
      {/* 3. Plug the database data into the component */}
      <DashboardCard 
        title="Continue Learning" 
        description={`Pick up where you left off: ${lastUnit}`}
        link={lastLink}
        icon="⏳"
      />
      
      {/* You can still have normal cards too */}
      <DashboardCard 
        title="Browse All Units" 
        description="See the full list of AP World history resources."
        link="/resources"
        icon="📚"
      />
    </div>
  );
}