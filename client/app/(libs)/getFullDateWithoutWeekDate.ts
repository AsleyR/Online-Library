export default function getFullDateWithoutWeekDate(date: Date) {
    return date.toLocaleDateString('en-us', { "year": "numeric", "month": "short", "day": "numeric" })
}