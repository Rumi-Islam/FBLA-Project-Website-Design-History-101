export const dynamic = 'force-dynamic';

import DashboardCard from '../../components/DashboardCard';
import prisma from '../../../lib/prisma';
import { cookies } from 'next/headers'; // 1. Import cookies to read the session

export default async function DashboardPage() {
  // 2. Get the User ID from the browser's cookies
  const cookieStore = await cookies();
  const userIdString = cookieStore.get('userId')?.value;
  
  // 3. Convert the ID to a number (since your Prisma schema uses Int)
  const userId = userIdString ? parseInt(userIdString) : null;

  // 4. Fetch the REAL user from the database based on that ID
  const user = await prisma.user.findUnique({
    where: { id: userId || 0 } // If no cookie exists, search for ID 0 (which won't exist)
  });

  // 5. Prepare variables (Fallbacks ensure the page doesn't crash if logged out)
  const displayName = user?.username || "Student";
  const lastUnit = user?.lastUnitAccessed || "No units started yet";
  const lastLink = user?.lastUnitLink || "/resources";

  return (
    <div id="dashboardbody" className="dashboard-container">
      {/* 6. Display the actual username from the DB */}
      <h1 style={{ padding: '0 40px', marginTop: '20px', color: '#ffffff'}}>
        Welcome back, {displayName}!
      </h1>

      <div className="dashboard-grid">
        <DashboardCard 
          title="Continue Learning" 
          description={`Pick up where you left off: ${lastUnit}`}
          link={lastLink}
          icon="⏳"
        />
        
        <DashboardCard 
          title="Browse All Units" 
          description="See the full list of AP World history resources."
          link="/resources"
          icon="📚"
        />
      </div>
    </div>
  );
}