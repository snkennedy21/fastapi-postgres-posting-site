import PostInfo from "./PostInfo";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Post(props) {
  const [postLoaded, setPostLoaded] = useState(false);
  const delay = props.index * 150;
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setPostLoaded(true);
    }, delay);
  }, [delay]);

  function viewPostDetailHandler(e) {
    navigate(`/posts/${props.post.id}`);
  }

  return (
    <div
      className={`${
        postLoaded ? "opacity-1" : "translate-y-20 opacity-0"
      } transition duration-500`}
    >
      <div
        className={`flex w-full border-b-solid border-b border-b-border overflow-hidden relative p-3 transition hover:bg-extraExtraLightGrey hover:cursor-pointer`}
        onClick={viewPostDetailHandler}
      >
        {/* <PostVoting post={props.post}></PostVoting> */}
        <PostInfo post={props.post} />
      </div>
    </div>
  );
}

export default Post;
