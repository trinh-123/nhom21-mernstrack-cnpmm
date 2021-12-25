import React from "react";
import { Row, Col } from "reactstrap";
import GoogleMap from "../Googlemap/index";
import ContactForm from "../../components/ContactForm";
import "./index.scss";
const Contact = (props) => {
  return (
    <div className="ahead">
      <Row>
        <Col xs={6}>
          <h3>Gửi liên hệ cho chúng tôi</h3>
          <ContactForm />
        </Col>
        <Col xs={6}>
          <GoogleMap />
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
