import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "./index.scss";
import { Checkbox } from "@material-ui/core";
export default class CheckBoxDelivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valuePriceDelivery: 11,
      stateCheckA: true,
      stateCheckB: false,
    };
    this.handleChangeA = this.handleChangeA.bind(this);
    this.handleChangeB = this.handleChangeB.bind(this);
  }

  handleChangeA() {
    this.setState({
      valuePriceDelivery: 11,
      stateCheckB: false,
      stateCheckA: true,
    });
    this.props.onChangeFee(11);
  }
  handleChangeB() {
    this.setState({
      valuePriceDelivery: 23,
      stateCheckA: false,
      stateCheckB: true,
    });
    this.props.onChangeFee(23);
  }

  render() {
    //const { categories } = this.props;
    console.log("valueprice", this.state.valuePriceDelivery);
    return (
      <div className="CheckBoxMain">
        <div className="leftCheckBox">
          <Card>
            <CardContent>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.stateCheckA}
                    onChange={this.handleChangeA}
                    style={{ color: "#ff5e00" }}
                    name="checkedA"
                  />
                }
                label="11.000 ₫"
              />
              <br></br>
              <span>Giao hàng tiêu chuẩn</span>
              <br></br>
              <span>Nhận vào: 1-3 ngày sau</span>
            </CardContent>
          </Card>
        </div>
        <div className="rightCheckBox">
          <Card>
            <CardContent>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.stateCheckB}
                    onChange={this.handleChangeB}
                    style={{ color: "#ff5e00" }}
                    name="checkedB"
                  />
                }
                label="23.000 ₫"
              />
              <br></br>
              <span>Giao hàng hỏa tốc</span>
              <br></br>
              <span>Nhận vào: 1 ngày sau</span>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}
