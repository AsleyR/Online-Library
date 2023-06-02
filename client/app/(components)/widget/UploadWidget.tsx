"use client"

import { BookCoverType } from "@/app/(libs)/context/BookCover";
import { ComponentProps } from "@/app/(libs)/types";
import { CldUploadWidget } from "next-cloudinary";
import { useContext } from "react";
import { BookCoverContext } from "../book/CreateBook";

export const CloudinaryImageBasePath = "https://res.cloudinary.com/dapix4xbf/image/upload/"

interface UploadWidgetProps extends ComponentProps {
}

export default function UploadWidget({ className, text }: UploadWidgetProps) {
    const { bookCover, setBookCover } = useContext(BookCoverContext) as BookCoverType

    const handleUpload = (e: any) => {
        setBookCover(`${CloudinaryImageBasePath}${e.info.path}`)
        // console.log(`${CloudinaryImageBasePath}${e.info.path}`)
    }

    return (
        <CldUploadWidget
            onUpload={handleUpload}
            uploadPreset="binht0de"
            options={{
                "sources": ['local', 'url']
            }}
        >
            {({ open }) => {
                function handleOnClick(e: any) {
                    e.preventDefault();
                    open();
                }
                return (
                    <button className={`${className || ""} bg-black/70 hover:bg-black/80 transition-all py-2 px-4 text-white rounded-full`} onClick={handleOnClick}>
                        {text || "Upload an image"}
                    </button>
                );
            }}
        </CldUploadWidget>
    )
}