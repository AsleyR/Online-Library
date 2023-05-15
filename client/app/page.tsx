"use client"

import { useUser } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'

export default function Home() {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>

  if (error) return <div>{error.message}</div>

  return (
    <main className="grid gap-3">
      <h1 className='font-bold text-3xl'>Welcome to your online library!</h1>
      <div className="">
        <div className="">
          <Link
            className=''
            href={'/books'}
          >
            <button className='bg-blue-400 text-white hover:scale-105 transition-all px-3 py-2 rounded'>
              See books
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
