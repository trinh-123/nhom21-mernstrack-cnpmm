import React, { Component } from "react";
import { Snackbar } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Alert from "@material-ui/lab/Alert";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FindInPageIcon from "@material-ui/icons/FindInPage";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import userApi from "../../api/userApi";
import {isLogin} from "../../untils/auth";
import "./ShirtCard.scss";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
class ShirtCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openAlert: false,
      contentAlert:"",
      typeAlert: "",
    };
    this.addToFavorite =this.addToFavorite.bind(this);
    this.addToCart=this.addToCart.bind(this);
    this.detail=this.detail.bind(this);
  }
  detail(idShirt){
    this.props.history.push(`/shop/detail/${idShirt}`);
  }
  addToCart(idShirt){
    this.props.history.push(`/shop/detail/${idShirt}`);
  }
  addToFavorite(idShirt) {
    if (!isLogin()) {
      this.props.history.push("/user/login");
      return;
    }
    (async () => {
      try {
        let response = await userApi.addToFavorite({
          idShirt: idShirt,
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
  render() {
    const { size, shirt, type, handleDeleteFromFavorites } = this.props;
    const isInFavorite = handleDeleteFromFavorites !== undefined;
    const arrRating = [];
    shirt.comments.forEach((element) => {
      arrRating.push(element.rating);
    });
    const sum = arrRating.reduce((partial_sum, a) => partial_sum + a, 0);
    return (
      <Card className="ShirtCard">
        <div className="hover">
          <div className="layout">
            <Link className="icon" to="#">
              {isInFavorite ? (
                <DeleteForeverIcon
                  fontSize="large"
                  onClick={() => handleDeleteFromFavorites(shirt._id)}
                />
              ) : (
                <FavoriteIcon
                  fontSize="large"
                  onClick={() => this.addToFavorite(shirt._id)}
                />
              )}
            </Link>

            <Link className="icon" to="#">
              <ShoppingBasketIcon
                fontSize="large"
                onClick={() => this.addToCart(shirt._id)}
              />
            </Link>
            <Link className="icon" to="#">
              <FindInPageIcon
                fontSize="large"
                onClick={() => this.detail(shirt._id)}
              />
            </Link>
          </div>
          <CardMedia
            className="media"
            image={shirt.images[0]}
            title="Contemplative Reptile"
          >
            {shirt.quantity - shirt.quantitysold <= 0 ? (
              <p className="sold_out">Hết hàng</p>
            ) : (
              <h1></h1>
            )}
          </CardMedia>
        </div>

        <CardContent className={`content ${size === "small" ? "small" : ""}`}>
          <div className="title">
            <Link
              target={type === "newTab" ? "_blank" : ""}
              to={`/shop/detail/${shirt._id}`}
            >
              {shirt.name}
            </Link>
          </div>
          <div className="price">
            <span>{shirt.price}.000 đ</span>
          </div>
          <div className="rating">
            <Rating
              name="half-rating-read"
              value={sum / arrRating.length}
              size="small"
              precision={0.5}
              readOnly
            />
            <span>({arrRating.length})</span>
          </div>
        </CardContent>
        <Snackbar
          open={this.state.openAlert}
          autoHideDuration={6000}
          onClose={() => this.setState({ openAlert: false })}
        >
          <Alert
            onClose={() => this.setState({ openAlert: false })}
            severity="info"
            typeAlert={this.state.typeAlert}
          >
            {this.state.contentAlert}
          </Alert>
        </Snackbar>
      </Card>
    );
  }
}
export default compose(withRouter, connect(null, null))(ShirtCard);
