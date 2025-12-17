import React from 'react';

const LanguageSwitch = ({ currentLang, onLangChange }) => {
  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
    { code: 'es', label: 'Español', flag: '🇪🇸' }
  ];

  return (
    <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
      {languages.map((lang) => (
        <button 
          key={lang.code}
          onClick={() => onLangChange(lang.code)}
          style={{
            backgroundColor: currentLang === lang.code ? '#FFD1DC' : '#A7DBF5',
            border: currentLang === lang.code ? '2px solid #E6E6FA' : 'none',
            padding: '12px 20px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: '0.3s ease'
          }}
        >
          {lang.flag} {lang.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitch;