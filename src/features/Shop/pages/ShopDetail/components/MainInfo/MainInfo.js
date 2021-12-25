import React, { Component } from "react";
import StoreIcon from "@material-ui/icons/Store";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import "./MainInfo.scss";

export default class MainInfo extends Component {
  render() {
    const { shirt } = this.props;
    return (
      <div className="MainInfo">
        <div className="main">
          <h4>{shirt.name}</h4>
          <div className="favorite">
            <FavoriteIcon fontSize="large" onClick={this.props.addToFavorite} />
          </div>
        </div>

        <div className="extra">
          <div className="des">
            <h6>Mô tả: </h6>
            <div>{shirt.detail} ...</div>
          </div>
          <div className="seller">
            <StoreIcon />
            <Link to={`/shop/store/${shirt.seller._id}`} className="store">
              <p>{shirt.seller.name}</p>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
