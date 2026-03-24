import Navbar from "../components/Navbar";

export default function PostJob() {
  return (
    <div style={{ fontFamily: "Arial" }}>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Post a Job</h1>

        <input placeholder="Job Title" style={inputStyle} />
        <input placeholder="Location" style={inputStyle} />
        <input placeholder="Salary (MZN)" style={inputStyle} />
        <textarea placeholder="Description" style={inputStyle}></textarea>

        <button style={{
          marginTop: "15px",
          padding: "12px",
          background: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "6px"
        }}>
          POST
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc"
};