"use client"

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { books } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormSection from "../../form/FormSection";
import Image from "next/image";
import { BookCoverContext } from "../CreateBook";
import UploadWidget from "../../widget/UploadWidget";

interface EditBookFormProps {
    props: {
        book: books
    },
    input: {
        title: string;
        author: string;
        bookReleaseDate: number;
        tags: string
    }
}

export default function EditBookForm({ book }: EditBookFormProps['props']) {
    const router = useRouter()

    const [bookCover, setBookCover] = useState(book.cover)

    const [input, setInput] = useState<EditBookFormProps['input']>({
        "title": book.title,
        "author": book.author,
        "bookReleaseDate": book.bookReleaseDate,
        "tags": ""
    })

    const [editBook, setEditBook] = useState<books>({
        "id": book.id,
        "title": book.title,
        "author": book.author,
        "cover": book.cover,
        "bookReleaseDate": book.bookReleaseDate,
        "publishedBy": book.publishedBy,
        "publishedDate": book.publishedDate,
        "tags": book.tags
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
        if (input.tags.trim() !== "") {
            setEditBook({
                ...book,
                tags: [...editBook.tags, input.tags]
            })
        }

        setInput({
            ...input,
            "tags": ""
        })
    }

    const removeTag = (e: React.MouseEvent<HTMLParagraphElement>) => {
        const currentTags = [...editBook.tags]
        const newTags: string[] = []
        currentTags.map((tag) => {
            if (tag !== currentTags[Number(e.currentTarget.id)]) {
                newTags.push(tag)
            }
        })

        setEditBook({
            ...editBook,
            tags: newTags
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formBody = JSON.stringify({
            bookId: book.id,
            title: input.title,
            cover: bookCover,
            author: input.author,
            bookReleaseDate: input.bookReleaseDate,
            tags: editBook.tags
        })

        console.log(formBody)

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/update`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formBody
        }).catch(err => console.log(err)).then(() => {
            router.prefetch(`/books/${book.id}`)
            router.push(`/books/${book.id}`)
        })
    }

    return (
        <form action=""
            method="POST"
            className="grid grid-cols-1 md:grid-cols-2 gap-5 border border-gray-300 p-5 rounded drop-shadow-sm"
            onSubmit={handleSubmit}
        >
            <FormSection className="col-span-2">
                <h1 className="block md:hidden font-medium text-lg md:text-xl">Edit book</h1>
                <div className="block md:hidden"></div>
                <div className="hidden md:block">
                    <h1 className="font-medium text-lg md:text-xl">Edit book</h1>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="title"
                            className=""
                        >
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={input.title}
                            onChange={handleChange}
                            className="border border-gray-400 rounded focus:outline-none px-2 py-1"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="author"
                            className=""
                        >
                            Author
                        </label>
                        <input
                            type="text"
                            name="author"
                            id="author"
                            value={input.author}
                            onChange={handleChange}
                            className="border border-gray-400 rounded focus:outline-none px-2 py-1"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="author"
                            className=""
                        >
                            Year published
                        </label>
                        <input
                            type="number"
                            name="bookReleaseDate"
                            id="bookReleaseDate"
                            value={input.bookReleaseDate}
                            onChange={handleNumberChange}
                            className="border border-gray-400 rounded focus:outline-none px-2 py-1"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="tags">Genre</label>
                        <div className="grid grid-flow-col gap-3 md:gap-2">
                            <input
                                className="border px-2 border-gray-400 focus:outline-none rounded"
                                type={'text'}
                                name="tags"
                                id="tags"
                                onChange={handleChange}
                                value={input.tags}
                            />
                            <button
                                className="bg-gray-200 hover:bg-gray-300 rounded w-8 h-8 flex items-center align-middle transition-all justify-center"
                                type={'button'}
                                onClick={handleAddTags}
                            >
                                <FontAwesomeIcon className="" icon={faPlus} />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 max-w-max md:max-w-xl">
                        {
                            editBook.tags.length !== 0 ?
                                editBook.tags.map((tag, index) => {
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
            <div className="grid justify-center col-span-2 border-t-2 border-gray-300 py-5 mt-5">
                <button
                    type={'submit'}
                    className="bg-blue-500 text-white hover:bg-blue-600 transition-all px-5 py-2 rounded"
                >
                    Update book
                </button>
            </div>
        </form >
    )
}