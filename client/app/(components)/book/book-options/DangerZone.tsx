"use client"

import deleteBook from "@/app/(libs)/deleteBook"
import { books } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DangerZone({ book }: { book: books }) {
    const router = useRouter()

    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [confirmation, setConfirmation] = useState<string>("")
    const confimationString = `sudo rm book '${book.title}'`


    function doesStringsMatch(str: string, target: string) {
        return str === target
    }

    function deleteCurrentBook() {
        deleteBook(book.id).then(() => {
            router.prefetch('/books')
            router.push('/books')
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmation(e.target.value)
    }

    return (
        <>
            <div className="">
                <div className="rounded-t p-3"
                >
                    <h1 className="text-black text-lg">Danger zone</h1>
                </div>
                <div className="bg-red-100 rounded py-5">
                    <div className="grid grid-flow-col items-center align-middle gap-3 px-5 py-2">
                        <div className="flex flex-col">
                            <h3 className="font-medium">Delete this book</h3>
                            <p className="">All comments inside this book will be deleted</p>
                        </div>
                        <button className="bg-red-500 text-white hover:bg-red-600 duration-200 px-5 py-2 rounded justify-self-end"
                            onClick={() => setIsDelete(true)}
                        >
                            Delete book
                        </button>
                    </div>
                </div>
            </div>
            {
                isDelete ?
                    <div className="">
                        <div className="fixed z-40 inset-0 bg-black/40 h-full" onClick={() => { setIsDelete(false); setConfirmation('') }}></div>
                        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto z-50 bg-gray-100 rounded border-2 drop-shadow">
                            <div className="grid gap-3 p-[2rem]">
                                <h1 className="font-medium">Confirm your choice by writing the following phrase</h1>
                                <p className="font-bold bg-gray-200 py-2 text-red-500 text-center rounded-sm">{confimationString}</p>
                                <input
                                    className="bg-black/60 text-white border border-gray-600 px-3 py-2 focus:outline-none text-center rounded-sm"
                                    onChange={handleChange}
                                    id="confirmation"
                                    name="confirmation"
                                    value={confirmation}
                                />
                                <div className="grid grid-cols-2 gap-3 text-white">
                                    <button className="bg-black/80 hover:bg-black/90 duration-200 px-3 py-2 rounded"
                                        onClick={() => { setIsDelete(false); }}
                                    >
                                        Cancel
                                    </button>
                                    <div className={`${doesStringsMatch(confirmation, confimationString) ? "bg-red-500 hover:bg-red-600 cursor-pointer" : "bg-red-500/70 cursor-not-allowed"} text-center duration-200 px-3 py-2 rounded font-bold`}
                                        onClick={() => { doesStringsMatch(confirmation, confimationString) ? deleteCurrentBook() : null }}
                                    >
                                        Delete book
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null
            }
        </>
    )
}