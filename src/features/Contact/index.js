import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import ContactS from "../Contact/page/ContactPage/index";
import GuestLayout from "../../components/Layout/guest/GuestLayout.js";

function Contact(props) {
  const match = useRouteMatch();
  return (
    <GuestLayout>
      <Switch>
        <Route exact path={`${match.url}/`} component={ContactS} />
        {/* <Redirect exact from={match.url} to="/" /> */}
      </Switch>
    </GuestLayout>
  );
}

Contact.propTypes = {};

export default Contact;
