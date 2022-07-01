import styled from "styled-components";

export const MainWrapper = styled("div")`
  display: flex;
  justify-content: center;
`;

export const Info = styled("div")`
  padding: 40px 20px;
  text-align: center;
`;

type ListProps = {
    maxWidth?: number;
    internal?: boolean;
}

export const List = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${({maxWidth}: ListProps) => maxWidth ? `${maxWidth}px` : "100%"};
`;

export const Thread = styled("div")`
  margin-left: 20px;
  border-left: 1px grey solid;
`;

export const CommentWrapper = styled("div")`
  font-size: 18px;
  color: #000;
`;
export const Header = styled("div")`
  display: flex;
  align-items: flex-start;
  padding: 20px;
`;
export const Avatar = styled("div")`
  background-color: grey;
  background-image: url("${({src}: {src: string}) => src}");
  background-size: cover;
  background-position: center;
  width: 88px;
  height: 88px;
  flex-shrink: 0;
  border-radius: 50%;
  margin-right: 20px;
`;

export const NameWrapper = styled("div")`
  flex-shrink: 1;
  flex-grow: 1;
  overflow: hidden;
  margin-top: 10px;
  margin-right: 10px;
`;

export const OverflowTextBlock = styled("div")`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const Name = styled(OverflowTextBlock)`
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  line-height: 1em;
`;

export const CreatedDate = styled(OverflowTextBlock)`
  color: grey;
  font-size: 14px;

`;

export const Likes = styled("div")`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  margin-top: 18px;

  svg {
    margin-right: 5px;
  }
`;

export const Text = styled("div")`
  padding: 4px 20px 20px 128px;
  line-height: 1.4em;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const Button = styled("button")`
  cursor: pointer;
  font-weight: bold;
  padding: 5px 10px;
`;

