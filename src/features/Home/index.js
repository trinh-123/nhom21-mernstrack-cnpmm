import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import HomePage from "./pages/Home";
import GuestLayout from "../../components/Layout/guest/GuestLayout.js";

function Home(props) {
  const match = useRouteMatch();
  return (
    <GuestLayout>
      <Switch>
        <Route exact path={`${match.url}/`} component={HomePage} />
        {/* <Redirect exact from={match.url} to="/" /> */}
      </Switch>
    </GuestLayout>
  );
}

Home.propTypes = {};

export default Home;
