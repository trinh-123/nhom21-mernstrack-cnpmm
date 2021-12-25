import { Button, Grid, Snackbar } from "@material-ui/core";
import ErrorIcon from "@material-ui/icons/Error";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React, { Component } from "react";
import Alert from "@material-ui/lab/Alert";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import InputField from "../../../../components/custom-field/InputField";
import SelectField from "../../../../components/custom-field/SelectField";
import { TYPE_SIGN } from "../../../../constants/options";
import FacebookLogin from "../../pages/FBandGG/FacebookLogin";
import GoogleLogin from "../../pages/FBandGG/GoogleLogin";
import "./LoginForm.scss";
class LoginForm extends Component {
  static propTypes = {
    prop: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.initialValues = {
      email: "",
      password: "",
      groupid: 1,
    };
    this.validationSchema = Yup.object().shape({
      email: Yup.string().required("Vui lòng không để trống."),
      password: Yup.string().required("Vui lòng không để trống."),
      groupid: Yup.number().required("Vui lòng không để trống."),
    });
    this.state = {
      openAlert: false,
    };
  }
  render() {
    return (
      <Formik
        initialValues={this.initialValues}
        validationSchema={this.validationSchema}
        onSubmit={this.props.handleSubmit}
      >
        {(formikProps) => {
          // do something

          return (
            <Form className="form login-form">
              <FastField
                category="text_sign"
                name="email"
                component={InputField}
                label="Tên tài khoản"
                type="text"
              />
              <FastField
                category="text_sign"
                name="password"
                component={InputField}
                label="Mật khẩu"
                type="password"
              />
              <Grid container>
                <Grid item xs>
                  <FastField
                    name="groupid"
                    component={SelectField}
                    label="Phân hệ"
                    category="sign"
                    options={TYPE_SIGN}
                  />
                </Grid>
                <Grid item xs>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="submit"
                  >
                    Xác nhận
                  </Button>
                </Grid>
                <Grid container>
                  <Grid item xs>
                    <GoogleLogin />
                  </Grid>
                  <Grid item xs>
                    <FacebookLogin />
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                container
                justify={
                  this.props.success === false ? "space-between" : "flex-end"
                }
              >
                {this.props.success === false && (
                  <Grid item className="err-wrapper">
                    <ErrorIcon />{" "}
                    <span className="err-msg">{this.props.msg}</span>
                  </Grid>
                )}
                <div className="extra">
                  <Grid item xs className="item">
                    <Link
                      to="/user/forgot"
                      variant="body2"
                      title="Bạn quên mật khẩu?"
                    >
                      <HelpOutlineIcon />
                    </Link>
                  </Grid>
                  <Grid item xs className="item">
                    <Link
                      to="/user/register"
                      className="redirect-register"
                      variant="body2"
                      title="Bạn chưa có tài khoản? Đăng ký ngay!"
                    >
                      <VpnKeyIcon />
                    </Link>
                  </Grid>
                </div>
              </Grid>
              <Snackbar
                open={this.state.openAlert}
                autoHideDuration={6000}
                onClose={() => {
                  this.setState({ openAlert: false });
                }}
              >
                <Alert
                  onClose={() => {
                    this.setState({ openAlert: false });
                  }}
                  severity="warning"
                >
                  Đã đăng ký thành công. Chuyển sang Đăng nhập sau vài giây.
                </Alert>
              </Snackbar>
            </Form>
          );
        }}
      </Formik>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.user.login,
  };
};
export default connect(mapStateToProps)(LoginForm);
