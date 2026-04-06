import Link from 'next/link';

// Clean and simple: just a visual shell
export default function DashboardCard({ title, description, link, icon }) {
  return (
    <Link href={link} className="card-anchor">
      <div className="card-container">
        <div className="card-icon">{icon}</div>
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
        </div>
      </div>
    </Link>
  );
}