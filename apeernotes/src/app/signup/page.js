"use client";
import { useState } from "react";
import Link from "next/link";
import "./signup.css";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [errors, setErrors] = useState([]);

  const validate = () => {
    let errs = [];
    // Strong Password Regex: 1 Uppercase, 1 Number, 1 Special Char, Min 8 Length
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.username) errs.push("Username is required");
    if (!formData.email.includes("@")) errs.push("Valid email is required");
    
    if (!strongPassword.test(formData.password)) {
      errs.push("Password must be 8+ chars with an uppercase, a number, and a symbol (@$!%*?&)");
    }
    
    if (formData.password !== formData.repeatPassword) {
      errs.push("Passwords do not match");
    }

    setErrors(errs);
    return errs.length === 0;
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validate()) {
      try {
        // This tells the browser to send the data to your API folder
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password
          }),
        });

        const data = await res.json();

        if (res.ok) {
          alert("Account created successfully!");
          // This sends the user to the login page after they succeed
          window.location.href = '/login'; 
        } else {
          // If Prisma or Supabase returns an error (like "Email taken")
          setErrors([data.error || "Signup failed"]);
        }
      } catch (error) {
        console.error("Connection error:", error);
        setErrors(["Could not connect to the database. Check your internet or terminal."]);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors.length > 0) setErrors([]); // Clear errors as they type
  };

  return (
    <div id="signup-container">
      <div className="wrapper">
        <h1>Sign Up</h1>
        
        {errors.length > 0 && (
          <p className="error-message">{errors.join(". ")}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className={errors.some(e => e.includes("Username")) ? "incorrect" : ""}>
            <label><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/></svg></label>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
          </div>

          <div className={errors.some(e => e.includes("email")) ? "incorrect" : ""}>
            <label><span>@</span></label>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
          </div>

          <div className={errors.some(e => e.includes("Password")) ? "incorrect" : ""}>
            <label><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/></svg></label>
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
          </div>

          <div className={errors.some(e => e.includes("match")) ? "incorrect" : ""}>
            <label><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z"/></svg></label>
            <input type="password" name="repeatPassword" placeholder="Repeat Password" onChange={handleChange} />
          </div>

          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link href="/login">Login</Link></p>
        <Link href="/">Go Back?</Link>
      </div>
    </div>
  );
}