import React from "react";
import { Row, Col } from "reactstrap";
import Comment from "../../../ShopStore/components/ReviewStore/components/Comment/index";
import { connect } from "react-redux";
import "./FeedBack.scss";
import Rating from "@material-ui/lab/Rating";

function FeedBack(props) {
  const arrRating = [];
  const countArr = [0, 0, 0, 0, 0];
  props.commentsProduct.forEach((element) => {
    arrRating.push(element.rating);
    if (element.rating === 1) {
      countArr[0]++;
    }
    if (element.rating === 2) {
      countArr[1]++;
    }
    if (element.rating === 3) {
      countArr[2]++;
    }
    if (element.rating === 4) {
      countArr[3]++;
    }
    if (element.rating === 5) {
      countArr[4]++;
    }
  });
  const sum = arrRating.reduce((partial_sum, a) => partial_sum + a, 0);
  return (
    <div className="review-store">
      <h5 className="mb-4">Nhận xét từ khách hàng:</h5>
      <Row>
        <Col xs={6}>
          <div>
            {arrRating.length > 0 ? (
              <span style={{ fontSize: "48px" }}>
                {Math.round((sum / arrRating.length) * 10) / 10}
              </span>
            ) : (
              <span style={{ fontSize: "48px" }}>0</span>
            )}
            <span style={{ fontSize: "32px", color: "#9e9e9e" }}>/5</span>
          </div>
          <Rating
            name="half-rating-read"
            value={sum / arrRating.length}
            size="large"
            precision={0.5}
            readOnly
          />
          <p>{arrRating.length} Đánh giá</p>
        </Col>
        <Col xs={6}>
          <ul>
            <li>
              <Rating name="half-rating-read" value={1} readOnly />
              <span className="count">{countArr[0]} </span>
            </li>
            <li>
              <Rating name="half-rating-read" value={2} readOnly />
              <span className="count">{countArr[1]} </span>
            </li>
            <li>
              <Rating name="half-rating-read" value={3} readOnly />
              <span className="count">{countArr[2]} </span>
            </li>
            <li>
              <Rating name="half-rating-read" value={4} readOnly />
              <span className="count">{countArr[3]} </span>
            </li>
            <li>
              <Rating name="half-rating-read" value={5} readOnly />
              <span className="count">{countArr[4]} </span>
            </li>
          </ul>
        </Col>
      </Row>
      {props.commentsproduct.map((comment) => (
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
  commentsProduct: state.user.commentsProduct,
});

export default connect(mapStateToProps, null)(FeedBack);
