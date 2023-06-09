import Link from "next/link"
import NavLinks from "./NavLinks"

const Navbar = () => {
    return (
        <div className="sticky top-0 z-30 grid grid-cols-[auto_min-content_min-content] md:grid-cols-2 h-[4rem] px-mobilex md:px-normalx bg-gray-100 border-b border-gray-300 items-center drop-shadow">
            <div className="">
                <Link className="font-bold text-xl" href={'/'}>Online Library</Link>
            </div>
            <NavLinks />
        </div>
    )
}

export default Navbar
