import Image from 'next/image'
import Link from 'next/link'
import Container from './(components)/Container'
import ButtonLink from './(components)/ButtonLink'
import getBooksByTitle from './(actions)/books/getBooksByTitle'
import getAllBooks from './(actions)/books/getAllBooks'
import getBooksByAuthor from './(actions)/books/getBooksbyAuthor'
import getBooksByTags from './(actions)/books/getBooksByTags'
import getBooksByYear from './(actions)/books/getBooksByYear'
import SearchBar from './(components)/search/SearchBar'
import BookCards from './(components)/book/BookCards'

interface HomePageProps {
  searchParams: {
    search?: string;
    filter?: string;
  }
}

type MetadataProps = {
  searchParams: {
    search?: string;
  }
}

export function generateMetadata({ searchParams }: MetadataProps) {
  const search = searchParams.search || "Search"

  return {
    'title': `${search} - Online Library`
  }
}

export default async function Home({ searchParams }: HomePageProps) {
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
    <Container>
      <main className="grid">
        <div className="flex flex-col gap-6">
          <SearchBar value={searchParam || ""} filter={filter} />
          {
            books.length !== 0 ?
              <BookCards books={books} /> :
              <div className="flex justify-center h-screen">
                <h1 className="font-medium text-xl">No results</h1>
              </div>
          }
        </div>
      </main>
    </Container>
  )
}
