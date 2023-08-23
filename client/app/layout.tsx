import { UserProvider } from '@auth0/nextjs-auth0/client'

import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './(components)/navbar/Navbar'
import Footer from './(components)/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Online Library',
  description: 'Online Library',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}
        suppressHydrationWarning={true}
      >
        <UserProvider>
          <Navbar />
          <div className="">
            {children}
          </div>
          <Footer />
        </UserProvider>
      </body>
    </html>
  )
}
