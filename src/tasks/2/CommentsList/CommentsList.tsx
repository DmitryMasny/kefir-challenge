import {useEffect, useState} from "react";
import getDataRequest from "../data/getDataRequest";
import {List, MainWrapper, Info, Button} from "./styles";
import {AuthorType, AuthorId, CommentType, CommentDataType, PostId} from "../types";
import Comment from "./Comment";

const CommentsList = () => {
    const [commentsList, setCommentsList] = useState<CommentType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>();

    useEffect(() => {
        if (commentsList === null && !error) {
            setLoading(true);
            getDataRequest()
                .then((x) => {
                    const comments: Record<PostId, CommentDataType> = {};
                    const authors: Record<AuthorId, AuthorType> = x.authors.reduce((assemble, author) => ({
                        ...assemble,
                        [author.id]: author,
                    }), {});

                    const rootList: CommentDataType[] = x.comments.filter((c) => {
                        comments[c.id] = {
                            ...c,
                            comments: comments[c.id]?.comments,
                        };
                        if (c.parent) {
                            comments[c.parent] = {
                                ...(comments[c.parent] || {}),
                                comments: [...(comments[c.parent]?.comments || []), c.id],
                            };
                        }
                        return !c.parent;
                    });
                    const generateComments = (list?: CommentDataType[]): CommentType[] => {
                        if (!list) return [];

                        return list
                            .map((commentData) => ({
                                ...commentData,
                                author: authors[commentData.author],
                                ...(
                                    comments[commentData.id]?.comments ?
                                        {comments: generateComments(comments[commentData.id].comments!.map((id: number) => comments[id]))}
                                        : {comments: undefined}
                                ),
                            }))
                            .sort((a: CommentType, b: CommentType) => Date.parse(a.created) - Date.parse(b.created));
                    };

                    setCommentsList(generateComments(rootList));
                })
                .catch(({message}) => {
                    setError(message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [commentsList, error]);

    const clearError = () => {
        setError("");
        setCommentsList(null);
    };

    if (error) return (
        <MainWrapper>
            <div>
                <Info>Ошибка загрузки данных</Info>
                <Info><Button onClick={clearError}>Попробовать снова</Button></Info>
            </div>
        </MainWrapper>
    );

    return (
        <MainWrapper>
            {loading ? <Info>Загрузка</Info> :
                <List maxWidth={610}>
                    {
                        commentsList?.map((comment) => <Comment {...comment} key={comment.id} />)
                        || <Info>Комментариев нет</Info>
                    }
                </List>}
        </MainWrapper>
    );
};

export default CommentsList;
