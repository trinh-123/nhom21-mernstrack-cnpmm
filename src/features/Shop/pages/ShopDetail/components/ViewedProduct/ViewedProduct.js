import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import ShirtCard from "../../../../../../components/ShirtCard/ShirtCard";
import "./ViewedProduct.scss";

export default class ViewedProduct extends Component {
  render() {
    const shirts = this.props;
    let arrProduct = [];
    if (shirts.shirts.length > 5) {
      for (
        var i = shirts.shirts.length - 1;
        i >= shirts.shirts.length - 5;
        i--
      ) {
        arrProduct.push(shirts.shirts[i]);
      }
    } else {
      arrProduct = shirts.shirts;
    }

    return (
      <div className="view-products">
        <h3>Sản phẩm đã xem</h3>
        <Row>
          {arrProduct.map((item) => (
            <Col className="viewed-item" xs={3} key={item._id}>
              <ShirtCard type="newTab" shirt={item.shirt} />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
