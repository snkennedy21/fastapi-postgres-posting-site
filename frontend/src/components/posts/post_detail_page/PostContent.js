import React from "react";
import DeletePost from "./DeletePost";
import UpdatePostForm from "./UpdatePostForm";

function PostContent(props) {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col px-2">
        <div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center my-1">
              <img
                className="rounded-full w-6 h-6"
                alt={`image of ${props.post.owner.username}`}
                src={props.post.owner.photo_url}
              />
              <p className="text-lg text-primary">
                {props.post.owner.username}
              </p>
            </div>
            <p className="text-textGrey">Time</p>
          </div>
        </div>
        {props.updateFormOpen ? (
          <UpdatePostForm
            title={props.post.title}
            content={props.post.content}
            id={props.post.id}
            setUpdateFormOpen={props.setUpdateFormOpen}
          />
        ) : (
          <React.Fragment>
            <h2
              data-post={props.post.post_id}
              className="text-3xl text-textWhite font-medium mb-4"
            >
              {props.post.title}
            </h2>
            <p className="text-2xl text-textGrey">{props.post.content}</p>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}

export default PostContent;
