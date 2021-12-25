import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import ShirtCard from "../../../../../../components/ShirtCard/ShirtCard";
import "./index.scss";

export default class ProductBestSold extends Component {
  render() {
    const shirts = this.props;
    return (
      <div className="product-store">
        <Row>
          {shirts.shirts.data.map((item) => (
            <Col xs={3} key={item._id}>
              <ShirtCard shirt={item} size="small" />
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}
