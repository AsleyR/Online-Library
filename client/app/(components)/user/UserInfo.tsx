import { UserProfile } from "@auth0/nextjs-auth0/client"
import { books } from "@prisma/client"
import ButtonLink from "../ButtonLink"
import { UserProfileInfo } from "@/app/(libs)/types"
import UserBooks from "../book/UserBooks"
import filterBooksByEmail from "@/app/(libs)/filterBooksByEmail"

interface UserInfoProps {
    user?: UserProfileInfo | UserProfile;
    books: books[];
    auth: boolean
}

export default function UserInfo({ user, books, auth }: UserInfoProps) {


    const userBooks = filterBooksByEmail(books, user?.email || "")

    return (
        <>
            <div className="grid gap-5 bg-white border border-gray-300 rounded p-5 drop-shadow-sm">
                <h1 className='font-bold text-2xl'>Account info</h1>
                <div className="">
                    <div className="flex flex-col border-t border-gray-300 py-3">
                        <h3 className="font-medium text-lg">Username</h3>
                        <p>{user?.nickname || "User"}</p>
                    </div>
                    <div className={`flex flex-col ${auth ? "border-y" : "border-t"} border-gray-300 py-3`}>
                        <h3 className="font-medium text-lg">Email</h3>
                        <p>{user?.email || "user email"}</p>
                    </div>
                </div>
                {
                    auth ?
                        <div className="flex">
                            <ButtonLink
                                className="bg-red-500 hover:bg-red-600 transition-all text-white px-5 py-2 rounded"
                                text="Logout"
                                link="/api/auth/logout" />
                        </div> : null
                }
            </div>
            <UserBooks books={userBooks} user={user} auth={auth} />
        </>
    )
}
