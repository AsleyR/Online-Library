import getAllBooks from '../(actions)/books/getAllBooks'
import User from '../(components)/user/User'

export function generateMetadata() {
    return {
        "title": `User - Online Library`
    }
}

export default async function Page() {

    const books = await getAllBooks()

    return (
        <div className='flex flex-col gap-5'>
            <User books={books} />
        </div>
    )
}
