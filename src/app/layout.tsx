import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'IT Solutions Finder',
  description: 'Find solutions to technical problems quickly',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
