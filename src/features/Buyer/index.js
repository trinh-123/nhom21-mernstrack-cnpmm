import React from "react";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import SettingsIcon from "@material-ui/icons/Settings";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import SellerLayout from "../../components/Layout/seller/SellerLayout";
import Account from "../Seller/pages/Account/Account";
import Setting from "../Seller/pages/Setting/Setting";
import Orders from "./page/Orders";
import Favorite from "./page/Favorites";
import OrdersDetail from "../../components/OrdersDetail";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Follow from "./page/Follows";
const pages = [
  {
    title: "Tài khoản",
    href: "/buyer/account",
    icon: <AccountBoxIcon />,
  },
  {
    title: "Cửa hàng theo dõi",
    href: "/buyer/follows",
    icon: <StorefrontIcon />,
  },
  {
    title: "Danh sách yêu thích",
    href: "/buyer/favorites",
    icon: <FavoriteIcon />,
  },
  {
    title: "Đơn đặt hàng",
    href: "/buyer/orders",
    icon: <ShoppingBasketIcon />,
  },
  {
    title: "Trò Chuyện",
    href: "/user/chat",
    icon: <QuestionAnswerIcon />,
  },
  {
    title: "Cài đặt",
    href: "/buyer/setting",
    icon: <SettingsIcon />,
  },
];

function Buyer(props) {
  const match = useRouteMatch();
  return (
    <SellerLayout pages={pages}>
      <Switch>
        <Redirect exact from={match.url} to="/buyer/account" />

        <Route exact path={`${match.url}/account`} component={Account} />
        <Route exact path={`${match.url}/follows`} component={Follow} />
        <Route exact path={`${match.url}/favorites`} component={Favorite} />
        <Route exact path={`${match.url}/orders`} component={Orders} />
        <Route
          exact
          path={`${match.url}/orders/detail/:id_orders`}
          component={OrdersDetail}
        />
        <Route exact path={`${match.url}/setting`} component={Setting} />
      </Switch>
    </SellerLayout>
  );
}

export default Buyer;
