import { prisma } from "@/app/(libs)/client"
import { books } from "@prisma/client"

function convertJSONObjectArrayToBooks(jsonObjectArray: any): books {
    const books: books = {
        'id': jsonObjectArray._id.$oid,
        "title": jsonObjectArray.title,
        "author": jsonObjectArray.author,
        "cover": jsonObjectArray.cover,
        "tags": jsonObjectArray.tags,
        "bookReleaseDate": jsonObjectArray.bookReleaseDate,
        "publishedBy": jsonObjectArray.publishedBy,
        "publishedDate": jsonObjectArray.publishedDate.$date,
    }

    return books
}

export default async function getRandomBooks(ammount?: number) {
    if (!ammount) {
        ammount = 5
    }

    const randomBooks = await prisma.books.aggregateRaw({
        pipeline: [
            {
                $sample: {
                    size: ammount
                }
            }
        ]
    }).then((books) => {
        const stringifyBooks = JSON.stringify(books)
        const JSONParsedBooks = JSON.parse(stringifyBooks)
        const parsedBooks = JSONParsedBooks.map((book: any) => {
            return convertJSONObjectArrayToBooks(book)
        })

        return parsedBooks
    })

    return (randomBooks)
}