import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hawaii Surf Blog',
  description: 'Your guide to Hawaiian surf culture, conditions, and spots. Features authentic surf reports, gear reviews, and spot guides from local Hawaiian surfers.',
  keywords: 'Hawaii surf, surfing, surf reports, Pipeline, Waikiki, North Shore, surf spots, wave conditions',
  authors: [{ name: 'Hawaii Surf Blog' }],
  openGraph: {
    title: 'Hawaii Surf Blog',
    description: 'Your guide to Hawaiian surf culture, conditions, and spots',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hawaii Surf Blog',
    description: 'Your guide to Hawaiian surf culture, conditions, and spots',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}