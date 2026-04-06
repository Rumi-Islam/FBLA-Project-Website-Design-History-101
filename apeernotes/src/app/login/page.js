"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import the router
import "../signup/signup.css"; 

export default function LoginPage() {
  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Grab the data from the form
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // 2. Send a POST request to your login API
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // 3. SUCCESS: Redirect to dashboard
        router.push("/dashboard");
        router.refresh(); // Forces Next.js to update the session data
      } else {
        // 4. ERROR: Show a message if login fails
        const errorData = await response.json();
        alert(errorData.error || "Login failed. Check your email/password.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div id="signup-container"> 
      <div className="wrapper">
        <h1>Login</h1>
        <form id="form" onSubmit={handleSubmit}>
          {/* Email Row */}
          <div>
            <label htmlFor="email-input">
              <span>@</span>
            </label>
            <input 
              type="email" 
              name="email" 
              id="email-input" 
              placeholder="Email" 
              required 
            />
          </div>

          {/* Password Row */}
          <div>
            <label htmlFor="password-input">
              <svg xmlns="http://www.w3.org/2000/svg" height="36px" viewBox="0 -960 960 960" width="36px" fill="#ffffff">
                <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/>
              </svg>
            </label>
            <input 
              type="password" 
              name="password" 
              id="password-input" 
              placeholder="Password" 
              required 
            />
          </div>

          <button type="submit">Login</button>
        </form>
        
        <p>Don't have an account? <Link href="/signup">Sign Up</Link></p>
        <Link href="/">Go Back?</Link>
      </div>
    </div>
  );
}