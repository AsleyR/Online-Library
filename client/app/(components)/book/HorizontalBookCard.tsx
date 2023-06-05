import getFullDateWithoutWeekDate from "@/app/(libs)/getFullDateWithoutWeekDate";
import { books } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function HorizontalBookCard({ book }: { book: books }) {
    return (
        <Link
            className='hover:scale-105 duration-300 transition-all'
            href={`/books/${book.id}`}
        >
            <div className="flex gap-3 border border-gray-300 bg-gray-100 rounded-lg drop-shadow-sm">
                <div className="w-[6rem]">
                    <Image
                        className='rounded-l-lg'
                        width={300}
                        height={300}
                        src={book.cover}
                        alt={`${book.title}-book-cover`}
                    />
                </div>
                <div className="flex flex-col justify-center">
                    <h1 className='font-bold text-xl'>{book.title}</h1>
                    <p className='text-lg'>{book.author}</p>
                    <p>{book.bookReleaseDate}</p>
                    <div className="flex gap-2">
                        <p>{book.publishedBy.username}</p>
                        <p>•</p>
                        <p>{getFullDateWithoutWeekDate(book.publishedDate)}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}