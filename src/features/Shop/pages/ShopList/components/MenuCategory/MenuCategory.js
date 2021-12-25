import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { NavLink } from "react-router-dom";
import Thum2 from "../../../../../../assets/images/thum2.png";
import Thum3 from "../../../../../../assets/images/thum3.png";
import Thum4 from "../../../../../../assets/images/thum4.png";
import Thum7 from "../../../../../../assets/images/thum7.png";
import "./MenuCategory.scss";
export default class MenuCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parentId: "",
    };
    this.handleChange = this.handleChange.bind(props);
  }
  handleChange = (data) => {
    this.props.onChangeParentId(data);
  };
  render() {
    if (this.props.id !== this.props.propId) {
      this.handleChange(this.props.propId);
    }
    return (
      <Card>
        <CardContent>
          <Typography className="title" color="textSecondary" gutterBottom>
            Danh mục sản phẩm
          </Typography>
          <Divider />
          <div className="MenuCategory">
            <ul>
              <li>
                <NavLink
                  exact
                  to={`/shop/${"60507c6e89323c1f3c905655"}`}
                  className="item"
                  activeClassName="item--active"
                >
                  <img src={Thum3} alt="logo"></img>
                  Áo thi đấu bóng đá
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to={`/shop/${"605094599026001c60ab9919"}`}
                  className="item"
                  activeClassName="item--active"
                >
                  <img src={Thum2} alt="logo"></img>
                  Giày thi đấu
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to={`/shop/${"605094d29026001c60ab991a"}`}
                  className="item"
                  activeClassName="item--active"
                >
                  <img src={Thum4} alt="logo"></img>
                  Bóng thi đấu
                </NavLink>
              </li>
              <li>
                <NavLink
                  exact
                  to={`/shop/${"605094f19026001c60ab991b"}`}
                  className="item"
                  activeClassName="item--active"
                >
                  <img src={Thum7} alt="logo"></img>
                  Phụ kiện thể thao
                </NavLink>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }
}
