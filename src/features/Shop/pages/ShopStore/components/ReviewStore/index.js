import React from "react";
import { Row, Col } from "reactstrap";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import AddComment from "./components/AddComment";
import Comment from "./components/Comment";
import userApi from "../../../../../../api/userApi";
import { setComments } from "../../../../../../actions/user";
import "./index.scss";
import { isLogin } from "../../../../../../untils/auth";

function ReviewStore(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleComment = (e, content) => {
    let body = {
      content,
      author: "demo",
      rating: 4,
      sellerID: props.idStore,
    };
    if (!isLogin()) {
      history.push("/user/login");
    }
    (async () => {
      try {
        const response = await userApi.comment(body);
        console.log("res", response);
        if (response.success) {
          let action = await setComments(response.comments);
          dispatch(action);
        }
      } catch (error) {
        console.log(`failed post comments as ${error}`);
      }
    })();
  };
  return (
    <div className="review-store">
      <h5 className="mb-4">Nhận xét từ khách hàng:</h5>
      <Row>
        <Col xs={12}>
          <AddComment handleComment={handleComment} />
        </Col>
      </Row>
      {props.comments.map((comment) => (
        <Row>
          <Col xs={12}>
            <Comment comment={comment} />
          </Col>
        </Row>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  comments: state.user.comments,
});

export default connect(mapStateToProps, null)(ReviewStore);
