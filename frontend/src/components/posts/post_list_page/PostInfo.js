import React from "react";
import profile from "../../../images/profile.jpg";
import { FaCommentAlt, FaThumbsUp } from "react-icons/fa";

function PostInfo(props) {
  console.log(props.post.owner.photo_url);
  return (
    <div className="flex flex-col w-full">
      <div>
        <div className="flex gap-2">
          <img
            className="rounded-full w-14 h-14"
            alt={props.post.owner.username}
            src={
              props.post.owner.photo_url === undefined
                ? profile
                : props.post.owner.photo_url
            }
          />
          <div>
            <div className="flex gap-1 items-center">
              <p className="text-black">{props.post.owner.username}</p>
              <span className="text-textGrey text-xs">•</span>
              <p className="text-textGrey">Time</p>
            </div>
            <h2 className="text-3xl font-medium">{props.post.title}</h2>
            <p>{props.post.content}</p>
            <div className="flex gap-4 text-sm text-textGrey pt-3">
              <div className="flex items-center gap-1 text-sm">
                <FaCommentAlt /> {props.post.num_comments}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <FaThumbsUp /> {props.post.net_vote_count}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

export default PostInfo;
