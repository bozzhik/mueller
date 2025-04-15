import type {Metadata} from 'next'
import {Playfair_Display} from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

export const metadata: Metadata = {
  title: 'MUELLER WAGNER ADVOCATES',
  description: 'Коллегия адвокатов нового поколения, в которую входят европейские и российские адвокаты.',
}

const playfairDisplay = Playfair_Display({
  weight: ['400', '600'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-playfair-display',
})

const kaius = localFont({
  src: [{path: '../assets/fonts/Kaius-Bold.woff2', weight: '700'}],
  variable: '--font-kaius',
})

import Header from '~/Global/Header'
import Notification from '~/Global/Notification'
import Loader from '~/Global/Loader'
import YandexMetrika from '~/Global/Analytics'

export const dynamic = 'force-dynamic'
export const revalidate = 86400

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`bg-white text-foreground font-playfair antialiased relative ${playfairDisplay.variable} ${kaius.variable}`}>
        <Loader />

        <Notification />
        <Header />
        {children}

        {process.env.NODE_ENV === 'production' && <YandexMetrika />}
      </body>
    </html>
  )
}
