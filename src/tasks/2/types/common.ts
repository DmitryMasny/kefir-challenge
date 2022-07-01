export type AuthorId = number;
export type PostId = number;

export type AuthorType = {
    id: AuthorId;
    name: string;
    avatar: string;
}
export type CommentDataType = {
    id: PostId;
    created: string;
    text: string;
    author: AuthorId;
    parent: PostId | null;
    likes: number;
    comments?: PostId[]
}

export type CommentType = Omit<CommentDataType, 'author' | 'comments'> & {
    author: AuthorType;
    comments?: CommentType[]
}
