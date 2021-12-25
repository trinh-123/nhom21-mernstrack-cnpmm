import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ForgotPage from "./pages/Forgot";
import CheckOut from "./pages/CheckOut";
import Cart from "../Shop/pages/Cart";
import Chat from "./pages/Chat";
import Momo from "./pages/Momo";
import GuestLayout from "../../components/Layout/guest/GuestLayout.js";
function User(props) {
  const match = useRouteMatch();
  return (
    <GuestLayout>
      <Switch>
        <Route exact path={`${match.url}/login`} component={LoginPage} />
        <Route exact path={`${match.url}/register`} component={RegisterPage} />
        <Route exact path={`${match.url}/forgot`} component={ForgotPage} />
        <Route exact path={`${match.url}/cart`} component={Cart} />
        <Route exact path={`${match.url}/checkout`} component={CheckOut} />
        <Route exact path={`${match.url}/chat`} component={Chat} />
        <Route exact path={`${match.url}/momo`} component={Momo} />
      </Switch>
    </GuestLayout>
  );
}

User.propTypes = {};

export default User;
