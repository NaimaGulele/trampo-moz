import Navbar from "./components/Navbar"
import Link from "next/link"

export default function Home(){

return(

<div style={{fontFamily:"Arial",background:"#f5f7fb",minHeight:"100vh"}}>

<Navbar/>

<div style={{
textAlign:"center",
padding:"80px 20px"
}}>

<h1 style={{
fontSize:"48px",
color:"#222"
}}>
Find Jobs in Mozambique 🇲🇿
</h1>

<p style={{
fontSize:"18px",
color:"#555",
marginTop:"10px"
}}>
Connecting Mozambicans to local opportunities
</p>

<div style={{marginTop:"40px"}}>

<Link href="/jobs" style={{
background:"#0070f3",
color:"white",
padding:"14px 28px",
borderRadius:"8px",
textDecoration:"none",
marginRight:"15px",
fontWeight:"bold"
}}>
Browse Jobs
</Link>

<Link href="/post" style={{
background:"#10b981",
color:"white",
padding:"14px 28px",
borderRadius:"8px",
textDecoration:"none",
fontWeight:"bold"
}}>
Post a Job
</Link>

</div>

</div>

</div>

)

}