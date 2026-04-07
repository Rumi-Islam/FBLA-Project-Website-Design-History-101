// src/app/page.js
export default function Home() {
  return (
    <div className="body" id="mainbody">
      <h1 style={{ fontSize: "60px", textAlign: "center", color: "white" }}>APeerNotes</h1>
      <h3 style={{ textAlign: "center", color: "white" }}>Student run, student managed...</h3>
      <p style={{ textAlign: "center", color: "white" }}>Lets have some fun!</p>
      
      <div style={{ marginBottom: "20px" }}>
      </div>

      {/* This is the white container fix */}
      <div className="calendar-container" style={{ 
        backgroundColor: "white", 
        padding: "20px", 
        borderRadius: "12px", 
        width: "95%", 
        maxWidth: "1000px", 
        margin: "0 auto",
        minHeight: "750px" // Ensures the white box stays open while the calendar loads
      }}>
        <iframe 
          src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ33KMlyUNz8YT_fF0GstBM28y3BMZrNmd_F7OPrpRbjSCEhM0FeZDf6ei3dq3mZZ3BWRiTFdOCk?gv=true" 
          style={{ border: 0 }} 
          width="100%" 
          height="700" 
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
}