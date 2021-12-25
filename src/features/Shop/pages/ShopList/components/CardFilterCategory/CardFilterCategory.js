import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";

import "./CardFilterCategory.scss";

export default class CardFilterCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
    };
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
  }

  handleCategoryChange(event) {
    this.setState({
      category: event.target.value,
    });
    this.props.onChangeCategory(event.target.value);
  }

  render() {
    const { categories } = this.props;
    return (
      <Card className="CardFilterCategory">
        <CardContent>
          <Typography className="title" color="textSecondary" gutterBottom>
            Loại sản phẩm
          </Typography>
          <Divider />

          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={this.state.category}
              onChange={this.handleCategoryChange}
            >
              <FormControlLabel
                value=""
                control={<Radio style={{ color: "#ff5e00" }} />}
                label="Tất cả"
                className="radio"
              />

              {categories.categories &&
                categories.categories.map((category) => (
                  <FormControlLabel
                    key={category._id}
                    value={category._id}
                    control={<Radio style={{ color: "#ff5e00" }} />}
                    label={category.name}
                    className="radio"
                  />
                ))}
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
    );
  }
}
