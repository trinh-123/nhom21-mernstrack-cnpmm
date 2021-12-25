import React, { Component } from "react";
import { Formik, Form, FastField } from "formik";
import * as Yup from "yup";
import { Grid } from "@material-ui/core";
import { Snackbar, Button } from "@material-ui/core";
import { connect } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import DraggableUploader from "../../../../../../../components/imageUploader/DraggableUploader";
import InputField from "../../../../../../../components/custom-field/InputField";
import SelectField from "../../../../../../../components/custom-field/SelectField";
import userApi from "../../../../../../../api/userApi";
import { getShirtsSeller } from "../../../../../../../actions/user";
class AddShirtsForm extends Component {
  // static propTypes = {
  //     prop: PropTypes,
  // };
  constructor(props) {
    super(props);
    this.state = {
      openAlert: false,
      content: "Loading ...",
      type: "info",
      filesImg: [],
      filesPrev: [],
    };
    this.initialValues = {
      name: "",
      //author: "",
      categoryID: "",
      parentcategoryID: "",
      price: "",
      detail: "",
      quantity: 1,
    };
    this.validationSchema = Yup.object().shape({
      name: Yup.string().required("Vui lòng không để trống."),
      // author: Yup.string().required("Vui lòng không để trống."),
      //categoryID: Yup.string().required("Vui lòng không để trống"),
      price: Yup.number().required("Vui lòng không để trống"),
      quantity: Yup.number().required("Vui lòng không để trống"),
      detail: Yup.string().required("Vui lòng không để trống"),
    });
    this.handleSubmit = this.handleSubmit.bind(this);
    this.receiveFileImg = this.receiveFileImg.bind(this);
    this.receiveFilePrev = this.receiveFilePrev.bind(this);
  }

  handleSubmit(values) {
    let filesImg = this.state.filesImg;
    let filesPrev = this.state.filesPrev;
    this.setState({ openAlert: true });

    let formData = new FormData();
    formData.set("name", values.name);
    formData.set("price", values.price);
    formData.set("detail", values.detail);
    formData.set("parentcategoryID", values.parentcategoryID);
    formData.set("categoryID", values.categoryID);
    formData.set("quantity", values.quantity);
    for (let fileImg of filesImg) {
      formData.append("images", fileImg);
    }
    for (let filePrev of filesPrev) {
      formData.append("previewImgs", filePrev);
    }
    console.log(formData);
    (async () => {
      try {
        const response = await userApi.upload(formData);
        console.log(response);
        if (response.success) {
          this.setState({
            openAlert: true,
            content: "Upload thành công. Click bên ngoài khung để xem kết quả.",
            type: "success",
          });
          let res = this.props.dispatch(getShirtsSeller(response.shirts));
          console.log(res);
        }
      } catch (error) {
        console.log(`failed post register as ${error}`);
      }
    })();
  }

  receiveFileImg(files) {
    this.setState({
      filesImg: [...files],
    });
  }
  receiveFilePrev(files) {
    this.setState({
      filesPrev: [...files],
    });
  }
  render() {
    let { categories } = this.props.categories;
    let { parentcategories } = this.props.parentcategories;
    console.log("ct", categories);
    console.log("pr", parentcategories);
    let categoriesRender = [];
    categories.forEach((category) => {
      categoriesRender.push({ value: category._id, name: category.name });
    });
    let parentcategoriesRender = [];
    parentcategories.forEach((parentcategory) => {
      parentcategoriesRender.push({
        value: parentcategory._id,
        name: parentcategory.name,
      });
    });
    console.log("initial", this.initialValues);
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
                      label="Tên sản phẩm *"
                      type="text"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FastField
                      category="text_thin"
                      name="quantity"
                      component={InputField}
                      label="Số lượng bán *"
                      type="number"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FastField
                      category="text_thin"
                      name="price"
                      component={InputField}
                      label="Giá bán *"
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FastField
                      category="category_shirt"
                      name="parentcategoryID"
                      component={SelectField}
                      label="Loại sản phẩm"
                      options={parentcategoriesRender}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <FastField
                      category="category_shirt"
                      name="categoryID"
                      component={SelectField}
                      label="Loại danh mục"
                      options={categoriesRender}
                    />
                  </Grid>
                </Grid>
                <Grid item md={6} style={{ marginTop: "8px" }}>
                  {/* <Grid item md={12} xs={12}> */}
                  <FastField
                    category="multiple"
                    name="detail"
                    component={InputField}
                    label="Mô tả *"
                    row={9}
                  />
                  {/* </Grid> */}
                </Grid>
                <Grid item md={12}>
                  <Grid
                    item
                    md={12}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <DraggableUploader
                      title="Chọn ảnh bìa"
                      files={this.receiveFileImg}
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  md={12}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <DraggableUploader
                    title="Chọn ảnh chụp sách"
                    files={this.receiveFilePrev}
                  />
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
                    Đăng bán
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
                    severity="warning"
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
const mapStateToProps = (state) => ({
  categories: state.shirts.categories,
  parentcategories: state.shirts.parentcategories,
});
export default connect(mapStateToProps, null)(AddShirtsForm);
