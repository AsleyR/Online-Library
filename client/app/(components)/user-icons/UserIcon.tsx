import Link from "next/link"
import { UserIconProps } from "../../(libs)/types"
import DefaultUserIcon from "./DefaultUserIcon"
import Image from "next/image"

export default function UserIcon({ auth, picture, className }: UserIconProps) {

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
                picture !== null && picture !== undefined ?
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