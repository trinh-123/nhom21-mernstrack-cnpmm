import React from "react";
import { NavLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import PeopleIcon from "@material-ui/icons/People";
import LocalPhoneIcon from "@material-ui/icons/LocalPhone";
import BarChartIcon from "@material-ui/icons/BarChart";
import "./listItem.scss";
export const mainListItems = (
  <div>
    <NavLink
      className="item-sidebar"
      to="/admin/customers"
      activeClassName="active-menu"
    >
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Người mua" />
      </ListItem>
    </NavLink>
    <NavLink
      to="/admin/sellers"
      className="item-sidebar"
      activeClassName="active-menu"
    >
      <ListItem button>
        <ListItemIcon>
          <AccessibilityIcon />
        </ListItemIcon>
        <ListItemText primary="Người bán" />
      </ListItem>
    </NavLink>
    <NavLink
      to="/admin/orders"
      className="item-sidebar"
      activeClassName="active-menu"
    >
      <ListItem button>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Đơn hàng" />
      </ListItem>
    </NavLink>
    <NavLink
      to="/admin/statistics"
      className="item-sidebar"
      activeClassName="active-menu"
    >
      <ListItem button>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Thống kê" />
      </ListItem>
    </NavLink>
    <NavLink
      to="/admin/products"
      className="item-sidebar"
      activeClassName="active-menu"
    >
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Tất cả sản phẩm" />
      </ListItem>
    </NavLink>
    <NavLink
      to="/admin/contacts"
      className="item-sidebar"
      activeClassName="active-menu"
    >
      <ListItem button>
        <ListItemIcon>
          <LocalPhoneIcon />
        </ListItemIcon>
        <ListItemText primary="Liên hệ" />
      </ListItem>
    </NavLink>
  </div>
);
