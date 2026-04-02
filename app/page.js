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
        padding:"clamp(24px, 8vw, 40px) clamp(16px, 5vw, 20px)",
        textAlign:"center",
        flex:"1"
      }}>
        <h1 style={{
          fontSize:"clamp(24px, 7vw, 48px)",
          color:"#222",
          marginBottom:"clamp(12px, 3vw, 20px)",
          lineHeight:"1.3",
          wordBreak:"break-word"
        }}>
          Encontre o Seu Emprego dos Sonhos em Moçambique 🇲🇿
        </h1>

        <p style={{
          fontSize:"clamp(14px, 4vw, 18px)",
          color:"#666",
          marginBottom:"clamp(24px, 6vw, 40px)",
          lineHeight:"1.7",
          maxWidth:"600px",
          margin:"0 auto clamp(24px, 6vw, 40px)",
          wordBreak:"break-word"
        }}>
          Descubra oportunidades de carreira incríveis com empresas líderes em Maputo, Matola e em todo Moçambique. Quer esteja iniciando sua trajetória ou avançando sua carreira, TrampoMoz é sua plataforma.
        </p>

        <div style={{
          display:"flex",
          gap:"clamp(12px, 3vw, 16px)",
          justifyContent:"center",
          flexWrap:"wrap",
          marginBottom:"clamp(40px, 8vw, 60px)",
          rowGap:"clamp(12px, 3vw, 16px)"
        }}>
          <InteractiveLink 
            href="/jobs" 
            style={{
              color:"white",
              padding:"clamp(12px, 3vw, 14px) clamp(24px, 5vw, 32px)",
              borderRadius:"6px",
              textDecoration:"none",
              fontWeight:"bold",
              fontSize:"clamp(13px, 3vw, 16px)",
              transition:"all 0.2s ease",
              minWidth:"clamp(120px, 25vw, 160px)",
              minHeight:"44px",
              textAlign:"center",
              touchAction:"manipulation",
              background:"#0070f3",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              cursor:"pointer"
            }}
          >
            Ver Empregos
          </InteractiveLink>

          <InteractiveLink 
            href="/post" 
            style={{
              color:"white",
              padding:"clamp(12px, 3vw, 14px) clamp(24px, 5vw, 32px)",
              borderRadius:"6px",
              textDecoration:"none",
              fontWeight:"bold",
              fontSize:"clamp(13px, 3vw, 16px)",
              transition:"all 0.2s ease",
              minWidth:"clamp(120px, 25vw, 160px)",
              minHeight:"44px",
              textAlign:"center",
              touchAction:"manipulation",
              background:"#10b981",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              cursor:"pointer"
            }}
          >
            Postar Vaga
          </InteractiveLink>
        </div>

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fit, minmax(clamp(250px, 80vw, 320px), 1fr))",
          gap:"clamp(16px, 4vw, 24px)",
          marginTop:"clamp(24px, 8vw, 40px)"
        }}>
          <div style={{
            background:"white",
            padding:"clamp(20px, 5vw, 24px) clamp(14px, 4vw, 16px)",
            borderRadius:"8px",
            boxShadow:"0 1px 3px rgba(0,0,0,0.1)",
            transition:"all 0.3s ease",
            display:"flex",
            flexDirection:"column",
            gap:"12px"
          }}>
            <div style={{
              fontSize:"clamp(28px, 6vw, 36px)",
              lineHeight:"1.2"
            }} role="img" aria-label="Busca">🔍</div>
            <h3 style={{
              fontSize:"clamp(14px, 3vw, 18px)",
              color:"#222",
              margin:"0",
              fontWeight:"600"
            }}>
              Busca Fácil
            </h3>
            <p style={{
              color:"#666",
              fontSize:"clamp(12px, 2.5vw, 14px)",
              lineHeight:"1.6",
              margin:"0"
            }}>
              Encontre vagas por título, localidade ou empresa em Moçambique.
            </p>
          </div>

          <div style={{
            background:"white",
            padding:"clamp(20px, 5vw, 24px) clamp(14px, 4vw, 16px)",
            borderRadius:"8px",
            boxShadow:"0 1px 3px rgba(0,0,0,0.1)",
            transition:"all 0.3s ease",
            display:"flex",
            flexDirection:"column",
            gap:"12px"
          }}>
            <div style={{
              fontSize:"clamp(28px, 6vw, 36px)",
              lineHeight:"1.2"
            }} role="img" aria-label="Publicação rápida">📱</div>
            <h3 style={{
              fontSize:"clamp(14px, 3vw, 18px)",
              color:"#222",
              margin:"0",
              fontWeight:"600"
            }}>
              Publica Rápido
            </h3>
            <p style={{
              color:"#666",
              fontSize:"clamp(12px, 2.5vw, 14px)",
              lineHeight:"1.6",
              margin:"0"
            }}>
              Compartilhe sua vaga em minutos e conecte com candidatos qualificados.
            </p>
          </div>

          <div style={{
            background:"white",
            padding:"clamp(20px, 5vw, 24px) clamp(14px, 4vw, 16px)",
            borderRadius:"8px",
            boxShadow:"0 1px 3px rgba(0,0,0,0.1)",
            transition:"all 0.3s ease",
            display:"flex",
            flexDirection:"column",
            gap:"12px"
          }}>
            <div style={{
              fontSize:"clamp(28px, 6vw, 36px)",
              lineHeight:"1.2"
            }} role="img" aria-label="Conexões diretas">🤝</div>
            <h3 style={{
              fontSize:"clamp(14px, 3vw, 18px)",
              color:"#222",
              margin:"0",
              fontWeight:"600"
            }}>
              Conecte Direto
            </h3>
            <p style={{
              color:"#666",
              fontSize:"clamp(12px, 2.5vw, 14px)",
              lineHeight:"1.6",
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
