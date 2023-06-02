import getUserByEmail from "@/app/(actions)/auth0/users/getUsersByEmail"
import getAllBooks from "@/app/(actions)/books/getAllBooks"
import ButtonLink from "@/app/(components)/ButtonLink"
import UserInfoIcon from "@/app/(components)/user-icons/UserInfoIcon"
import UserInfo from "@/app/(components)/user/UserInfo"
import UserNotFound from "@/app/(components)/user/UserNotFound"
import { UserProfileInfo } from "@/app/(libs)/types"

interface UserIdPageProps {
    params: {
        email: string
    }
}

export default async function UserIdPage({ params }: UserIdPageProps) {
    const user: UserProfileInfo = await getUserByEmail(params.email).then((res) => res[0])

    if (!user) {
        return (
            <UserNotFound />
        )
    }

    const books = await getAllBooks()

    return (
        <div className="flex flex-col gap-5">
            <UserInfoIcon user={user} />
            <UserInfo user={user} books={books} auth={false} />
        </div>
    )
}