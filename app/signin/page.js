import Navbar from "../components/Navbar";

export default function SignIn() {
  return (
    <div>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Sign In</h1>

        <input placeholder="Email" style={inputStyle} />
        <input placeholder="Password" type="password" style={inputStyle} />

        <button style={btnStyle}>Sign In</button>
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
  background: "#0070f3",
  color: "white",
  border: "none"
};
