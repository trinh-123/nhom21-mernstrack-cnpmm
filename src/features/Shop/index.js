import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import ShopList from "./pages/ShopList";
import ShopDetail from "./pages/ShopDetail";
import GuestLayout from "../../components/Layout/guest/GuestLayout.js";
import ShopStore from "./pages/ShopStore";
import SearchProduct from "./pages/SearchProduct/SearchProduct";
function Shop(props) {
  const match = useRouteMatch();
  return (
    <GuestLayout>
      <Switch>
        <Route exact path={`${match.url}/search`} component={SearchProduct} />
        <Route exact path={`${match.url}/:id_parent`} component={ShopList} />
        <Route
          exact
          path={`${match.url}/detail/:id_shirt`}
          component={ShopDetail}
        />
        <Route
          exact
          path={`${match.url}/store/:id_store`}
          component={ShopStore}
        />
        {/* <Route exact path={`${match.url}/cart`} component={Cart} /> */}
      </Switch>
    </GuestLayout>
  );
}

Shop.propTypes = {};

export default Shop;
