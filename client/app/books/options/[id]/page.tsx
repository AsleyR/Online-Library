import getBookById from "@/app/(actions)/books/getBookById"
import DangerZone from "@/app/(components)/book/book-options/DangerZone";
import EditBook from "@/app/(components)/book/edit/EditBook";

interface EditPageProps {
    params: {
        id: string;
    }
}

type MetadataProps = {
    params: {
        id: string
    }
}

export async function generateMetadata({ params }: MetadataProps) {
    const bookId = params.id
    const bookTitle = await getBookById(bookId).then((book) => book?.title)

    return {
        "title": `${bookTitle}'s Book Options - Online Library`
    }
}

export default async function Page({ params }: EditPageProps) {
    const book = await getBookById(params.id).catch(err => null)

    if (!book) {
        return (
            <div className="">
                <h1 className="font-bold">Book not found!</h1>
            </div>
        )
    }

    return (
        <div className="grid gap-4">
            <EditBook book={book} />
            <DangerZone book={book} />
        </div>
    )
}