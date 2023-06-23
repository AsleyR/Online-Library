"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import NavSearchIcon from "./NavSearchIcon"
import UserIcon from "../user-icons/UserIcon"
import AddBookButton from "../AddBookButton"
import { usePathname } from "next/navigation"

const NavLinks = () => {
    const pathName = usePathname()
    const { user, error, isLoading } = useUser()

    return (
        <div className="flex justify-end items-center">
            <ul className="flex gap-3 md:gap-5 justify-self-end items-center align-middle">
                {
                    pathName !== "/" ?
                        <NavSearchIcon className="hover:bg-black/10 text-gray-700 rounded-full flex justify-center items-center text-xl" />
                        : null
                }
                {
                    user ? <AddBookButton /> : null
                }
                <UserIcon className="w-10 h-10" auth={user ? true : false} picture={user?.picture} />
            </ul>
        </div>
    )
}

export default NavLinks