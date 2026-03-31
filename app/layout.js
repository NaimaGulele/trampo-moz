import './globals.css'
import { AuthProvider } from '@/lib/auth-context'

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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-MZ">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="theme-color" content="#0070f3" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="TrampoMoz" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body style={{margin: 0, padding: 0, fontFamily: "Arial, sans-serif", backgroundColor: "#f5f7fb"}}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
