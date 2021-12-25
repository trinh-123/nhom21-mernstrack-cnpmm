import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import "./CardFilterPrice.scss";
export default class CardFilterPrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valuePrice: "",
    };
    this.handlePriceChange = this.handlePriceChange.bind(this);
  }

  handlePriceChange(event) {
    this.setState({
      valuePrice: event.target.value,
    });
    this.props.onChangePrice(event.target.value);
  }

  render() {
    //const { categories } = this.props;
    return (
      <Card className="CardFilterCategory">
        <CardContent>
          <Typography className="title" color="textSecondary" gutterBottom>
            Giá sản phẩm
          </Typography>

          <Divider />
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={this.state.valuePrice}
              onChange={this.handlePriceChange}
            >
              <FormControlLabel
                value=""
                control={<Radio style={{ color: "#ff5e00" }} />}
                label="Tất cả"
                className="radio"
              />
              <FormControlLabel
                key={1}
                value="1"
                control={<Radio style={{ color: "#ff5e00" }} />}
                label="Dưới 120.000đ"
                className="radio"
              />
              <FormControlLabel
                key={2}
                value="2"
                control={<Radio style={{ color: "#ff5e00" }} />}
                label="Từ 120.000đ đến 150.000đ"
                className="radio"
              />
              <FormControlLabel
                key={3}
                value="3"
                control={<Radio style={{ color: "#ff5e00" }} />}
                label="Trên 150.000đ"
                className="radio"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    );
  }
}
