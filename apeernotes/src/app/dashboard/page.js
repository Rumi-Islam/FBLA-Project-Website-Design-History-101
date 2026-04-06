export const dynamic = 'force-dynamic';

import DashboardCard from '../../components/DashboardCard';
import prisma from '../../../lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  // 1. Authenticate the user via cookies
  const cookieStore = await cookies();
  const userIdString = cookieStore.get('userId')?.value;
  
  if (!userIdString) {
    redirect('/login');
  }

  const userId = parseInt(userIdString);

  // 2. Fetch the user and their 3 most recent activities
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      history: {
        orderBy: { createdAt: 'desc' }, // Get newest first
        take: 3,                       // Limit to exactly 3
      }
    }
  });

  // 3. Safety check if user was deleted but cookie remained
  if (!user) {
    redirect('/login');
  }

  const recentActivities = user.history || [];

  return (
    <div id="dashboardbody" className="dashboard-container">
      <h1 style={{ padding: '0 40px', marginTop: '20px', color: '#ffffff'}}>
        Welcome back, {user.username}!
      </h1>

      <div className="dashboard-grid">
        {/* 4. Loop through the activities. React handles 0, 1, 2, or 3 cards automatically. */}
        {recentActivities.map((item) => (
          <DashboardCard 
            key={item.id}
            title="Continue Learning" 
            description={item.title} // Shows the title of the specific resource clicked
            link={item.link}          // Links back to that specific PDF/Video
            icon="⏳"
          />
        ))}

        {/* 5. Fallback if the user is brand new with no history */}
        {recentActivities.length === 0 && (
          <DashboardCard 
            title="Start Your Journey" 
            description="You haven't viewed any units yet. Jump into the resources!"
            link="/resources"
            icon="🚀"
          />
        )}
        
        {/* 6. Static card that is always there */}
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