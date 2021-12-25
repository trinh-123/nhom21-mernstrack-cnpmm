import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import { Snackbar, Button } from "@material-ui/core";
import { connect } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import Alert from "@material-ui/lab/Alert";
import userApi from "../../../../api/userApi";
import "./RatingForm.scss";

class RatingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAlert: false,
      content: "Loading...",
      type: "info",
      star: 2.5,
      contentRating: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.receiveStar = this.receiveStar.bind(this);
    this.receiveContentRating = this.receiveContentRating.bind(this);
  }
  handleSubmit() {
    this.setState({ openAlert: true });
    (async () => {
      try {
        let body = {
          content: this.state.contentRating,
          author: "demo",
          rating: this.state.star,
          productID: this.props.idProduct,
          orderID: this.props.idOrder,
        };
        const response = await userApi.commentProduct(body);
        console.log(response);
        if (response.success) {
          this.setState({
            openAlert: true,
            content: "Phản hồi thành công. Cảm ơn bạn đã mua sản phẩm.",
            type: "success",
          });
        }
        window.location.reload();
      } catch (error) {
        console.log(`failed post register as ${error}`);
      }
    })();
  }
  receiveStar(event, newValue) {
    this.setState({
      star: newValue,
    });
  }
  receiveContentRating(event) {
    this.setState({
      contentRating: event.target.value,
    });
  }
  render() {
    console.log("porp", this.props);
    return (
      <div className="add-comment">
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <h3>Đánh giá sao *</h3>
            <Rating
              name="half-rating"
              value={this.state.star}
              onChange={this.receiveStar}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <div className="input">
              <input
                value={this.state.contentRating}
                type="text"
                onChange={this.receiveContentRating}
                placeholder="Đăng lên nhận xét của bạn ..."
              />
            </div>
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
            <Button
              color="primary"
              type="submit"
              variant="contained"
              onClick={this.handleSubmit}
            >
              Xác nhận
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
              severity="success"
            >
              {this.state.content}
            </Alert>
          </Snackbar>
        </Grid>
      </div>
    );
  }
}
export default connect(null, null)(RatingForm);
