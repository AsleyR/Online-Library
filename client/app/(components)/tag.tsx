import { ComponentProps } from "../(libs)/types";

interface TagProps extends ComponentProps {
}

export default function Tag({ className, text }: TagProps) {
    return (
        <div
            className={`${className || ""} bg-gray-200 border border-gray-300 drop-shadow-sm hover:scale-105 duration-200 rounded px-3 py-1 cursor-pointer`}>
            {text}
        </div>
    )
}