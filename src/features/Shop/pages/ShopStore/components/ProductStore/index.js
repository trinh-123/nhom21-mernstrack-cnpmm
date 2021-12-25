import React from "react";
import { Col, Row } from "reactstrap";
import Pagination from "@material-ui/lab/Pagination";

import ShirtCard from "../../../../../../components/ShirtCard/ShirtCard";
import "./index.scss";

export default function ProductStore(props) {
  return (
    <div className="product-store">
      <Row>
        {props.shirtsStore.docs.map((shirt) => (
          <Col xs={3}>
            <ShirtCard shirt={shirt} size="small" />
          </Col>
        ))}
      </Row>
      <Row className="mt-5">
        <Col sm={{ size: 6, offset: 4 }}>
          <Pagination
            count={props.shirtsStore.pages}
            color="secondary"
            onChange={props.onChangePagination}
          />
        </Col>
      </Row>
    </div>
  );
}
