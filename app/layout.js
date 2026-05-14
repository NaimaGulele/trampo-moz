import './globals.css'

export const metadata = {
  title: 'TrampoMoz - Job Platform',
  description: 'Find and post jobs in Mozambique',
}

export const viewport = 'width=device-width, initial-scale=1.0'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
