export interface CommentOptions {
    commentOptions: {
        render: boolean;
        edit: boolean;
        delete: boolean;
    }
}

export type CommentOptionsType = {
    commentOptions: CommentOptions['commentOptions']
    setCommentOptions: (commentOptions: CommentOptions['commentOptions']) => void;
}