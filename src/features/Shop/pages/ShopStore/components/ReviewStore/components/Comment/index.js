import React from "react";
import moment from "moment";

import AvatarUser from "../../../../../../../../assets/images/woman.svg";
import "./index.scss";

export default function Comment(props) {
  return (
    <div className="comment">
      <img src={AvatarUser} alt="avatar" width={40} />
      <div className="info">
        <div className="author">
          <b>{props.comment.author.name}</b>{" "}
          <span>{moment(props.comment.createdAt).fromNow()}</span>
        </div>
        <p>{props.comment.content}</p>
      </div>
    </div>
  );
}
