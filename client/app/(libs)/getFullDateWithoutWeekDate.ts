export default function getFullDateWithoutWeekDate(date: Date) {
    return new Date(date).toLocaleDateString('en-us', { "year": "numeric", "month": "short", "day": "numeric" })
}