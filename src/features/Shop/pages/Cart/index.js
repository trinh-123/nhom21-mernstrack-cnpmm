import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";
import { connect } from "react-redux";
import cartApi from "../../../../api/cartApi";
import { getCartDetails } from "../../../../actions/user";
import Payment from "./components/Payment";
import CheckBoxDelivery from "./components/CheckBoxDelivery";
import _ from "lodash";
import "./index.scss";
import { setCart } from "../../../../actions/cart";
import store from "../../../../app/store";
import { getUserId } from "../../../../untils/auth";
import CartItem from "./components/CartItem";

class Cart extends Component {
  async componentDidMount() {
    let userID = getUserId();
    console.log(userID);
    const response = await cartApi.get();
    store.dispatch(getCartDetails(response));
  }

  onDel(e, productID) {
    (async () => {
      try {
        let params = {
          productID,
        };
        const response = await cartApi.remove(params);
        let action = setCart(response.data);
        store.dispatch(action);
      } catch (error) {
        console.log(`failed remove cart api as ${error}`);
      }
    })();
  }

  onChange(e, productID, amount) {
    (async () => {
      try {
        let params = {
          productID,
          amount,
        };
        const response = await cartApi.update(params);
        let action = setCart(response.data);
        store.dispatch(action);
      } catch (error) {
        console.log(`failed update cart as ${error}`);
      }
    })();
  }
  onChangeFee(fee) {
    (async () => {
      try {
        let params = {
          fee,
        };
        const response = await cartApi.updateFeeDelivery(params);
        console.log("fee", response);
        let action = setCart(response.data);
        store.dispatch(action);
      } catch (error) {
        console.log(`failed update cart as ${error}`);
      }
    })();
  }

  render() {
    const { cart } = this.props;
    let cartItemArray;
    console.log("cart", cart);
    if (!_.isEmpty(cart) && cart.totalPrice !== 0) {
      const productListA = cart.productList;
      console.log("a", productListA);
      cartItemArray = productListA.map((item) => {
        return (
          <Row>
            <Col>
              <CartItem
                cartItem={item}
                onDel={this.onDel}
                onChange={this.onChange}
              />
            </Col>
          </Row>
        );
      });
    } else {
      cartItemArray = (
        <h3 className="notification">Chưa có sản phẩm trong giỏ hàng.</h3>
      );
    }
    return (
      <div className="cart">
        <Container>
          <Row>
            <Col xs={8}>
              {cartItemArray}
              <CheckBoxDelivery onChangeFee={this.onChangeFee} />
            </Col>
            <Col xs={4}>
              <Payment />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getCartDetails: (cart) => dispatch(getCartDetails(cart)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
