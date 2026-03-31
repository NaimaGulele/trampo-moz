"use client";

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import InteractiveLink from "./components/InteractiveLink"

export default function Home(){
  return(
    <div style={{fontFamily:"Arial",background:"#f5f7fb",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <Navbar/>

      <div style={{
        maxWidth:"1000px",
        margin:"0 auto",
        padding:"40px 20px",
        textAlign:"center",
        flex:"1"
      }}>
        <h1 style={{
          fontSize:"clamp(28px, 8vw, 48px)",
          color:"#222",
          marginBottom:"15px",
          lineHeight:"1.2"
        }}>
          Encontre o Seu Emprego dos Sonhos em Moçambique 🇲🇿
        </h1>

        <p style={{
          fontSize:"clamp(16px, 4vw, 18px)",
          color:"#666",
          marginBottom:"40px",
          lineHeight:"1.6",
          maxWidth:"600px",
          margin:"0 auto 40px"
        }}>
          Descubra oportunidades de carreira incríveis com empresas líderes em Maputo, Matola e em todo Moçambique. Quer esteja iniciando sua trajetória ou avançando sua carreira, TrampoMoz é sua plataforma.
        </p>

        <div style={{
          display:"flex",
          gap:"16px",
          justifyContent:"center",
          flexWrap:"wrap",
          marginBottom:"60px"
        }}>
          <InteractiveLink 
            href="/jobs" 
            normalBgColor="#0070f3"
            hoverBgColor="#0051cc"
            style={{
              color:"white",
              padding:"14px 32px",
              borderRadius:"6px",
              textDecoration:"none",
              fontWeight:"bold",
              fontSize:"clamp(14px, 3vw, 16px)",
              transition:"all 0.3s ease",
              minWidth:"140px",
              textAlign:"center",
              touchAction:"manipulation",
              background:"#0070f3"
            }}
          >
            Ver Empregos
          </InteractiveLink>

          <InteractiveLink 
            href="/post" 
            normalBgColor="#10b981"
            hoverBgColor="#059669"
            style={{
              color:"white",
              padding:"14px 32px",
              borderRadius:"6px",
              textDecoration:"none",
              fontWeight:"bold",
              fontSize:"clamp(14px, 3vw, 16px)",
              transition:"all 0.3s ease",
              minWidth:"140px",
              textAlign:"center",
              touchAction:"manipulation",
              background:"#10b981"
            }}
          >
            Postar Vaga
          </InteractiveLink>
        </div>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",
          gap:"20px",
          marginTop:"40px"
        }}>
          <div style={{
            background:"white",
            padding:"24px 16px",
            borderRadius:"8px",
            boxShadow:"0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              fontSize:"32px",
              marginBottom:"12px",
              role:"img",
              ariaLabel:"Busca"
            }}>🔍</div>
            <h3 style={{
              fontSize:"16px",
              color:"#222",
              marginBottom:"10px"
            }}>
              Busca Fácil
            </h3>
            <p style={{
              color:"#666",
              fontSize:"13px",
              lineHeight:"1.5",
              margin:"0"
            }}>
              Encontre vagas por título, localidade ou empresa em Moçambique.
            </p>
          </div>

          <div style={{
            background:"white",
            padding:"24px 16px",
            borderRadius:"8px",
            boxShadow:"0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              fontSize:"32px",
              marginBottom:"12px",
              role:"img",
              ariaLabel:"Publicação rápida"
            }}>📱</div>
            <h3 style={{
              fontSize:"16px",
              color:"#222",
              marginBottom:"10px"
            }}>
              Publica Rápido
            </h3>
            <p style={{
              color:"#666",
              fontSize:"13px",
              lineHeight:"1.5",
              margin:"0"
            }}>
              Compartilhe sua vaga em minutos e conecte com candidatos qualificados.
            </p>
          </div>

          <div style={{
            background:"white",
            padding:"24px 16px",
            borderRadius:"8px",
            boxShadow:"0 1px 3px rgba(0,0,0,0.1)"
          }}>
            <div style={{
              fontSize:"32px",
              marginBottom:"12px",
              role:"img",
              ariaLabel:"Conexões diretas"
            }}>🤝</div>
            <h3 style={{
              fontSize:"16px",
              color:"#222",
              marginBottom:"10px"
            }}>
              Conecte Direto
            </h3>
            <p style={{
              color:"#666",
              fontSize:"13px",
              lineHeight:"1.5",
              margin:"0"
            }}>
              Construa relacionamentos com empregadores e candidatos moçambicanos.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
