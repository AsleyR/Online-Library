import getFullDateWithoutWeekDate from "@/app/(libs)/getFullDateWithoutWeekDate";
import { books } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function HorizontalBookCard({ book }: { book: books }) {
    return (
        <Link
            className='lg:hover:scale-105 duration-300 transition-all'
            href={`/books/${book.id}`}
        >
            <div className="flex gap-3 border border-gray-300 bg-gray-100 rounded-lg drop-shadow-sm">
                <div className="w-[6rem] object-cover">
                    <Image
                        className='rounded-l-lg w-full h-full'
                        width={300}
                        height={300}
                        src={book.cover}
                        alt={`${book.title}-book-cover`}
                    />
                </div>
                <div className="flex flex-col justify-center py-3">
                    <h1 className='font-bold text-lg md:text-xl'>{book.title}</h1>
                    <p className='text-base md:text-lg'>{book.author}</p>
                    <p className="text-sm md:text-base">{book.bookReleaseDate}</p>
                    <div className="flex gap-2 text-sm">
                        <p>{book.publishedBy.username}</p>
                        <p>•</p>
                        <p>{getFullDateWithoutWeekDate(book.publishedDate)}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}