import ButtonLink from "../ButtonLink";

export default function UserNotFound() {
    return (
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col justify-center text-center gap-5">
                <h1 className="font-bold text-3xl">This user doesn't exist</h1>
                <div className="flex justify-center">
                    <ButtonLink
                        className=""
                        text="Return to homepage"
                        link="/"
                    />
                </div>
            </div>
        </div>
    )
}