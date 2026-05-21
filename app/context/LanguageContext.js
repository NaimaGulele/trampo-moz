'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    nav: {
      login: 'Login',
      signup: 'Sign up',
    },
    home: {
      welcome: 'Welcome to Trampo Moz',
      subtitle: 'Find jobs in Mozambique, publish opportunities and manage your professional profile in one place.',
      goToDashboard: 'Go to Dashboard',
      enterLogin: 'Enter',
      createAccount: 'Create Account',
      searchJobs: 'Search Opportunities',
      searchJobsDesc: 'See available jobs, find the right position and apply quickly and safely.',
      postJob: 'Post a Job',
      postJobDesc: 'If you are a recruiter, post your job and reach qualified candidates immediately.',
      completeProfile: 'Complete Profile',
      completeProfileDesc: 'Keep your profile updated and streamline the application process for available jobs.',
    },
    login: {
      title: 'Login',
      email: 'Email',
      password: 'Password',
      submit: 'Enter',
      noAccount: 'Don\'t have an account?',
      createOne: 'Create Account',
      errorEmpty: 'Fill in email and password to enter.',
      errorNotExists: 'Non-existent user. Create an account to continue.',
      errorPassword: 'Incorrect password. Check your data.',
    },
    signup: {
      title: 'Create Account',
      fullName: 'Full Name',
      email: 'Email',
      password: 'Password',
      emailHint: 'Use your real email, it will be used in applications and to recover your access.',
      submit: 'Create Account',
      haveAccount: 'Already have an account?',
      login: 'Login',
      errorEmpty: 'Fill in name, email and password to create account.',
      errorExists: 'This email already exists. Login with your account.',
    },
    footer: {
      company: 'Trampo Moz - Find employment in Mozambique',
      email: 'Email: suporte@trampomoz.co.mz',
      contact: 'Contact: +258 84 000 0000',
    },
    language: 'Language',
  },
  pt: {
    nav: {
      login: 'Entrar',
      signup: 'Criar conta',
    },
    home: {
      welcome: 'Bem-vindo ao Trampo Moz',
      subtitle: 'Encontre vagas em Moçambique, publique oportunidades e gerencie o seu perfil profissional em um só lugar.',
      goToDashboard: 'Ir para o painel',
      enterLogin: 'Entrar',
      createAccount: 'Criar conta',
      searchJobs: 'Procurar oportunidades',
      searchJobsDesc: 'Veja vagas disponíveis, encontre a posição certa e candidate-se de forma rápida e segura.',
      postJob: 'Publicar vaga',
      postJobDesc: 'Se você é recrutador, publique a sua vaga e alcance candidatos qualificados imediatamente.',
      completeProfile: 'Perfil completo',
      completeProfileDesc: 'Mantenha seu perfil atualizado e agilize o processo de candidatura para as vagas.',
    },
    login: {
      title: 'Entrar',
      email: 'Email',
      password: 'Senha',
      submit: 'Entrar',
      noAccount: 'Não tens conta?',
      createOne: 'Criar conta',
      errorEmpty: 'Preencha email e senha para entrar.',
      errorNotExists: 'Usuário inexistente. Crie uma conta para continuar.',
      errorPassword: 'Senha incorreta. Verifique seus dados.',
    },
    signup: {
      title: 'Criar conta',
      fullName: 'Nome completo',
      email: 'Email',
      password: 'Senha',
      emailHint: 'Use seu email real, ele será usado nas candidaturas e para recuperar seu acesso.',
      submit: 'Criar conta',
      haveAccount: 'Já tens conta?',
      login: 'Entrar',
      errorEmpty: 'Preencha nome, email e senha para criar conta.',
      errorExists: 'Este email já existe. Faça login com sua conta.',
    },
    footer: {
      company: 'Trampo Moz - Encontre emprego em Moçambique',
      email: 'Email: suporte@trampomoz.co.mz',
      contact: 'Contacto: +258 84 000 0000',
    },
    language: 'Idioma',
  },
  sn: {
    nav: {
      login: 'Punyuka',
      signup: 'Mbuyi akhaunu',
    },
    home: {
      welcome: 'Mwaleni ku Trampo Moz',
      subtitle: 'Humani misita ka vuthavi hi Mozambique, humani nomsuka ka mirindzo ya vuthavi na kuhlawula vungungulu lava na va hava tshama ka hara kambe ku leha.',
      goToDashboard: 'Endla ku dashboard',
      enterLogin: 'Punyuka',
      createAccount: 'Mbuyi akhaunu',
      searchJobs: 'Lava vuthavi',
      searchJobsDesc: 'Humani misita ya vuthavi leyi endliwe, humani vuthavi lava va humile na kuitika ka ntlango lowu makhururi hi moya.',
      postJob: 'Susa vuthavi',
      postJobDesc: 'Ku na vuthavi, susa vuthavi lava va va na khone na humela vantlhoniphi lava va na khona kumakhurya.',
      completeProfile: 'Profile ya kumpliti',
      completeProfileDesc: 'Humela profile ya vena na va ya hlava hi kulandzulula va va na ndlela ya ku itisa vuthavi lava vi na khona.',
    },
    login: {
      title: 'Punyuka',
      email: 'Ekmele',
      password: 'Mphotoloji',
      submit: 'Punyuka',
      noAccount: 'A na profile ya vena?',
      createOne: 'Mbuyi akhaunu',
      errorEmpty: 'Mbuya ekmele na mphotoloji ku punyuka.',
      errorNotExists: 'Vuntlhoniphi a va khona. Mbuyi akhaunu ku rindzela.',
      errorPassword: 'Mphotoloji a ri rikile. Khumela data ya vena.',
    },
    signup: {
      title: 'Mbuyi akhaunu',
      fullName: 'Vito ra kumpliti',
      email: 'Ekmele',
      password: 'Mphotoloji',
      emailHint: 'Shumisa ekmele ra vena ra vusiwana, yi shumiswile hi ku itisa vuthavi na ku hlangana na access ya vena.',
      submit: 'Mbuyi akhaunu',
      haveAccount: 'Na na profile?',
      login: 'Punyuka',
      errorEmpty: 'Mbuya vito, ekmele na mphotoloji ku mbuyi akhaunu.',
      errorExists: 'Email i ku leha. Punyuka hi profile ya vena.',
    },
    footer: {
      company: 'Trampo Moz - Humani vuthavi hi Mozambique',
      email: 'Ekmele: suporte@trampomoz.co.mz',
      contact: 'Xitlholelo: +258 84 000 0000',
    },
    language: 'Rikwali',
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('pt');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') || 'pt';
    setLanguage(savedLanguage);
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  if (!mounted) {
    return children;
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return default translations if context is not available
    return { 
      language: 'pt', 
      changeLanguage: () => {}, 
      t: translations.pt 
    };
  }
  return context;
}
