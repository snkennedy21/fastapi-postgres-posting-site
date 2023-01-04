import { FaAngleUp, FaAngleDown } from "react-icons/fa";

import {
  useCommentVoteMutation,
  useDeleteCommentVoteMutation,
} from "../../../../store/rtk-query-apis/mainApi";

function CommentVoting(props) {
  const [addVote] = useCommentVoteMutation();
  const [deleteVote] = useDeleteCommentVoteMutation();

  function voteHandler(e) {
    const commentId = parseInt(e.currentTarget.dataset.comment);
    const voteDirection = parseInt(e.currentTarget.dataset.direction);
    const upvote = e.currentTarget.dataset.user_vote;
    const commentOwnedByCurrentUser =
      e.currentTarget.dataset.comment_owned_by_current_user;

    const addVoteData = {
      comment_id: commentId,
      direction: voteDirection,
    };

    const deleteVoteData = {
      comment_id: commentId,
    };

    if (commentOwnedByCurrentUser === "true") {
      alert("Cannot Vote on Your Own Comment");
      return;
    }

    if (upvote === undefined) {
      addVote(addVoteData);
    } else if (upvote === "true" && voteDirection === 0) {
      deleteVote(deleteVoteData);
    } else if (upvote === "false" && voteDirection === 1) {
      deleteVote(deleteVoteData);
    }
  }

  return (
    <div className="flex flex-col items-center px-2">
      <button
        onClick={voteHandler}
        data-comment_owned_by_current_user={props.comment.owner_is_user}
        data-comment={props.comment.id}
        data-user_vote={props.comment.user_vote}
        data-direction={1}
        className="button"
      >
        <FaAngleUp
          className={`${
            props.comment.user_vote === true ? "text-primary" : ""
          } text-2xl hover:text-primary hover:cursor-pointer`}
        />
      </button>
      <p className="text-lg font-bold">{props.comment.net_vote_count}</p>
      <button
        onClick={voteHandler}
        data-comment_owned_by_current_user={props.comment.owner_is_user}
        data-comment={props.comment.id}
        data-user_vote={props.comment.user_vote}
        data-direction={0}
        className="button"
      >
        <FaAngleDown
          className={`${
            props.comment.user_vote === false ? "text-primary" : ""
          } text-2xl hover:text-primary hover:cursor-pointer`}
        />
      </button>
    </div>
  );
}

export default CommentVoting;
