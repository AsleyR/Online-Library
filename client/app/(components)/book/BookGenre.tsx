import { BookGenreProps } from "@/app/(libs)/types";
import Tag from "../tag";

export default function BookGenre({ genres }: BookGenreProps) {
    return (
        <div className="grid gap-1 mb-5">
            <h2 className="font-medium">Genre</h2>
            <div className="flex flex-wrap gap-2 max-w-sm">
                {
                    genres.map((genre, index) => {
                        return (
                            <Tag key={`${index}-{tag}-tag`} text={genre} />
                        )
                    })
                }
            </div>
        </div>
    )
}