import { ComponentProps } from "@/app/(libs)/types";

interface FormSectionProps extends ComponentProps {
    children: React.ReactNode
}

export default function FormSection({ className, children }: FormSectionProps) {
    return (
        <div className={`${className || ""} grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-3 py-5 w-full`}>
            {children}
        </div>
    )
}