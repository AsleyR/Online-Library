export default async function deleteComment(commentId: string) {
    const formBody = JSON.stringify({
        commentId: commentId
    })

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments/delete?quantity=single`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody
    }).catch(err => console.log(err))
}