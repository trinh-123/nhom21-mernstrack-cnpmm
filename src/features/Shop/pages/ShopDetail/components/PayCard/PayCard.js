import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Button } from "reactstrap";
import "./PayCard.scss";

export default class PayCard extends Component {
  static propTypes = {
    availableQuantity: PropTypes.number,
    price: PropTypes.number,
  };
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      size: "",
    };
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSub = this.handleSub.bind(this);
  }

  handleSub() {
    this.setState((state, props) => ({
      quantity: state.quantity - 1 < 1 ? 1 : state.quantity - 1,
    }));
  }
  handleAdd() {
    this.setState((state, props) => ({
      quantity:
        state.quantity + 1 > props.shirt.quantity - props.shirt.quantitysold
          ? props.shirt.quantity - props.shirt.quantitysold
          : state.quantity + 1,
    }));
  }
  handleChange = (event) => {
    this.setState({ size: event.target.value });
  };

  render() {
    const { quantity, size } = this.state;
    const { shirt } = this.props;
    return (
      <Card className="PayCard">
        <CardContent className="content">
          <Typography className="quantity" color="textSecondary" gutterBottom>
            Số lượng còn lại: {shirt.quantity - shirt.quantitysold}
          </Typography>
          <Divider />
          <div className="action">
            <h5 className="priceLabel">Giá bán: {shirt.price}.000 vnđ</h5>
            <div className="wrapper">
              <p>Số lượng mua: </p>
              <div className="actionQuantity">
                <div className="btn_cal" onClick={this.handleSub}>
                  <RemoveCircleIcon />
                </div>
                <div className="quantity">{quantity}</div>
                <div className="btn_cal" onClick={this.handleAdd}>
                  <AddCircleIcon />
                </div>
              </div>
              {shirt.parentcategoryID === "60507c6e89323c1f3c905655" ? (
                <div>
                  <p>
                    Size:
                    <select
                      value={this.state.size}
                      onChange={this.handleChange}
                    >
                      <option value="XXL">XXL</option>
                      <option value="XL">XL</option>
                      <option value="L">L</option>
                      <option value="M">M</option>
                      <option value="S">S</option>
                    </select>
                  </p>
                </div>
              ) : (
                shirt.parentcategoryID === "605094599026001c60ab9919" ?(<div>
                  <p>
                    Size:
                    <select
                      value={this.state.size}
                      onChange={this.handleChange}
                    >
                      <option value="43">43</option>
                      <option value="42">42</option>
                      <option value="41">41</option>
                      <option value="40">40</option>
                      <option value="39">39</option>
                      <option value="38">38</option>
                    </select>
                  </p>
                </div>):(<div></div>)
                
              )}
            </div>
          </div>

          <Divider />
          <div className="cartd">
            {shirt.quantity - shirt.quantitysold > 0 ? (
            
              <Button
                outline
                style={{ backgroundColor: "#ff5e00" }}
                onClick={(size==""&& shirt.parentcategoryID=="60507c6e89323c1f3c905655") ?
                (e) => this.props.handleAddToCart(e, quantity, "XXL") : ((size==""&& shirt.parentcategoryID=="605094599026001c60ab9919")? (e) => this.props.handleAddToCart(e, quantity, "43"):(e) => this.props.handleAddToCart(e, quantity, size))}
              >
                Thêm vào giỏ hàng
              </Button>
            ) : (
              <Button outline style={{ backgroundColor: "#ff5e00" }} disabled>
                Sản phẩm đã hết hàng
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
}
