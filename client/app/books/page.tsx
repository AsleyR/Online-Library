import Link from "next/link";

import BookCard from "../(components)/book/BookCard";
import SearchBar from "../(components)/search/SearchBar";
import getBooksByTitle from "../(actions)/books/getBooksByTitle";
import getAllBooks from "../(actions)/books/getAllBooks";
import getBooksByAuthor from "../(actions)/books/getBooksbyAuthor";
import getBooksByYear from "../(actions)/books/getBooksByYear";
import getBooksByTags from "../(actions)/books/getBooksByTags";

interface BooksPageProps {
    searchParams: {
        search?: string;
        filter?: string;
    }
}

const BooksPage = async ({ searchParams }: BooksPageProps) => {
    const searchParam = searchParams.search
    const filter = searchParams.filter || "title"

    let books: any[] = [] // Books[]

    switch (filter) {
        case "title":
            books = searchParam ? await getBooksByTitle(searchParam) : await getAllBooks()
            break;

        case "author":
            books = searchParam ? await getBooksByAuthor(searchParam) : await getAllBooks()
            break;

        case "year":
            books = searchParam ? await getBooksByYear(searchParam) : await getAllBooks()
            break;

        case "tags":
            books = searchParam ? await getBooksByTags(searchParam) : await getAllBooks()
            break;

        default:
            books = await getAllBooks();
            break;
    }

    return (
        <section className="my-[1rem]">
            <div className="flex flex-col gap-6">
                <SearchBar value={searchParam || ""} filter={filter} />
                {/* <h1>{searchParam || ""}</h1> */}
                {
                    books.length !== 0 ?
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                            {
                                books.map((book, index) => {
                                    return (
                                        <Link key={`${index}-book-link`} href={`/books/${book.id}`}>
                                            <BookCard book={book} />
                                        </Link>
                                    )
                                })
                            }
                        </div> :
                        <div className="flex justify-center">
                            <h1 className="font-medium text-xl">No results</h1>
                        </div>
                }
            </div>
        </section>
    )
}

export default BooksPage
