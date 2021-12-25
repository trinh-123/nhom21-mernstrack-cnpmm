import React, { Component } from "react";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { Grid } from "@material-ui/core";
import { Snackbar, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import InputField from "../../../components/custom-field/InputField";
import userApi from "../../../api/userApi";
class ContactForm extends Component {
  // static propTypes = {
  //     prop: PropTypes,
  // };
  constructor(props) {
    super(props);
    this.state = {
      openAlert: false,
      content: "Loading ...",
      type: "info",
    };
    this.initialValues = {
      name: "",
      email: "",
      phone: "",
      address: "",
      content: "",
    };
    this.validationSchema = Yup.object().shape({
      name: Yup.string().required("Vui lòng không để trống."),
      email: Yup.string().required("Vui lòng không để trống."),
      phone: Yup.number().required("Vui lòng không để trống"),
      address: Yup.string().required("Vui lòng không để trống."),
      content: Yup.string().required("Vui lòng không để trống"),
    });
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.setState({ openAlert: true });
    (async () => {
      try {
        let formData = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          address: values.address,
          content: values.content,
        };
        const response = await userApi.contact(formData);
        console.log(response);
        if (response.success) {
          this.setState({
            openAlert: true,
            content: "Gửi liên hệ thành công!",
            type: "success",
          });
        }
      } catch (error) {
        console.log(`failed post register as ${error}`);
      }
    })();
  }
  render() {
    return (
      <Formik
        initialValues={this.initialValues}
        alidationSchema={this.validationSchema}
        onSubmit={this.handleSubmit}
      >
        {(formikProps) => {
          return (
            <Form>
              <Grid container spacing={3}>
                <Grid item md={6}>
                  <Grid item md={12} xs={12}>
                    <FastField
                      category="text_thin"
                      name="name"
                      component={InputField}
                      label="Tên *"
                      type="text"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FastField
                      category="text_thin"
                      name="email"
                      component={InputField}
                      label="Email *"
                      type="text"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FastField
                      category="text_thin"
                      name="phone"
                      component={InputField}
                      label="Số điện thoại *"
                      type="number"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FastField
                      category="text_thin"
                      name="address"
                      component={InputField}
                      label="Địa chỉ *"
                      type="text"
                    />
                  </Grid>
                </Grid>
                <Grid item md={6} style={{ marginTop: "8px" }}>
                  {/* <Grid item md={12} xs={12}> */}
                  <FastField
                    category="multiple"
                    name="content"
                    component={InputField}
                    label="Nội dung *"
                    row={10}
                  />
                  {/* </Grid> */}
                </Grid>

                <Grid
                  item
                  md={12}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <Button color="primary" type="submit" variant="contained">
                    Gửi liên hệ
                  </Button>
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
                    severity={this.state.type}
                  >
                    {this.state.content}
                  </Alert>
                </Snackbar>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    );
  }
}
export default ContactForm;
