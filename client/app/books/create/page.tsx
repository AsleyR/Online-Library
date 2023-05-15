"use client"

import CreateBook from "@/app/(components)/book/CreateBook";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";


function CreatePage() {

    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-bold text-3xl">Create New Book</h1>
            <CreateBook />
        </div>
    )
}

export default withPageAuthRequired(CreatePage, {
    onRedirecting: () => <div>...Loading</div>,
    onError: (error) => <div>{error.message}</div>
})
