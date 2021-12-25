import React from "react";
import PropTypes from "prop-types";
import { Formik, Form, FastField } from "formik";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as Yup from "yup";
import { Button, Grid } from "@material-ui/core";
import { Container, Row, Col } from "reactstrap";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import InputField from "../../../../components/custom-field/InputField";
import SelectField from "../../../../components/custom-field/SelectField";
import { TYPE_REGISTER } from "../../../../constants/options";
import "./RegisterForm.scss";
class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.initialValues = {
      email: "",
      password: "",
      address: "",
      name: "",
      phone: "",
      groupid: 1,
    };
    this.validationSchema = Yup.object().shape({
      //confirm_password: Yup.string().required("Vui lòng không để trống."),
      email: Yup.string()
        .email("Không đúng định dạng của email.")
        .required("Vui lòng không để trống."),
      password: Yup.string().required("Vui lòng không để trống."),
      address: Yup.string().required("Vui lòng không để trống."),
      name: Yup.string().required("Vui lòng không để trống."),
      phone: Yup.string().required("Vui lòng không để trống."),
      groupid: Yup.number().required("Vui lòng không để trống"),
    });
  }
  render() {
    const { handleSubmit } = this.props;

    return (
      <Formik
        initialValues={this.initialValues}
        validationSchema={this.validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => {
          // do something

          return (
            <Form className="form register-form">
              <Container>
                <Row>
                  <Col xs={12}>
                    <FastField
                      category="text_sign"
                      name="email"
                      component={InputField}
                      label="Địa chỉ email"
                      type="email"
                    />
                  </Col>
                  <Col xs={12}>
                    <FastField
                      category="text_sign"
                      name="password"
                      component={InputField}
                      label="Mật khẩu"
                      type="password"
                    />
                  </Col>
                  <Col xs={12}>
                    <FastField
                      category="text_sign"
                      name="address"
                      component={InputField}
                      label="Địa chỉ"
                      type="text"
                    />
                  </Col>
                  <Col xs={12}>
                    <FastField
                      category="text_sign"
                      name="name"
                      component={InputField}
                      label="Tên"
                      type="text"
                    />
                  </Col>
                  <Col xs={12}>
                    <FastField
                      category="text_sign"
                      name="phone"
                      component={InputField}
                      label="Số điện thoại"
                      type="text"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <FastField
                      name="groupid"
                      component={SelectField}
                      label="Phân hệ"
                      category="sign"
                      options={TYPE_REGISTER}
                    />
                  </Col>
                  <Col xs={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className="submit"
                    >
                      Xác nhận
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}></Col>
                  <Col xs={6} className="forgot">
                    <Link
                      to="/user/login"
                      variant="body2"
                      title="Đăng nhập ngay!"
                    >
                      <LockOpenIcon />
                    </Link>
                  </Col>
                </Row>
              </Container>
              <Grid
                container
                justify={
                  this.props.success === false ? "space-between" : "flex-end"
                }
              >
                <Grid item></Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    );
  }
}
RegisterForm.propTypes = {
  handleSubmit: PropTypes.func,
};
const mapStateToProps = (state) => {
  return {
    ...state.user.register,
  };
};
export default connect(mapStateToProps)(RegisterForm);
