import CheckBoxIcon from "@material-ui/icons/CheckBox";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import "./index.scss";

function CartItem(props) {
  const [quantityTemp, setQuantityTemp] = useState(props.cartItem.amount);
  const [visible] = useState(false);

  const handleSub = () => {
    let temp = quantityTemp - 1 < 1 ? 1 : quantityTemp - 1;
    setQuantityTemp(temp);
  };
  const handleAdd = () => {
    let limit =
      props.cartItem.productID.quantity - props.cartItem.productID.quantitysold;

    let temp = quantityTemp + 1 > limit ? limit : quantityTemp + 1;
    setQuantityTemp(temp);
  };

  return (
    <div className="cart-item" hidden={visible}>
      <Row>
        <Col xs={2}>
          <img
            className="image"
            src={props.cartItem.productID.images}
            alt="img"
          />
        </Col>
        <Col xs={4}>
          <div className="info">
            <Link
              className="title"
              to={`/shop/detail/${props.cartItem.productID._id}`}
            >
              {props.cartItem.productID.name}
            </Link>
            <p>Size:{props.cartItem.size}</p>
          </div>
        </Col>
        <Col xs={2} className="price">
          {props.cartItem.productID.price}.000<u>đ</u>
        </Col>
        <Col xs={2}>
          <div className="action-quantity">
            <div className="des action" onClick={handleSub}>
              -
            </div>
            <input type="text" className="number" value={quantityTemp} />
            <div className="inc action" onClick={handleAdd}>
              +
            </div>
          </div>
        </Col>

        <Col xs={1}>
          <div className="submit">
            <CheckBoxIcon
              onClick={(e) =>
                props.onChange(e, props.cartItem.productID._id, quantityTemp)
              }
            />
          </div>
        </Col>
        <Col xs={1}>
          <div className="del">
            <DeleteIcon
              onClick={(e) => props.onDel(e, props.cartItem.productID._id)}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
const mapStateToProps = (state) => ({ cart: state.cart.cart });
export default connect(mapStateToProps, null)(CartItem);
