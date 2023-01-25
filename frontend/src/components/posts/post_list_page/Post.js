import PostInfo from "./PostInfo";
import { useEffect, useState } from "react";

function Post(props) {
  const [postLoaded, setPostLoaded] = useState(false);
  const delay = props.index * 150;

  useEffect(() => {
    setTimeout(() => {
      setPostLoaded(true);
    }, delay);
  }, [delay]);

  return (
    <div
      className={`${
        postLoaded ? "opacity-1" : "translate-y-20 opacity-0"
      } flex w-full rounded-md overflow-hidden relative bg-lightBackground p-3 transition duration-500`}
    >
      {/* <PostVoting post={props.post}></PostVoting> */}
      <PostInfo post={props.post} />
    </div>
  );
}

export default Post;
