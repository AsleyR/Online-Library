import { UserProvider } from '@auth0/nextjs-auth0/client'

import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from './(components)/navbar/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
          <div className="px-mobilex md:px-normalx my-[2rem]">
            {children}
          </div>
        </UserProvider>
      </body>
    </html>
  )
}
