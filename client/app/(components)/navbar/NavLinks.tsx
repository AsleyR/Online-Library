"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { faPlus, faUserAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import NavSearchIcon from "./NavSearchIcon"
import UserIcon from "../user-icons/UserIcon"
import AddBookButton from "../AddBookButton"

const NavLinks = () => {

    const { user, error, isLoading } = useUser()

    return (
        <div className="flex justify-end items-center">
            <ul className="flex gap-3 md:gap-5 justify-self-end items-center align-middle">
                <NavSearchIcon className="hover:bg-black/10 text-gray-700 rounded-full flex justify-center items-center text-xl" />
                {
                    user ? <AddBookButton /> : null
                }
                <UserIcon className="w-10 h-10" auth={user ? true : false} picture={user?.picture} />
            </ul>
        </div>
    )
}

export default NavLinks