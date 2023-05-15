"use client"

import { useUser } from "@auth0/nextjs-auth0/client"
import { faPlus, faUserAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import NavSearchIcon from "./NavSearchIcon"


interface UserIconProps {
    auth: boolean;
    picture: string | null;
    className?: string
}

export const DefaultUserIcon = () => {
    return (
        <div className="bg-[#cfcfcf] p-2 rounded-full w-10 h-10 flex justify-center align-middle items-center">
            <FontAwesomeIcon className="text-white w-min" icon={faUserAlt} />
        </div>
    )
}

const UserIcon = ({ auth, picture, className }: UserIconProps) => {

    if (!auth) {
        return (
            <Link className={`${className || ""}`} href={'/api/auth/login'}>
                <DefaultUserIcon />
            </Link>
        )
    }


    return (
        <Link
            className={`${className || ""}`}
            href={'/user'}
        >
            {
                picture ?
                    <Image
                        className="rounded-full w-10 h-10"
                        width={100}
                        height={100}
                        src={picture}
                        alt="user icon"
                    />
                    : <DefaultUserIcon />
            }

        </Link>
    )
}

const AddBookButton = () => {
    return (
        <Link
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer flex justify-center items-center"
            href={'/books/create'}
        >
            <FontAwesomeIcon className="w-10 text-lg" icon={faPlus} />
        </Link>
    )
}

const NavLinks = () => {

    const { user, error, isLoading } = useUser()

    return (
        <div className="flex justify-end items-center">
            <ul className="flex gap-3 md:gap-5 justify-self-end items-center align-middle">
                <NavSearchIcon className="hidden md:flex justify-center items-center text-xl" />
                {
                    user ? <AddBookButton /> : null
                }
                <UserIcon className="" auth={true} picture={user?.picture || null} />
            </ul>
        </div>
    )
}

export default NavLinks