import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function AddBookButton() {
    return (
        <Link
            className="w-8 h-8 bg-gray-100 border border-gray-400 hover:border-none hover:bg-gray-300 rounded cursor-pointer flex justify-center items-center"
            href={'/books/create'}
        >
            <FontAwesomeIcon className="w-10 text-lg" icon={faPlus} />
        </Link>
    )
}