import React, { useState } from "react";
import { Button } from "reactstrap";

import AvatarUser from "../../../../../../../../assets/images/man.svg";
import "./index.scss";

export default function AddComment(props) {
  const [contentInput, setContentInput] = useState("");
  return (
    <div className="add-comment">
      <div className="wrapper">
        <img src={AvatarUser} alt="avatar" width={50} />
        <div className="input">
          <input
            value={contentInput}
            type="text"
            onChange={(e) => setContentInput(e.target.value)}
            placeholder="Đăng lên nhận xét của bạn ..."
          />
        </div>
      </div>
      <div className="action">
        <Button
          outline
          color="primary"
          onClick={(e) => props.handleComment(e, contentInput)}
        >
          Đăng lên
        </Button>
      </div>
    </div>
  );
}
