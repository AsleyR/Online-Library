"use client"

import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client'
import Link from 'next/link'

const LogoutButton = () => {
    return (
        <button className='bg-red-500 hover:scale-105 transition-all text-white px-5 py-2 rounded'>
            <Link href={'/api/auth/logout'}>Logout</Link>
        </button>
    )
}

function page() {

    const { user, error, isLoading } = useUser()

    return (
        <div className='flex flex-col gap-5'>
            <div className="">
                <h1 className='font-bold text-2xl'>Account's Info</h1>
                <p>Username: <span className=''>{user?.nickname}</span></p>
                <p>Email: <span className='underline'>{user?.email}</span></p>
            </div>
            <div className="flex justify-center">
                <LogoutButton />
            </div>
        </div>
    )
}

export default withPageAuthRequired(page, {
    onRedirecting: () => <div>...Loading</div>,
    onError: (error) => <div>{error.message}</div>
})
