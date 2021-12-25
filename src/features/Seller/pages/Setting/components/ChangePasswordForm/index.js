import { Button, Grid } from "@material-ui/core";
import { FastField, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React, { Component } from "react";
import * as Yup from "yup";
import InputField from "../../../../../../components/custom-field/InputField/index";
import { getUserId } from "../../../../../../untils/auth";
class ForgotForm extends Component {
  static propTypes = {
    prop: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.initialValues = {
      userId: getUserId(),
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    this.validationSchema = Yup.object().shape({
      oldPassword: Yup.string().required("Vui lòng không để trống."),
      newPassword: Yup.string().required("Vui lòng không để trống."),
      confirmPassword: Yup.string().required("Vui lòng không để trống."),
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
                name="oldPassword"
                component={InputField}
                label="Mật khẩu cũ"
                type="password"
              />
              <FastField
                category="text_sign"
                name="newPassword"
                component={InputField}
                label="Mật khẩu mới"
                type="password"
              />
              <FastField
                category="text_sign"
                name="confirmPassword"
                component={InputField}
                label="Xác nhận mật khẩu"
                type="password"
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
                    Xác nhận
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

export default ForgotForm;
