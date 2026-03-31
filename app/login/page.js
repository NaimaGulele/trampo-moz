import Navbar from "../components/Navbar";

export default function Login() {
  return (
    <div>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Log In</h1>

        <input placeholder="Email" style={inputStyle} />
        <input placeholder="Password" type="password" style={inputStyle} />

        <button style={btnStyle}>Log In</button>
      </div>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  marginBottom: "10px",
  padding: "10px"
};

const btnStyle = {
  padding: "10px",
  background: "#10b981",
  color: "white",
  border: "none"
};
