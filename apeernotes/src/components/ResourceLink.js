'use client';
import { recordClick } from '@/app/actions/recordClick'; 

export default function ResourceLink({ href, children, title }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      onClick={async () => {
        // We call it but don't let it block the link opening
        recordClick(title, href);
      }}
    >
      {children}
    </a>
  );
}