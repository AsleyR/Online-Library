"use client"

import Image from "next/image"
import { useState } from "react"

interface BookCoverProps {
    props: {
        cover: string
    }
}

export default function BookCover({ cover }: BookCoverProps['props']) {
    const [bookCover, setBookCover] = useState<string>(cover)
    const [showCover, setShowCover] = useState<boolean>(false)

    const defaultBookCover = "/images/default-book-cover.png"

    return (
        <>
            {
                showCover ?
                    <div
                        onClick={() => setShowCover(false)}
                        className="fixed z-20 md:hidden bg-black/70 inset-0 py-[7rem] px-[1rem]">
                        <div className="grid justify-center align-middle">
                            <Image
                                className="bg-cover w-[25rem]"
                                priority
                                width={500}
                                height={500}
                                src={bookCover}
                                alt="Book Cover"
                                onError={() => setBookCover(defaultBookCover)}
                            />
                        </div>
                    </div> : null
            }
            <div
                onClick={() => setShowCover(true)}
                className="relative z-10 grid w-full h-[160px] md:h-[323px] overflow-y-hidden justify-center md:w-[15rem] bg-black/20 rounded-lg md:rounded">
                <div className="absolute md:hidden inset-0 hover:bg-black/30 cursor-pointer transition-all z-20"></div>
                <Image
                    className="bg-cover"
                    width={500}
                    height={500}
                    src={bookCover}
                    alt="Book Cover"
                    onError={() => setBookCover(defaultBookCover)}
                />
            </div>
        </>
    )
}