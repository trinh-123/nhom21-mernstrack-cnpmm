import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { compose } from "redux";
import { connect } from "react-redux";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { Fab, Snackbar, Toolbar } from "@material-ui/core";
import Slider from "./components/Slider/Slider";
import PayCard from "./components/PayCard/PayCard";
import MainInfo from "./components/MainInfo/MainInfo";
import SimilarProduct from "./components/SimilarProduct/SimilarProduct";
import FeedBack from "./components/FeedBack/FeedBack";
import shirtsApi from "../../../../api/shirtsApi";
import userApi from "../../../../api/userApi";
import cartApi from "../../../../api/cartApi";
import { getDetail } from "../../../../actions/shirts";
import { addToCart } from "../../../../actions/cart";
import { setCommentsProduct } from "../../../../actions/user";
import { getUserId, isLogin } from "../../../../untils/auth";
import ScrollTop from "../../../../components/ScrollTop/ScrollTop";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import "./index.scss";
import ViewedProduct from "./components/ViewedProduct/ViewedProduct";
import PageLoading from "../../../../components/PageLoading";
class ShopDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idShirt: "",
      shirtRelated: [],
      shirtViewed: [],
      commentsproduct: [],
      openAlert: false,
      contentAlert: "loading",
      typeAlert: "info",
    };
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.addToFavorite = this.addToFavorite.bind(this);
  }
  componentDidMount() {
    (async () => {
      try {
        let idShirt = this.props.match.params.id_shirt;
        this.setState({ idShirt });
        const response = await shirtsApi.getDetail(idShirt);
        let action = await getDetail(response);
        this.props.dispatch(action);
        const resByCategory = await shirtsApi.getRelatedProduct(idShirt);
        this.setState({
          shirtRelated: [...resByCategory.data],
        });
        this.setState({
          commentsproduct: response.comments,
        });
        let action2 = await setCommentsProduct(this.state.commentsproduct);
        this.props.dispatch(action2);
        if (getUserId()) {
          let params = {
            idShirt,
            idUser: getUserId(),
          };
          const resViewed = await userApi.viewed(params);
          this.setState({
            shirtViewed: [...resViewed.viewed],
          });
        }
      } catch (error) {
        console.log(`failed post register as ${error}`);
      }
    })();
  }

  handleAddToCart(e, amount, size) {
    if (!isLogin()) {
      this.props.history.push("/user/login");
      return;
    }
    let cartItem = {
      size,
      amount,
      productID: this.state.idShirt,
      userId: getUserId(),
    };

    (async () => {
      try {
        const response = await cartApi.add(cartItem);
        if (response.success) {
          let action = await addToCart(response.data[0]);
          this.props.dispatch(action);
          this.setState({
            openAlert: true,
            contentAlert:
              "Đã thêm thành công. Chuyển sang giỏ hàng để xem chi tiết.",
            typeAlert: "success",
          });
        }
      } catch (error) {
        console.log(`failed post register as ${error}`);
      }
    })();
  }
  addToFavorite() {
    if (!isLogin()) {
      this.props.history.push("/user/login");
      return;
    }
    (async () => {
      try {
        let response = await userApi.addToFavorite({
          idShirt: this.state.idShirt,
        });

        if (response.success) {
          this.setState({
            openAlert: true,
            contentAlert:
              "Đã thêm thành công. Chuyển sang Quản lí tài khoản để xem chi tiết",
            typeAlert: "success",
          });
        } else {
          this.setState({
            openAlert: true,
            contentAlert: response.msg,
            typeAlert: "error",
          });
        }
      } catch (error) {
        console.log(`failed post register as ${error}`);
      }
    })();
  }
  renderShirt(shirt) {
    return (
      <div>
        <Row>
          <Col xs={8}>
            <Row>
              <Col xs={5}>
                <Slider images={shirt.previewImgs} />
              </Col>
              <Col xs={7}>
                <MainInfo shirt={shirt} addToFavorite={this.addToFavorite} />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <FeedBack
                  shirtId={shirt._id}
                  commentsproduct={this.props.commentsProduct}
                />
              </Col>
            </Row>
          </Col>
          <Col xs={4}>
            <PayCard handleAddToCart={this.handleAddToCart} shirt={shirt} />
          </Col>
          <Col xs={12}>
            <Row>
              {this.state.shirtRelated.length && (
                <Col xs={12}>
                  <SimilarProduct shirts={this.state.shirtRelated} />
                </Col>
              )}
            </Row>
          </Col>
          <Col xs={12}>
            <Row>
              {this.state.shirtViewed.length ? (
                <Col xs={12}>
                  <ViewedProduct shirts={this.state.shirtViewed} />
                </Col>
              ) : (
                <h3></h3>
              )}
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
  renderProgress() {
    return <PageLoading/>;
  }
  render() {
    let { shirtDetail: shirt } = this.props;
    return (
      <React.Fragment>
        <Toolbar id="back-to-top-anchor" />
        <div>
          <Container className="container-fluid ShopDetail">
            {_.isEmpty(shirt) ? this.renderProgress() : this.renderShirt(shirt)}
          </Container>
          <Snackbar
            open={this.state.openAlert}
            autoHideDuration={6000}
            onClose={() => this.setState({ openAlert: false })}
          >
            <Alert
              onClose={() => this.setState({ openAlert: false })}
              severity={this.state.typeAlert}
            >
              {this.state.contentAlert}
            </Alert>
          </Snackbar>
        </div>
        <ScrollTop {...this.props}>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  shirtDetail: state.shirts.shirtDetail,
  commentsProduct: state.user.commentsProduct,
});

export default compose(withRouter, connect(mapStateToProps, null))(ShopDetail);
