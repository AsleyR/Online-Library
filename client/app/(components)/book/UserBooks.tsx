import { ComponentProps } from "@/app/(libs)/types"
import BookCard from "./BookCard"
import { books } from "@prisma/client"
import Link from "next/link"

interface UserBooksProps extends ComponentProps {
    // user: UserProfile | undefined
    books: books[] | null;
}

export default function UserBooks({ books }: UserBooksProps) {
    // const books = await getBooksByUserEmail(user?.email || "").catch(err => null)

    if (!books) {
        return (
            <div className="">
                <h1 className='font-bold text-2xl'>My books</h1>
                <p className="">{`You haven't uploaded any book entries yet!`}</p>
            </div>
        )
    }


    return (
        <div className="flex flex-col gap-5">
            <h1 className='font-bold text-2xl'>My books</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {
                    books?.map((book: any, index) => {
                        return (
                            <Link key={`${index}-link-book-card`} href={`/books/${book.id}`}>
                                <BookCard book={book} />
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}
