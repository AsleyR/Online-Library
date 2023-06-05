import getFullDateWithoutWeekDate from "@/app/(libs)/getFullDateWithoutWeekDate"
import { UserProfileInfo } from "@/app/(libs)/types"
import UserIcon from "./UserIcon"
import capitalizeFirstLetter from "@/app/(libs)/capitalizeFirstLetter"

interface UserInfoIconProps {
    user: UserProfileInfo
}

export default function UserInfoIcon({ user }: UserInfoIconProps) {
    const parsedDate = getFullDateWithoutWeekDate(new Date(user.created_at || ""))

    return (
        <div className="flex gap-2 items-center">
            <UserIcon auth={true} picture={user.picture} link={null}
                className="w-[3.5rem] h-[3.5rem] cursor-default"
            />
            <div className="flex flex-col">
                <h1 className="font-bold text-3xl">{capitalizeFirstLetter(user.nickname || user.name || "User")}</h1>
                <p className="">Joined {parsedDate}</p>
            </div>
        </div>
    )
}