import { ComponentProps } from "@/app/(libs)/types"
import { books } from "@prisma/client"
import BookCards from "./BookCards";
import { UserProfile } from "@auth0/nextjs-auth0/client";

export interface UserBooksProps extends ComponentProps {
    user?: UserProfile;
    books: books[] | null;
    auth?: boolean
}

export default function UserBooks({ books, user, auth }: UserBooksProps) {

    auth = auth ? true : false // HAHAHAHA, this is temporal

    if (!books || books.length === 0) {
        return (
            <div className="bg-white border border-gray-300 p-5 drop-shadow-sm rounded">
                <h1 className='font-bold text-2xl'>
                    {
                        auth ? "My books" : `Published books`
                    }
                </h1>
                {
                    auth ?
                        <p className="">{`You haven't uploaded any book entries yet!`}</p>
                        :
                        <p className="">{`This user hasn't uploaded any book entries yet!`}</p>
                }
            </div>
        )
    }


    return (
        <div className="flex flex-col gap-5 bg-white border border-gray-300 p-5 drop-shadow-sm rounded">
            <h1 className='font-bold text-2xl'>
                {
                    auth ?
                        "My books" : `Published books`
                }
            </h1>
            <BookCards books={books} />
        </div>
    )
}
