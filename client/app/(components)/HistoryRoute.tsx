"use client"

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import { HistoryRouteProps } from "../(libs)/types"

export default function HistoryRoute({ className, text, link }: HistoryRouteProps) {
    const router = useRouter()

    return (
        <div className={`flex ${className || ""}`}>
            <div
                className="grid grid-flow-col text-gray-600 hover:text-gray-900 items-center gap-1 cursor-pointer"
                onClick={() => { link ? router.push(link) : router.back() }}
            >
                <FontAwesomeIcon className="" icon={faChevronLeft} />
                <p className="min-w-min">{text || "Return to previous page"}</p>
            </div>
        </div>
    )
}