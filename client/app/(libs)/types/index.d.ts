import { books } from "@prisma/client";

export interface ComponentProps {
    className?: string;
    text?: string;
}

export interface UserIconProps extends ComponentProps {
    auth: boolean;
    picture: string | null | undefined;
}

export interface CommentOptionsProps extends ComponentProps {
    commentId: string;
    author: comments['author']
}

export interface BookOptionsProps extends ComponentProps {
    bookId: string;
    author: books['publishedBy']
}