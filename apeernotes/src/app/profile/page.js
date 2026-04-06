import Link from 'next/link';

export default function ProfilePage() {
  return (
    <main 
      className="body" 
      id="profilebody" 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        textAlign: 'center' 
      }}
    >
      <h1 style={{ fontSize: '60px', fontFamily: 'Calibri', margin: '0' }}>
        Not Logged In
      </h1>
      
      <div style={{ marginTop: '20px' }}>
        <Link 
          href="/login" 
          className="btn" 
          style={{ 
            color: 'red', 
            fontSize: '30px', 
            textDecoration: 'none',
            display: 'inline-block' 
          }}
        >
          Log In?
        </Link>
      </div>
    </main>
  );
}