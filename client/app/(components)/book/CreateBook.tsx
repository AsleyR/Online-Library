"use client"

import { useUser } from "@auth0/nextjs-auth0/client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { books } from "@prisma/client";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react"
import UploadWidget from "../widget/UploadWidget";
import Image from "next/image";
import { BookCoverType } from "@/app/(libs)/context/BookCover";
import FormSection from "../form/FormSection";

interface CreateBookProps {
    newBook: {
        input: {
            title: string;
            author: string;
            bookReleaseDate: number;
            tags: string;
        };

        book: books;
    }
}

export const BookCoverContext = createContext<BookCoverType | null>(null)

export default function CreateBook() {
    const router = useRouter()
    const { user, error, isLoading } = useUser()

    const [bookCover, setBookCover] = useState('/images/default-book-cover.png')

    useEffect(() => {
        if (!user) {
            router.push('/api/auth/login')
        }
    }, [user])

    const [input, setInput] = useState<CreateBookProps['newBook']['input']>({
        "title": "",
        "author": "",
        "bookReleaseDate": 0,
        "tags": ""
    })

    const [book, setBook] = useState<CreateBookProps['newBook']['book']>({
        "id": "",
        "title": "",
        "author": "",
        "cover": bookCover,
        "bookReleaseDate": 0,
        "publishedBy": {
            "username": user?.nickname || user?.email || "Username",
            "email": user?.email || ""
        },
        "publishedDate": new Date(),
        "tags": []
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = !Number.isNaN(e.target.valueAsNumber) ? parseInt(e.target.value) : 0

        setInput({
            ...input,
            "bookReleaseDate": value
        })
    }

    const handleAddTags = () => {
        if (input.tags.trim() !== "") {
            setBook((prev) => ({
                ...book,
                tags: [...prev.tags, input.tags]
            }))
        }

        // Restore input.tags value
        setInput({
            ...input,
            "tags": ""
        })
    }

    const removeTag = (e: React.MouseEvent<HTMLParagraphElement>) => {
        const currentTags = [...book.tags]
        const newTags: string[] = []
        currentTags.map((tag) => {
            if (tag !== currentTags[Number(e.currentTarget.id)]) {
                newTags.push(tag)
            }
        })

        setBook({
            ...book,
            tags: newTags
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formBody = JSON.stringify({
            title: input.title,
            author: input.author,
            cover: book.cover,
            bookReleaseDate: input.bookReleaseDate,
            publishedBy: book.publishedBy,
            tags: book.tags
        })

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/create`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formBody
        }).catch(err => console.log(err)).then(() => {
            router.prefetch('/books/')
            router.push('/books/')
        })

        setInput({
            "author": "",
            "title": "",
            "bookReleaseDate": 0,
            "tags": ""
        })

        setBook({
            ...book,
            "title": "",
            "author": "",
            "bookReleaseDate": 0,
            "tags": [],
        })
    }

    return (
        <form action={'/api/books/create'} method={'POST'}
            id="create-book-form"
            className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row gap-3 gap-y-5 border border-gray-300 drop-shadow-sm p-5 rounded"
            onSubmit={handleSubmit}
        >
            <FormSection className="col-span-2">
                <div className="">
                    <h1 className="font-medium text-lg md:text-xl">Info</h1>
                </div>
                <div className="flex flex-col gap-[5rem]">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="title">Title</label>
                            <input
                                className="border px-2 py-1 border-gray-400 rounded focus:outline-none"
                                type={'text'}
                                name="title"
                                id="title"
                                onChange={handleChange}
                                value={input.title}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="author">Author</label>
                            <input
                                className="border px-2 py-1 border-gray-400 rounded focus:outline-none"
                                type={'text'}
                                name="author"
                                id="author"
                                onChange={handleChange}
                                value={input.author}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="bookReleaseDate">Book release date</label>
                            <input
                                className="border px-2 py-1 border-gray-400 rounded focus:outline-none"
                                type={'number'}
                                name="bookReleaseDate"
                                id="bookReleaseDate"
                                onChange={handleNumberChange}
                                value={input.bookReleaseDate}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="tags">Genre</label>
                            <div className="grid grid-flow-col gap-3 md:gap-2">
                                <input
                                    className="border px-2 py-1 border-gray-400 rounded focus:outline-none"
                                    type={'text'}
                                    name="tags"
                                    id="tags"
                                    onChange={handleChange}
                                    value={input.tags}
                                />
                                <button
                                    className="bg-gray-200 hover:bg-gray-300 rounded w-8 h-8 flex items-center align-middle justify-center"
                                    type={'button'}
                                    onClick={handleAddTags}
                                >
                                    <FontAwesomeIcon className="" icon={faPlus} />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {
                                book.tags.length !== 0 ?
                                    book.tags.map((tag, index) => {
                                        return (
                                            <p key={`${index}-book-tag`}
                                                id={`${index}`}
                                                onClick={removeTag}
                                                className="bg-gray-200 border border-gray-300 drop-shadow-sm hover:scale-105 duration-200 rounded px-3 py-1 cursor-pointer">
                                                {tag}
                                            </p>
                                        )
                                    }) : <p className="font-bold">No genres added yet</p>
                            }
                        </div>
                    </div>
                </div>
            </FormSection>
            <FormSection className="border-t border-gray-300 col-span-2">
                <div className="">
                    <h1 className="font-medium text-lg md:text-xl">Cover</h1>
                </div>
                <div className="">
                    <div className="grid gap-5 justify-center">
                        <div className="flex justify-center">
                            <Image
                                className="w-[15rem] object-cover"
                                width={400}
                                height={400}
                                src={bookCover}
                                alt="book cover"
                            />
                        </div>
                        <div className="flex flex-col justify-center">
                            <p className="font-medium text-left">Dimensions</p>
                            <p className="">520px Width, 700px Height</p>
                        </div>
                        <div className="flex justify-center">
                            <BookCoverContext.Provider value={{ bookCover, setBookCover }}>
                                <UploadWidget className="py-2 px-3 rounded-md" />
                            </BookCoverContext.Provider>
                        </div>
                    </div>
                </div>
            </FormSection>
            <div className="grid col-span-2 lg:col-span-2 md:justify-center border-t-2 border-gray-300 mt-[3rem] pt-8">
                <button
                    type={'submit'}
                    className="bg-green-600 text-white hover:bg-green-700 transition-all px-5 py-2 rounded"
                >
                    Create new book
                </button>
            </div>
        </form>
    )
}