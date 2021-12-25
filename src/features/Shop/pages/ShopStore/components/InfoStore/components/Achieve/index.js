import React from "react";

import Img from "../../../../../../../../assets/images/achievement.svg";
import "./index.scss";

export default function Achieve() {
  return (
    <div className="achieve">
      <img src={Img} alt="logo" width={50} />
      <div className="info">
        <b>Chứng nhận bởi TNShop</b>
        <span>Cửa hàng đã cung cấp đầy đủ giấy tờ kinh doanh</span>
      </div>
    </div>
  );
}
