import React from "react";
import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import Customers from "./pages/Customers/Customers";
import Sellers from "./pages/Sellers/Sellers";
import Products from "./pages/Products/Products";
import Contacts from "./pages/Contacts/Contacts";
import AdminLayout from "../../components/Layout/admin/AdminLayout";
import Statistic from "./pages/Statistic/index";
import Order from "./pages/Orders/Orders";
import OrdersDetail from "../../components/OrdersDetail";
export default function Admin(props) {
  const match = useRouteMatch();
  return (
    <AdminLayout>
      <Switch>
        <Redirect exact from={match.url} to="/admin/customers" />

        <Route exact path={`${match.url}/customers`} component={Customers} />
        <Route exact path={`${match.url}/sellers`} component={Sellers} />
        <Route exact path={`${match.url}/orders`} component={Order} />
        <Route exact path={`${match.url}/statistics`} component={Statistic} />
        <Route exact path={`${match.url}/products`} component={Products} />
        <Route exact path={`${match.url}/contacts`} component={Contacts} />
        <Route
          exact
          path={`${match.url}/orders/detail/:id_orders`}
          component={OrdersDetail}
        />
      </Switch>
    </AdminLayout>
  );
}
