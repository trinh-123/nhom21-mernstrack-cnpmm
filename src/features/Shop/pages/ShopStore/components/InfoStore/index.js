import React from "react";
import { Col } from "reactstrap";
import Achieve from "./components/Achieve";
import "./index.scss";

export default function InfoStore() {
  return (
    <div className="info-store">
      <Col xs={6}>
        <Achieve />
      </Col>
      <Col xs={6}>
        <Achieve />
      </Col>
    </div>
  );
}
