import Link from "next/link"
import { UserIconProps } from "../../(libs)/types"
import DefaultUserIcon from "./DefaultUserIcon"
import Image from "next/image"

export default function UserIcon({ auth, picture, link, className }: UserIconProps) {

    if (!auth) {
        return (
            <>
                {
                    link !== null ?
                        <Link className={`${className || ""} w-10 h-10`} href={'/api/auth/login'}>
                            <DefaultUserIcon />
                        </Link> :
                        <div className={`${className || ""} w-10 h-10`}>
                            <DefaultUserIcon />
                        </div>
                }
            </>
        )
    }


    return (
        <>
            {
                link !== null ?
                    <Link
                        className={`${className || ""} w-10 h-10`}
                        href={link ? link : '/user'}
                    >
                        {
                            picture !== null && picture !== undefined ?
                                <Image
                                    className="rounded-full"
                                    width={500}
                                    height={500}
                                    src={picture}
                                    alt="user icon"
                                />
                                : <DefaultUserIcon />
                        }

                    </Link> :
                    <div className={`${className || ""} w-10 h-10`}>
                        {
                            picture ?
                                <Image
                                    className="rounded-full"
                                    width={500}
                                    height={500}
                                    src={picture}
                                    alt="user icon"
                                />
                                : <DefaultUserIcon />
                        }
                    </div>
            }
        </>
    )
}