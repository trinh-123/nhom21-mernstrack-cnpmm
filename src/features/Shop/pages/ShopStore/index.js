import React, { Component } from "react";
import { Col, Row, Button } from "reactstrap";
import { connect } from "react-redux";
import AvatarStore from "./components/AvatarStore";
import InfoStore from "./components/InfoStore";
import ReviewStore from "./components/ReviewStore";
import ProductStore from "./components/ProductStore";
import ProductBestSold from "./components/ProductBestSold";
import _ from "lodash";
import shirtsApi from "../../../../api/shirtsApi";
import userApi from "../../../../api/userApi";
import MessengerAPI from "../../../../api/messageApi";
import { setComments } from "../../../../actions/user";
import { getShirtsStore } from "../../../../actions/user";
import { isLogin, getUserId } from "../../../../untils/auth";
import IconButton from "@material-ui/core/IconButton";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import StorefrontIcon from "@material-ui/icons/Storefront";
import { compose } from "redux";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import "./index.scss";
const useStyles = (theme) => ({
  root: {},
  row: {
    height: "42px",
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
});

class ShopStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateRenderAllProduct: true,
      stateRenderBestSellProduct: false,
      seller: {},
      productBestSold: {},
      idStore: "",
      openAlert: false,
      contentAlert: "loading",
      typeAlert: "info",
    };
    this.onChangePagination = this.onChangePagination.bind(this);
    this.onChangeRenderAllProduct = this.onChangeRenderAllProduct.bind(this);
    this.onChangeRenderBestSellProduct =
      this.onChangeRenderBestSellProduct.bind(this);
    this.onClickChat = this.onClickChat.bind(this);
    this.onClickFollow = this.onClickFollow.bind(this);
  }

  onClickChat() {
    (async () => {
      console.log("Chat");
      if (!isLogin()) {
        this.props.history.push("/user/login");
      } else {
        const params = {
          id_user1: getUserId(),
          id_user2: this.props.match.params.id_store,
        };
        const query = "?" + queryString.stringify(params);

        const response = await MessengerAPI.getAllMessage(query);
        console.log("resQ", response);
        if (response.data !== null) {
          this.props.history.push("/user/chat");
        } else {
          await MessengerAPI.autoSendMessage(query);

          this.props.history.push("/user/chat");
        }
      }
    })();
  }

  onClickFollow() {
    (async () => {
      if (!isLogin()) {
        this.props.history.push("/user/login");
      } else {
        const params = {
          sellerId: this.props.match.params.id_store,
        };
        const response = await userApi.addToFollow(params);
        if (response.success) {
          this.setState({
            openAlert: true,
            contentAlert: "Đã thêm vào danh sách theo dõi!",
            typeAlert: "success",
          });
        } else {
          this.setState({
            openAlert: true,
            contentAlert: response.msg,
            typeAlert: "warning",
          });
        }
      }
    })();
  }
  componentDidMount() {
    (async () => {
      try {
        let idStore = this.props.match.params.id_store;
        this.setState({ idStore });
        let params = {
          page: 1,
          perPage: 4,
          sellerId: idStore,
        };

        const response = await shirtsApi.get(params);
        console.log("respone", response);
        const resGetUser = await userApi.getById({ ID: idStore });
        this.setState({
          seller: { ...resGetUser },
        });
        const resGetProductBestSold = await userApi.getProductBestSold(idStore);
        this.setState({
          productBestSold: { ...resGetProductBestSold },
        });
        console.log("bestsell", this.state.productBestSold);
        let action = await getShirtsStore(response);

        this.props.dispatch(action);
        //console.log("action",this.props.dispatch(action))
        this.props.dispatch(setComments(resGetUser.comments));
      } catch (error) {
        console.log(`failed post register as ${error}`);
      }
    })();
  }
  onChangePagination(e, page) {
    (async () => {
      try {
        let idStore = this.props.match.params.id_store;

        let params = {
          page: page,
          perPage: 4,
          sellerId: idStore,
        };
        const response = await shirtsApi.get(params);

        let action = await getShirtsStore(response);
        this.props.dispatch(action);

        // console.log(resDispatch);
      } catch (error) {
        console.log(`failed post register as ${error}`);
      }
    })();
  }
  onChangeRenderAllProduct() {
    this.setState({
      stateRenderAllProduct: true,
      stateRenderBestSellProduct: false,
    });
  }
  onChangeRenderBestSellProduct() {
    this.setState({
      stateRenderAllProduct: false,
      stateRenderBestSellProduct: true,
    });
  }
  render() {
    let { shirtsStore } = this.props;
    let { seller } = this.state;
    let renderProduct;
    if (this.state.stateRenderAllProduct) {
      renderProduct = _.isEmpty(shirtsStore) ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <ProductStore
            onChangePagination={this.onChangePagination}
            shirtsStore={shirtsStore}
          />
        </div>
      );
    } else {
      renderProduct = (
        <div>
          <ProductBestSold shirts={this.state.productBestSold} />
        </div>
      );
    }
    //console.log("shirtstore",shirtsStore);
    return (
      <div className="shop-store">
        <Row>
          <Col xs={3}>
            {_.isEmpty(seller) ? (
              <h1>Loading</h1>
            ) : (
              <AvatarStore seller={seller} />
            )}
            <div className="action-with-shop">
              <div className="action-chat">
                <IconButton onClick={this.onClickChat}>
                  <QuestionAnswerIcon style={{ fontSize: "40" }} />
                  <span>Trò chuyện</span>
                </IconButton>
              </div>
              <div className="action-follow">
                <IconButton onClick={this.onClickFollow}>
                  +
                  <StorefrontIcon
                    style={{ fontSize: "40", color: "#ff5e00" }}
                  />
                  <span className="text-follow">Theo dõi</span>
                </IconButton>
              </div>
            </div>
          </Col>
          <Col xs={9}>
            <Row>
              <Col>
                <InfoStore />
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="nav-item">
                  <div className="button">
                    <Button onClick={this.onChangeRenderAllProduct}>
                      Tất cả sản phẩm
                    </Button>
                  </div>
                  <div className="button2">
                    <Button onClick={this.onChangeRenderBestSellProduct}>
                      Sản phẩm bán chạy
                    </Button>
                  </div>
                </div>
                {renderProduct}
              </Col>
            </Row>
            <Row>
              <Col>
                <ReviewStore idStore={this.state.idStore} />
              </Col>
            </Row>
          </Col>
        </Row>
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
    );
  }
}
const mapStateToProps = (state) => ({
  shirtsStore: state.shirts.shirtsStore,
});

export default compose(
  withStyles(useStyles),
  withRouter,
  connect(mapStateToProps, null)
)(ShopStore);
