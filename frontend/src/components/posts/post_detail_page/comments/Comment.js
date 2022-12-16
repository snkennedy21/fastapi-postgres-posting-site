import CommentVoting from "./CommentVoting";
import CommentInfo from "./CommentInfo";

function Comment(props) {
  return (
    <div
      className="flex border-primary border-2 border-solid rounded-md overflow-hidden relative bg-white"
      key={props.commentObj.Comment.id}
    >
      <CommentVoting />
      <CommentInfo commentObj={props.commentObj} />
    </div>
  );
}

export default Comment;
