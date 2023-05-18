"use client"

import { useUser } from "@auth0/nextjs-auth0/client";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { books } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

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

export default function CreateBook() {
    const router = useRouter()
    const { user, error, isLoading } = useUser()

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
        const value = !Number.isNaN(e.target.valueAsNumber) ? e.target.valueAsNumber : 0

        setInput({
            ...input,
            "bookReleaseDate": value
        })
    }

    const handleAddTags = () => {
        setBook((prev) => ({
            ...book,
            tags: [...prev.tags, input.tags]
        }))

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
            bookReleaseDate: input.bookReleaseDate,
            publishedBy: book.publishedBy,
            tags: book.tags
        })

        console.log(formBody)

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/create`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formBody
        }).catch(err => console.log(err)).then(() => router.push('/books'))

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
            className="flex flex-col gap-3"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col md:flex-row gap-2">
                <label htmlFor="title">Title</label>
                <input
                    className="border-2 px-2 border-black focus:outline-none"
                    type={'text'}
                    name="title"
                    id="title"
                    onChange={handleChange}
                    value={input.title}
                />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
                <label htmlFor="author">Author</label>
                <input
                    className="border-2 px-2 border-black focus:outline-none"
                    type={'text'}
                    name="author"
                    id="author"
                    onChange={handleChange}
                    value={input.author}
                />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
                <label htmlFor="bookReleaseDate">Book release date</label>
                <input
                    className="border-2 px-2 border-black focus:outline-none"
                    type={'number'}
                    name="bookReleaseDate"
                    id="bookReleaseDate"
                    onChange={handleNumberChange}
                    value={input.bookReleaseDate}
                />
            </div>
            <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                <label htmlFor="tags">Add tags</label>
                <div className="flex gap-3 md:gap-2">
                    <input
                        className="border-2 px-2 border-black focus:outline-none"
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
                                    className="bg-gray-200 hover:scale-105 duration-200 rounded px-3 py-1 cursor-pointer">
                                    {tag}
                                </p>
                            )
                        }) : <p className="font-bold">No tags added yet</p>
                }
            </div>
            <div className="grid md:block">
                <button
                    type={'submit'}
                    className="bg-red-500 text-white hover:scale-105 transition-all px-3 py-1 rounded"
                >
                    Create New Book
                </button>
            </div>
        </form>
    )
}