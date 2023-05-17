import Link from "next/link"
import NavLinks from "./NavLinks"
import NavSearchIcon from "./NavSearchIcon"

const Navbar = () => {
    return (
        <div className="sticky top-0 z-30 grid grid-cols-[auto_min-content_min-content] md:grid-cols-2 h-[4rem] px-mobilex md:px-normalx bg-blue-300 items-center">
            <div className="">
                <Link className="font-bold text-xl" href={'/'}>Online Library</Link>
            </div>
            {/* <NavSearchIcon className="flex md:hidden justify-center items-center text-xl" /> */}
            <NavLinks />
        </div>
    )
}

export default Navbar
