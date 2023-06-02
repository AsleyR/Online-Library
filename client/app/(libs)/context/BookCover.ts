export interface BookCover {
    bookCover: string;
}

export type BookCoverType = {
    bookCover: BookCover['bookCover'];
    setBookCover: (bookCover: BookCover['bookCover']) => void;
}