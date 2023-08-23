export default function limitString(str: string, maxLength: number = 20): string {
    if (str.length > maxLength) {
        const newStr = str[0] + str.substring(1, maxLength) + '...'
        return newStr
    }

    return str
}