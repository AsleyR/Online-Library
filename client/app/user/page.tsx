import UserBooks from '../(components)/book/UserBooks'
import UserInfo from '../(components)/user/UserInfo'
import getAllBooks from '../(actions)/books/getAllBooks'

interface UserPageProps {
    props: {
        params: {
            id: string
        }
    }
}

export default async function Page({ params }: UserPageProps['props']) {
    const books = await getAllBooks()
    const userBooks: any = []
    books.map((book) => {
        if (book.publishedBy.email === "asleyrobleto@hotmail.com") {
            userBooks.push(book)
        }
    })

    return (
        <div className='flex flex-col gap-5'>
            <UserInfo />
            <div className="">
                {/* {await UserBooks({ user: user })} */}
                <UserBooks books={userBooks} />
            </div>
        </div>
    )
}
