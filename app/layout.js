import './globals.css'
import LanguageProvider from './components/LanguageProvider'
import VisitorTracker from './components/VisitorTracker'

export const metadata = {
  title: 'TrampoMoz - Plataforma de Empregos em Moçambique',
  description: 'Encontre e publique oportunidades de trabalho em Moçambique. Plataforma de empregos conectando profissionais e empresas em Maputo, Matola e todo o país.',
  keywords: 'empregos moçambique, vagas de trabalho, job board, emprego maputo, trabalho moçambique, mzn',
  authors: [{ name: 'TrampoMoz' }],
  robots: 'index, follow',
  openGraph: {
    title: 'TrampoMoz - Plataforma de Empregos',
    description: 'Encontre seu emprego em Moçambique',
    type: 'website',
    locale: 'pt_MZ',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-MZ">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#0b6efd" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="TrampoMoz" />
        <link rel="icon" href="/logo.svg" />
        <link rel="apple-touch-icon" href="/logo.svg" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="app-shell">
        <LanguageProvider>
          <VisitorTracker />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
