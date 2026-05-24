// Language configuration
const translations = {
  pt: {
    // Navigation
    enter: "Entrar",
    signup: "Criar conta",
    language: "Idioma",
    
    // Home page
    welcomeTitle: "Bem-vindo ao Trampo Moz",
    welcomeDesc: "Encontre vagas em Moçambique, publique oportunidades e gerencie o seu perfil profissional em um só lugar.",
    goToDashboard: "Ir para o painel",
    searchOpportunities: "Procurar oportunidades",
    searchDesc: "Veja vagas disponíveis, encontre a posição certa e candidate-se de forma rápida e segura.",
    publishJob: "Publicar vaga",
    publishDesc: "Se você é recrutador, publique a sua vaga e alcance candidatos qualificados imediatamente.",
    completeProfile: "Perfil completo",
    profileDesc: "Mantenha seu perfil atualizado e agilize o processo de candidatura para as vagas.",
    
    // Auth pages
    loginTitle: "Entrar",
    signupTitle: "Criar conta",
    email: "Email",
    password: "Senha",
    fullName: "Nome completo",
    loginButton: "Entrar",
    signupButton: "Criar conta",
    noAccount: "Não tens conta?",
    hasAccount: "Já tens conta?",
    fillFields: "Preencha email e senha para entrar.",
    fillAllFields: "Preencha nome, email e senha para criar conta.",
    userNotFound: "Usuário inexistente. Crie uma conta para continuar.",
    wrongPassword: "Senha incorreta. Verifique seus dados.",
    emailExists: "Este email já existe. Faça login com sua conta.",
    
    // Profile page
    myProfile: "Meu Perfil",
    updateProfile: "Atualize seus dados profissionais e envie seu CV para recrutadores.",
    professionalProfile: "Perfil profissional",
    contact: "Contacto",
    address: "Morada",
    jobTitle: "Cargo/Profissão",
    summary: "Resumo Profissional",
    experience: "Experiência",
    cvUpload: "Upload de CV",
    saveProfile: "Salvar Perfil",
    profileSaved: "Perfil salvo com sucesso",
    hello: "Olá",
    
    // Footer
    platformDesc: "Trampo Moz - Encontre emprego em Moçambique",
    email: "Email",
    contact: "Contacto",
    logout: "Sair",
  },
  ch: {
    // Navigation
    enter: "Ingena",
    signup: "Lumula akawunti",
    language: "Chiputso",
    
    // Home page
    welcomeTitle: "Wani ku Trampo Moz",
    welcomeDesc: "Ndevula mizimu ya umuntfu ya Mozambique, cumbuluxa njinga na makunakune a wena ya umuntu a murima.",
    goToDashboard: "Iká ku lebaku la mizimu",
    searchOpportunities: "Sakela njinga",
    searchDesc: "Lava mizimu ya umuntu yá yonke, ndevula mzimu a wena na kumela mbila ku nyonjiwa.",
    publishJob: "Cumbuluxa mizimu",
    publishDesc: "Ku na ku sa ndlela ya kulanda abantu, cumbuluxa mizimu ya wena na kulumula abantu ba sakela.",
    completeProfile: "Lebaku la umuntu",
    profileDesc: "Lulama lebaku la wena la mizimu na kuyeleleka njinga ya kumelemela.",
    
    // Auth pages
    loginTitle: "Ingena",
    signupTitle: "Lumula akawunti",
    email: "Email",
    password: "Shifiro",
    fullName: "Linina la wena la kuphela",
    loginButton: "Ingena",
    signupButton: "Lumula akawunti",
    noAccount: "A wuna akawunti?",
    hasAccount: "Wuna akawunti?",
    fillFields: "Cumbuluxa email na shifiro ku ingena.",
    fillAllFields: "Cumbuluxa linina, email na shifiro ku lumula akawunti.",
    userNotFound: "Akawunti a sa yonwi. Lumula akawunti ya wena.",
    wrongPassword: "Shifiro sa swi kahle. Languta data ya wena.",
    emailExists: "Email leyi yi kumile. Ingena ku akawunti ya wena.",
    
    // Profile page
    myProfile: "Lebaku langa",
    updateProfile: "Kumela milangu ya wena ya mizimu na kunyumula CV ya wena ku abantu ba sakela.",
    professionalProfile: "Lebaku la umuntu la mizimu",
    contact: "Numboro ya kutsakela",
    address: "Indhlu",
    jobTitle: "Mizimu/Kwa nkentiselo",
    summary: "Nyimpilo ya Mizimu",
    experience: "Mpfuneko ya mizimu",
    cvUpload: "Kumela CV",
    saveProfile: "Lumula Lebaku",
    profileSaved: "Lebaku li savanile nkoka",
    hello: "Wani",
    
    // Footer
    platformDesc: "Trampo Moz - Ndevula mizimu ya Mozambique",
    email: "Email",
    contact: "Numboro ya kutsakela",
    logout: "Tsoka",
  },
  en: {
    // Navigation
    enter: "Login",
    signup: "Sign up",
    language: "Language",
    
    // Home page
    welcomeTitle: "Welcome to Trampo Moz",
    welcomeDesc: "Find jobs in Mozambique, publish opportunities and manage your professional profile in one place.",
    goToDashboard: "Go to dashboard",
    searchOpportunities: "Search opportunities",
    searchDesc: "View available positions, find the right job and apply quickly and securely.",
    publishJob: "Publish job",
    publishDesc: "If you are a recruiter, publish your job and reach qualified candidates immediately.",
    completeProfile: "Complete profile",
    profileDesc: "Keep your profile updated and streamline the application process for jobs.",
    
    // Auth pages
    loginTitle: "Login",
    signupTitle: "Sign up",
    email: "Email",
    password: "Password",
    fullName: "Full name",
    loginButton: "Login",
    signupButton: "Sign up",
    noAccount: "Don&apos;t have an account?",
    hasAccount: "Already have an account?",
    fillFields: "Please fill in email and password to login.",
    fillAllFields: "Please fill in name, email and password to create an account.",
    userNotFound: "User not found. Create an account to continue.",
    wrongPassword: "Wrong password. Check your details.",
    emailExists: "This email already exists. Login with your account.",
    
    // Profile page
    myProfile: "My Profile",
    updateProfile: "Update your professional information and submit your CV to recruiters.",
    professionalProfile: "Professional profile",
    contact: "Contact",
    address: "Address",
    jobTitle: "Job Title",
    summary: "Professional Summary",
    experience: "Experience",
    cvUpload: "Upload CV",
    saveProfile: "Save Profile",
    profileSaved: "Profile saved successfully",
    hello: "Hello",
    
    // Footer
    platformDesc: "Trampo Moz - Find jobs in Mozambique",
    email: "Email",
    contact: "Contact",
    logout: "Logout",
  },
};

export function getLanguage() {
  if (typeof window === "undefined") return "pt";
  const stored = localStorage.getItem("language");
  if (stored && translations[stored]) return stored;
  return "pt";
}

export function setLanguage(lang) {
  if (translations[lang]) {
    localStorage.setItem("language", lang);
    return true;
  }
  return false;
}

export function t(key, lang = null) {
  const currentLang = lang || getLanguage();
  return translations[currentLang]?.[key] || translations.pt[key] || key;
}

export const languages = {
  pt: { name: "Português", flag: "🇵🇹" },
  ch: { name: "Changana", flag: "🇲🇿" },
  en: { name: "English", flag: "🇬🇧" },
};
