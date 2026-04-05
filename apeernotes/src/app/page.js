// src/app/page.js
export default function Home()
{
  return (
    <div className="body" id="mainbody">
      <h1 style={{ fontSize: "60px", textAlign: "center", color: "white" }}>APeerNotes</h1>
      <h3 style={{ textAlign: "center", color: "white" }}>Student run, student managed...</h3>
      <p style={{ textAlign: "center", color: "white" }}>Lets have some fun!</p>
      
      <div style={{ textAlign: "center", color: "white" }}>
        <a href="/signup" className="btn">Get Started</a>
      </div>

      <div className="calendar-container">
        <iframe 
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FPhoenix&showPrint=0&title=APeerNotes%20Online%20Lecture%20Sessions&src=MzI2NDRkNzQwZjBmMzFiZTEwNjk4M2M3YTdiMDk1NDdkYWQyYTUzNWU4ZWNiZWFlMTJlNWJiOWQyMGEwMjkxOUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23e67c73&color=%230b8043" 
          id="calendar"
          style={{ border: 0 }}
        ></iframe>
      </div>
    </div>
  );
}