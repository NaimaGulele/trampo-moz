import './globals.css'

export const metadata = {
  title: 'TrampoMoz - Find Jobs in Mozambique',
  description: 'TrampoMoz is the leading job platform in Mozambique. Find and post jobs in Maputo, Matola, Beira, and across the country.',
  keywords: 'jobs, Mozambique, careers, employment, TrampoMoz',
  openGraph: {
    title: 'TrampoMoz - Find Jobs in Mozambique',
    description: 'Discover job opportunities across Mozambique',
    url: 'https://trampomoz.com',
    siteName: 'TrampoMoz',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0f766e',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-MZ">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
