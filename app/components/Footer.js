import InteractiveLink from "./InteractiveLink";
import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider";

export default function Footer() {
  const { t } = useContext(LanguageContext);

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div>
          <h3>{t('footer.about_title')}</h3>
          <p>{t('footer.about')}</p>
        </div>

        <div>
          <h3>{t('footer.links_title')}</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "10px" }}>
              <InteractiveLink href="/jobs">{t('footer.ver_empregos')}</InteractiveLink>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <InteractiveLink href="/post">{t('footer.publicar_vaga')}</InteractiveLink>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <InteractiveLink href="/signup">{t('footer.criar_conta')}</InteractiveLink>
            </li>
            <li style={{ marginBottom: "10px" }}>
              <InteractiveLink href="/login">{t('footer.entrar')}</InteractiveLink>
            </li>
          </ul>
        </div>

        <div>
          <h3>{t('footer.contact_title')}</h3>
          <p>📧 {t('footer.contact_email')}</p>
          <p style={{ marginTop: "8px" }}>📱 +258 84 123 456</p>
          <p style={{ marginTop: "8px" }}>📍 Maputo, Moçambique</p>
        </div>
      </div>

      <div className="bottom">
        <p style={{ margin: 0 }}>{t('footer.copy')}</p>
        <p style={{ margin: "8px 0 0 0", fontSize: "12px" }}>{t('footer.about')}</p>
      </div>
    </footer>
  );
}
