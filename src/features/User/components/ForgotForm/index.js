import { Button, Grid } from "@material-ui/core";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as Yup from "yup";
import InputField from "../../../../components/custom-field/InputField";
import "./LoginForm.scss";
class ForgotForm extends Component {
  static propTypes = {
    prop: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.initialValues = {
      email: "",
    };
    this.validationSchema = Yup.object().shape({
      email: Yup.string().required("Vui lòng không để trống."),
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

              <Grid container>
                <Grid item xs>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="submit"
                  >
                    Gửi mã đăng nhập
                  </Button>
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    ...state.user.forgot,
  };
};
export default connect(mapStateToProps)(ForgotForm);
