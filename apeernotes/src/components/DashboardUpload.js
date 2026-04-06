'use client';

import { UploadButton } from "@uploadthing/react";
import "@uploadthing/react/styles.css";

export default function DashboardUpload() {
  return (
    <div className="card-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      border: '2px dashed #0070f3', // Dashed border makes it look like an upload zone
      background: 'rgba(255, 255, 255, 0.05)',
      color: '#ffffff'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📤</div>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>Quick Upload</h3>
      <p style={{ fontSize: '0.8rem', color: '#ccc', marginBottom: '20px' }}>
        Share your PDFs or Videos
      </p>
      
      <UploadButton
        endpoint="dashboardUploader"
        onClientUploadComplete={(res) => {
          // This fires after the file is safe in the cloud
          alert("Upload Successful!");
          window.location.reload(); 
        }}
        onUploadError={(error) => {
          alert(`Upload Failed: ${error.message}`);
        }}
        appearance={{
          button: {
            background: '#0070f3',
            fontSize: '14px',
            padding: '10px 20px',
            borderRadius: '8px'
          },
          allowedContent: {
            color: '#aaa',
            fontSize: '12px'
          }
        }}
      />
    </div>
  );
}