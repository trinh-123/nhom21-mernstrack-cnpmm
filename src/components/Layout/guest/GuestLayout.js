import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

function GuestLayout(props) {
  return (
    <div>
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}

GuestLayout.propTypes = {};

export default GuestLayout;
