import React from "react";

import AvatarImg from "../../../../../../assets/images/store_img.png";
import "./index.scss";

export default function AvatarStore(props) {
  console.log(props);
  return (
    <div className="avatar-store">
      <img
        className="avatar"
        src={props.seller.avatar ? props.seller.avatar : AvatarImg}
        alt="avatar"
      />
      <p>
        Cửa hàng từ: <b>{props.seller.name}</b>
      </p>
    </div>
  );
}
