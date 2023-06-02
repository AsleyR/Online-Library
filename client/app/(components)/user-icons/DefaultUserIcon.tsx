import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DefaultUserIcon() {
    return (
        <div className="bg-blue-300 p-2 w-10 h-10 rounded-full flex justify-center align-middle items-center">
            <FontAwesomeIcon className="text-white w-min" icon={faUserAlt} />
        </div>
    )
}