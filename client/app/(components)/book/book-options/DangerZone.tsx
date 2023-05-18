"use client"

import deleteBook from "@/app/(libs)/deleteBook"
import { books } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function DangerZone({ book }: { book: books }) {
    const router = useRouter()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [confirmation, setConfirmation] = useState<string>("")
    const confimationString = `sudo rm book '${book.title}'`


    function doesStringsMatch(str: string, target: string) {
        return str === target
    }

    function deleteCurrentBook() {
        deleteBook(book.id)
        router.push('/')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmation(e.target.value)
    }

    return (
        <>
            <div className="">
                <div className="bg-gray-200 hover:bg-gray-300 duration-200 rounded p-3 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <h1 className="text-red-500 font-bold">Danger zone</h1>
                </div>
                {
                    isOpen ?
                        <div className="bg-black/70 rounded-b py-5">
                            <div className="flex px-3">
                                <button className="bg-red-500 text-white hover:bg-red-600 duration-200 px-10 py-3 rounded"
                                    onClick={() => setIsDelete(true)}
                                >
                                    Delete Book
                                </button>
                            </div>
                        </div>
                        : null
                }
            </div>
            {
                isDelete ?
                    <div className="">
                        <div className="absolute z-40 inset-0 bg-black/40 h-full" onClick={() => setIsDelete(false)}></div>
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto z-50 bg-gray-100 rounded border-2 drop-shadow">
                            <div className="grid gap-3 p-[2rem]">
                                <h1 className="font-medium">Confirm your choice by writing the following phrase</h1>
                                <p className="font-bold bg-gray-300 py-2 text-red-500 text-center">{confimationString}</p>
                                <input
                                    className="bg-black/50 text-white font-bold px-3 py-2 focus:outline-none text-center"
                                    onChange={handleChange}
                                    id="confirmation"
                                    name="confirmation"
                                    value={confirmation}
                                />
                                <div className="grid grid-cols-2 gap-3 text-white">
                                    <button className="bg-black/80 hover:bg-black/90 duration-200 px-3 py-2 rounded"
                                        onClick={() => { setIsDelete(false); setIsOpen(false) }}
                                    >
                                        Cancel
                                    </button>
                                    <div className={`${doesStringsMatch(confirmation, confimationString) ? "bg-red-500 hover:bg-red-600 cursor-pointer" : "bg-red-800/40 cursor-not-allowed"} text-center duration-200 px-3 py-2 rounded font-bold`}
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