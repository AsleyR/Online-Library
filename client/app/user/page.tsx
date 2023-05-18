import UserInfo from '../(components)/user/UserInfo'
import getAllBooks from '../(actions)/books/getAllBooks'

export function generateMetadata() {
    return {
        "title": `User - Online Library`
    }
}

export default async function Page() {
    const books = await getAllBooks()

    return (
        <div className='flex flex-col gap-5'>
            <UserInfo books={books} />
        </div>
    )
}
