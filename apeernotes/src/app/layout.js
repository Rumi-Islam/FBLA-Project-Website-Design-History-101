"use client";
import "./globals.css";
import Link from "next/link";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        {/* REMOVED "container" class to prevent the 200px shrink */}
        <header id="header">
          <nav>
            <Link href="/">
              <img src="/images/APeerNotesLogo.png" alt="Logo" className="logo" />
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
                    <Link href="/studentresources" className="dropdown-item" onClick={() => setIsOpen(false)}>
                      Student Resources
                    </Link>
                    <Link href="/officialresources" className="dropdown-item" onClick={() => setIsOpen(false)}>
                      Official Resources
                    </Link>
                  </div>
                )}
              </li>
              
              <li><Link href="/dashboard" className="btn">Dash</Link></li>
              <li><Link href="/profile" className="btn">Profile</Link></li>
            </ul>
          </nav>
        </header>

        {/* This is where the Dashboard or other pages render */}
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}