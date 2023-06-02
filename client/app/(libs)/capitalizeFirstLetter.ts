/**
* Capitalizes the first letter in a string. The string must not be empty.
* @param string of type `string`. It can't be empty
* @returns new string with first letter capitalized.
*/
export default function capitalizeFirstLetter(string: string): string {
    if (string.length !== 0) {
        const toConvert: string = string.toLowerCase() // Make string value     lowercase just in case.
        const firstCapLetter = toConvert.charAt(0).toUpperCase()
        const newString = firstCapLetter + toConvert.slice(1)

        return newString
    }

    return string // returns string if its length is 0.
}