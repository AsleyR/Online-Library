"use client"

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { books } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

        console.log(newTags)

        setEditBook({
            ...editBook,
            tags: newTags
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formBody = JSON.stringify({
            title: input.title,
            author: input.author,
            bookReleaseDate: input.bookReleaseDate,
            tags: editBook.tags
        })

        console.log(formBody)

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/update`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: formBody
        }).catch(err => console.log(err))

        router.push(`/books/${book.id}`)
    }

    return (
        <form action=""
            method="POST"
            className="grid gap-5"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col md:flex-row gap-2">
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
                    className="border-2 border-black focus:outline-none px-2"
                />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
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
                    className="border-2 border-black focus:outline-none px-2"
                />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
                <label
                    htmlFor="author"
                    className=""
                >
                    Book release date
                </label>
                <input
                    type="number"
                    name="bookReleaseDate"
                    id="bookReleaseDate"
                    value={input.bookReleaseDate}
                    onChange={handleNumberChange}
                    className="border-2 border-black focus:outline-none px-2"
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
                    editBook.tags.length !== 0 ?
                        editBook.tags.map((tag, index) => {
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
                    className="bg-blue-500 text-white hover:scale-105 transition-all px-3 py-2 rounded"
                >
                    Update book
                </button>
            </div>
        </form>
    )
}