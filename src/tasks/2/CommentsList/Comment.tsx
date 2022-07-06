import {FC, useMemo} from "react";
import {Avatar, CommentWrapper, CreatedDate, Header, Likes, List, Name, NameWrapper, Text, Thread} from "./styles";
import {CommentType} from "../types";
import {ReactComponent as LikeIcon} from "src/assets/like.svg";

interface CommentProps extends CommentType {
}

const Comment: FC<CommentProps> = ({
                                       created,
                                       text,
                                       author,
                                       likes,
                                       comments,
                                   }) => {

    const createdDate = useMemo(() => new Date(created).toLocaleString(), [created]);

    return <CommentWrapper>
        <Header>
            <Avatar src={author.avatar} />
            <NameWrapper>
                <Name>
                    {author.name}
                </Name>
                <CreatedDate>
                    {createdDate}
                </CreatedDate>
            </NameWrapper>
            <Likes>
                <LikeIcon />
                {likes}
            </Likes>
        </Header>
        <Text>{text}</Text>
        {comments &&
        <Thread>
            <List internal>
                {comments.map((c) => <Comment {...c} key={c.id} />)}
            </List>
        </Thread>}
    </CommentWrapper>;
};

export default Comment;
