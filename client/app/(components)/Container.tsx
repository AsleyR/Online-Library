import { ContainerProps } from "../(libs)/types";

export default function Container({ children, className }: ContainerProps) {
    return (
        <div className={`px-mobilex md:px-normalx my-[2rem] ${className || ""}`}>
            {children}
        </div>
    )
}