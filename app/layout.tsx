'use client'
import './globals.css'
import { QueryClientProvider } from 'react-query'
import { queryClient } from '../components/querryClient'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang='en'>
        <body>{children}</body>
      </html>
    </QueryClientProvider>
  )
}
