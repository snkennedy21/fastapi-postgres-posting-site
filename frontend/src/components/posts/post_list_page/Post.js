import PostVoting from "../PostVoting";
import PostInfo from "./PostInfo";

function Post(props) {
  return (
    <div className="flex border-primary border-2 border-solid rounded-md overflow-hidden relative bg-white">
      <PostVoting post={props.post}></PostVoting>
      <PostInfo post={props.post} />
    </div>
  );
}

export default Post;
