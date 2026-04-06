export const dynamic = 'force-dynamic';

import DashboardCard from '../../components/DashboardCard';
import DashboardUpload from '../../components/DashboardUpload'; // Import your new upload button
import prisma from '../../../lib/prisma';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userIdString = cookieStore.get('userId')?.value;
  
  if (!userIdString) {
    redirect('/login');
  }

  const userId = parseInt(userIdString);

  // 1. Fetch user + 3 history items + ALL their uploaded files
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      history: {
        orderBy: { createdAt: 'desc' },
        take: 3,
      },
      uploads: {
        orderBy: { createdAt: 'desc' }, // Newest uploads first
      }
    }
  });

  if (!user) {
    redirect('/login');
  }

  const recentActivities = user.history || [];
  const myUploads = user.uploads || [];

  return (
    <div id="dashboardbody" className="dashboard-container">
      <h1 style={{ padding: '0 40px', marginTop: '20px', color: '#ffffff'}}>
        Welcome back, {user.username}!
      </h1>

      <div className="dashboard-grid">
        {/* 2. THE UPLOAD BUTTON CARD (Always visible) */}
        <DashboardUpload />

        {/* 3. RECENT ACTIVITY CARDS (Max 3) */}
        {recentActivities.map((item) => (
          <DashboardCard 
            key={`history-${item.id}`}
            title="Continue Learning" 
            description={item.title}
            link={item.link}
            icon="⏳"
          />
        ))}

        {/* 4. USER UPLOAD CARDS */}
        {myUploads.map((file) => (
          <DashboardCard 
            key={`upload-${file.id}`}
            title="My Upload" 
            description={file.fileName}
            link={file.fileUrl} // This is the link to the cloud file
            icon={file.fileType === 'pdf' ? "📄" : "🎥"}
          />
        ))}

        {/* 5. Fallback if they have NO history and NO uploads */}
        {recentActivities.length === 0 && myUploads.length === 0 && (
          <DashboardCard 
            title="Start Your Journey" 
            description="Explore resources or upload your own notes to see them here!"
            link="/resources"
            icon="🚀"
          />
        )}
        
        {/* 6. Static link to resources */}
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