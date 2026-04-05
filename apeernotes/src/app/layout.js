"use client";
import "./globals.css";
import Link from "next/link";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <html lang="en">
      <body>

        <div className="container" id="header">
          <nav>
            <Link href="/">
              <img src="/images/APeerNotesLogo.png" className="logo" />
            </Link>
            <ul>
              <li className="dropdown-wrapper">
                <button 
                  className="btn" 
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Resources
                </button>
                {isOpen && (
                  <div className="dropdown-menu">
                    <Link href="/studentresources" className="dropdown-item">Student Resources</Link>
                    <Link href="/resources" className="dropdown-item">Official Resources</Link>
                  </div>
                )}
              </li>
              {/* DROPDOWN END */}
              <li><Link href="/about" className="btn">About Us</Link ></li>
              <li><Link href="/profile" className="btn">Profile</Link ></li>
            </ul>
          </nav>
        </div>
        
        {children}
      </body>
    </html>
  );
}