import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import userApi from "../../../../api/userApi";
import AvatarImg from "../../../../assets/images/store_img.png";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import "./index.scss";
import { Button } from "reactstrap";

export default function Follows() {
  const [follows, setFollows] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await userApi.getFollows();
      console.log("resq", response);
      setFollows(response.follows);
    })();
    return () => {
      // cleanup
    };
  }, []);
  const handleDeleteFollow = (id) => {
    (async function () {
      let params = {
        sellerID: id,
      };
      const response = await userApi.deleteFollow(params);
      if (response.success) {
        setFollows(response.follows);
      }
      console.log("abc", id);
    })();
  };
  const renderShirts = () => {
    if (follows.length) {
      return follows.map((follow) => (
        <Col xs={3}>
          <div className="avatar-store">
            <img
              className="avatar"
              src={follow.avatar ? follow.avatar : AvatarImg}
              alt="avatar"
            />
            <p>
              Đi đến cửa hàng:
              <Link to={`/shop/store/${follow.sellerId}`}>{follow.name}</Link>
            </p>
            <Button onClick={() => handleDeleteFollow(follow.sellerId)}>
              Xóa
            </Button>
          </div>
        </Col>
      ));
    } else {
      return (
        <h3 className="notification">
          Chưa có sản phẩm trong danh sách yêu thích.
        </h3>
      );
    }
  };

  return (
    <div className="content">
      <Row>{renderShirts()}</Row>
    </div>
  );
}
