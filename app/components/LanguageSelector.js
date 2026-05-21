'use client';

import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';

export default function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'pt', label: 'Português', flag: '🇵🇹' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'sn', label: 'Xitsonga', flag: '🇲🇿' },
  ];

  const currentLang = languages.find(l => l.code === language);

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 14px',
          borderRadius: '6px',
          border: '1px solid var(--border)',
          background: 'white',
          cursor: 'pointer',
          fontSize: '0.95rem',
          fontWeight: '500',
          color: 'var(--text-secondary)',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = 'var(--background-alt)';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = 'white';
        }}
        aria-label="Change language"
      >
        <span style={{ fontSize: '1.2rem' }}>{currentLang?.flag}</span>
        <span style={{ display: 'none' }} className="sm-inline">{currentLang?.label}</span>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          right: 0,
          marginTop: '8px',
          width: '160px',
          background: 'white',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 50,
          overflow: 'hidden'
        }}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                changeLanguage(lang.code);
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px 16px',
                background: language === lang.code ? 'var(--primary)' : 'white',
                color: language === lang.code ? 'white' : 'var(--foreground)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.95rem',
                fontWeight: '500',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (language !== lang.code) {
                  e.target.style.backgroundColor = 'var(--background-alt)';
                }
              }}
              onMouseLeave={(e) => {
                if (language !== lang.code) {
                  e.target.style.backgroundColor = 'white';
                }
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
