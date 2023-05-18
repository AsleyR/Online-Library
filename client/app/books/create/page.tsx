import CreateBook from "@/app/(components)/book/CreateBook";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function generateMetadata() {
    return {
        "title": "Create New Book - Online Library"
    }
}

export default function Page() {
    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl">Create New Book</h1>
            <CreateBook />
        </div>
    )
}
