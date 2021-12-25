import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import ShirtCard from "../../../../../../components/ShirtCard/ShirtCard";
import "./SimilarProduct.scss";

export default class SimilarProducts extends Component {
  render() {
    const shirts = this.props;
    return (
      <div className="similar-products">
        <h3>Sản phẩm tương tự</h3>
        <Row>
          {shirts.shirts.map((item) => (
            <Col className="item" xs={3} key={item._id}>
              <ShirtCard type="newTab" shirt={item} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
