import Link from "next/link";
import { ButtonLinkProps } from "../(libs)/types";

export default function ButtonLink({ className, link, text }: ButtonLinkProps) {
    return (
        <Link href={link || "/"}>
            <button className={`${className || ""} w-full bg-blue-500 hover:bg-blue-600 text-white transition-all px-3 py-2 rounded`}>
                {text}
            </button>
        </Link>
    )
}