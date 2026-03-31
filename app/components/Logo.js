export default function Logo() {
  return (
    <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
      <div style={{
        width:"40px",
        height:"40px",
        background:"#0070f3",
        borderRadius:"8px",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        color:"white",
        fontWeight:"bold"
      }}>
        TM
      </div>

      <h2 style={{margin:0,color:"#0070f3"}}>TrampoMoz</h2>
    </div>
  )
}
