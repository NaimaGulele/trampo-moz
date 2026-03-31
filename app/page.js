import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Link from "next/link"

export default function Home(){
  return(
    <div style={{fontFamily:"Arial",background:"#f5f7fb",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <Navbar/>

      <div style={{
        maxWidth:"1000px",
        margin:"0 auto",
        padding:"80px 20px",
        textAlign:"center",
        flex:"1"
      }}>
        <h1 style={{
          fontSize:"48px",
          color:"#222",
          marginBottom:"15px",
          lineHeight:"1.2"
        }}>
          Find Your Dream Job in Mozambique 🇲🇿
        </h1>

        <p style={{
          fontSize:"18px",
          color:"#666",
          marginBottom:"50px",
          lineHeight:"1.6"
        }}>
          Discover amazing career opportunities with leading companies across Mozambique. Whether you&apos;re starting your journey or advancing your career, TrampoMoz is your platform.
        </p>

        <div style={{
          display:"flex",
          gap:"20px",
          justifyContent:"center",
          flexWrap:"wrap",
          marginBottom:"80px"
        }}>
          <Link href="/jobs" style={{
            background:"#0070f3",
            color:"white",
            padding:"16px 40px",
            borderRadius:"6px",
            textDecoration:"none",
            fontWeight:"bold",
            fontSize:"16px",
            transition:"all 0.3s ease"
          }}
          onMouseEnter={(e) => e.target.style.background="#0051cc"}
          onMouseLeave={(e) => e.target.style.background="#0070f3"}
          >
            Browse Jobs
          </Link>

          <Link href="/post" style={{
            background:"#10b981",
            color:"white",
            padding:"16px 40px",
            borderRadius:"6px",
            textDecoration:"none",
            fontWeight:"bold",
            fontSize:"16px",
            transition:"all 0.3s ease"
          }}
          onMouseEnter={(e) => e.target.style.background="#059669"}
          onMouseLeave={(e) => e.target.style.background="#10b981"}
          >
            Post a Job
          </Link>
        </div>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))",
          gap:"30px",
          marginTop:"60px"
        }}>
          <div style={{
            background:"white",
            padding:"30px",
            borderRadius:"8px",
            boxShadow:"0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              fontSize:"36px",
              marginBottom:"10px"
            }}>🔍</div>
            <h3 style={{
              fontSize:"18px",
              color:"#222",
              marginBottom:"10px"
            }}>
              Easy to Search
            </h3>
            <p style={{
              color:"#666",
              fontSize:"14px",
              lineHeight:"1.6"
            }}>
              Find jobs by title, location, or company with our powerful search and filter options.
            </p>
          </div>

          <div style={{
            background:"white",
            padding:"30px",
            borderRadius:"8px",
            boxShadow:"0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              fontSize:"36px",
              marginBottom:"10px"
            }}>📱</div>
            <h3 style={{
              fontSize:"18px",
              color:"#222",
              marginBottom:"10px"
            }}>
              Post Instantly
            </h3>
            <p style={{
              color:"#666",
              fontSize:"14px",
              lineHeight:"1.6"
            }}>
              Share your job opening in minutes and connect with qualified candidates in your area.
            </p>
          </div>

          <div style={{
            background:"white",
            padding:"30px",
            borderRadius:"8px",
            boxShadow:"0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              fontSize:"36px",
              marginBottom:"10px"
            }}>🤝</div>
            <h3 style={{
              fontSize:"18px",
              color:"#222",
              marginBottom:"10px"
            }}>
              Connect Directly
            </h3>
            <p style={{
              color:"#666",
              fontSize:"14px",
              lineHeight:"1.6"
            }}>
              Build meaningful relationships with employers and candidates in Mozambique.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
