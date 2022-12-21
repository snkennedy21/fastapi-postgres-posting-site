import PostVoting from "../PostVoting";
import PostInfo from "./PostInfo";

function Post(props) {
  return (
    <div className="flex rounded-md overflow-hidden relative bg-lightBackground p-3">
      {/* <PostVoting post={props.post}></PostVoting> */}
      <PostInfo post={props.post} />
    </div>
  );
}

export default Post;
