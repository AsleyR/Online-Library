import CreateBook from "@/app/(components)/book/CreateBook";

export function generateMetadata() {
    return {
        "title": "Create New Book - Online Library"
    }
}

export default function Page() {
    return (
        <div className="flex flex-col gap-5">
            <h1 className="font-bold text-2xl">New book</h1>
            <CreateBook />
        </div>
    )
}
