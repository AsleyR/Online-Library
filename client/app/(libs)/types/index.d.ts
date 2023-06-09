import { UserProfile } from "@auth0/nextjs-auth0/client";
import { books } from "@prisma/client";

// Component Props

export interface ComponentProps {
    className?: string;
    text?: string;
}

export interface ContainerProps extends ComponentProps {
    children: React.ReactNode
}

export interface ButtonLinkProps extends ComponentProps {
    link?: string
}

export interface UserIconProps extends ComponentProps {
    auth: boolean;
    picture: string | null | undefined;
    link?: string | null
}

export interface CommentOptionsProps extends ComponentProps {
    commentId: string;
    author: comments['author']
}

export interface BookOptionsProps extends ComponentProps {
    bookId: string;
    author: books['publishedBy']
}

export interface HistoryRouteProps extends ComponentProps {
    link?: string;
}

export interface BookGenreProps {
    genres: books['tags']
}

// Interfaces

export interface UserProfileInfo extends UserProfile {
    created_at: string | null
}