import getUserByEmail from "@/app/(actions)/auth0/users/getUsersByEmail"
import getAllBooks from "@/app/(actions)/books/getAllBooks"
import UserBooks from "@/app/(components)/book/UserBooks"
import UserInfoIcon from "@/app/(components)/user-icons/UserInfoIcon"
import UserInfo from "@/app/(components)/user/UserInfo"
import filterBooksByEmail from "@/app/(libs)/filterBooksByEmail"
import { UserProfileInfo } from "@/app/(libs)/types"

interface UserIdPageProps {
    params: {
        email: string
    }
}

export default async function UserIdPage({ params }: UserIdPageProps) {
    const user: UserProfileInfo = await getUserByEmail(params.email).then((res) => res[0])

    const books = await getAllBooks()

    const userBooks = filterBooksByEmail(books, user.email || "")

    return (
        <div className="flex flex-col gap-5">
            <UserInfoIcon user={user} />
            <UserInfo user={user} books={books} auth={false} />
        </div>
    )
}