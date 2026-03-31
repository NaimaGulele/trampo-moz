import InteractiveLink from "./InteractiveLink";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#222222",
        color: "#fff",
        padding: "40px 20px",
        marginTop: "80px",
        borderTop: "1px solid #333"
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "40px",
          marginBottom: "40px"
        }}
      >
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "15px" }}>
            Sobre
          </h3>
          <p style={{ color: "#ccc", fontSize: "14px", lineHeight: "1.6", margin: "0" }}>
            TrampoMoz conecta profissionais com empresas em Moçambique, oferecendo oportunidades de crescimento profissional em Maputo, Matola e todo o país.
          </p>
        </div>

        <div>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "15px" }}>
            Links Rápidos
          </h3>
          <ul style={{ listStyle: "none", padding: "0", margin: "0" }}>
            <li style={{ marginBottom: "10px" }}>
              <InteractiveLink href="/jobs" style={{ color: "#0070f3", textDecoration: "none" }}>
                Ver Empregos
              </InteractiveLink>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <InteractiveLink href="/post" style={{ color: "#0070f3", textDecoration: "none" }}>
                Publicar Vaga
              </InteractiveLink>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <InteractiveLink href="/signin" style={{ color: "#0070f3", textDecoration: "none" }}>
                Criar Conta
              </InteractiveLink>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <InteractiveLink href="/login" style={{ color: "#0070f3", textDecoration: "none" }}>
                Entrar
              </InteractiveLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "15px" }}>
            Contato
          </h3>
          <p style={{ color: "#ccc", fontSize: "14px", margin: "0" }}>
            📧 contato@trampomoz.com
          </p>
          <p style={{ color: "#ccc", fontSize: "14px", margin: "10px 0 0 0" }}>
            📱 +258 84 123 456
          </p>
          <p style={{ color: "#ccc", fontSize: "14px", margin: "10px 0 0 0" }}>
            📍 Maputo, Moçambique
          </p>
        </div>
      </div>

      <div
        style={{
          borderTop: "1px solid #333",
          paddingTop: "20px",
          textAlign: "center",
          color: "#999",
          fontSize: "14px"
        }}
      >
        <p style={{ margin: "0" }}>
          © 2024 TrampoMoz. Todos os direitos reservados.
        </p>
        <p style={{ margin: "8px 0 0 0", fontSize: "12px" }}>
          Plataforma de empregos para Moçambique - Conectando profissionais e empresas
        </p>
      </div>
    </footer>
  );
}
