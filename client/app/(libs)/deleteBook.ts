export default async function deleteBook(bookId: string) {
    const formBody = JSON.stringify({
        bookId: bookId
    })

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/books/delete?quantity=single`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody
    }).catch(err => console.log(err))
}