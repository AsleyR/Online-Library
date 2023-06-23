import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface NavSearchIconProps {
    className?: string;
    link?: string
}

export default function NavSearchIcon({ className, link }: NavSearchIconProps) {
    return (
        <Link
            className={`${className || ""} w-10 h-10`}
            href={link || "/"}
        >
            <FontAwesomeIcon className="w-min" icon={faSearch} />
        </Link>
    )
}