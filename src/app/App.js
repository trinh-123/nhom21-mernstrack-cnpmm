import React, { Suspense } from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme";
import PageLoading from "../components/PageLoading";
const Home = React.lazy(() => import("../features/Home"));
const NotFound = React.lazy(() => import("../components/NotFound"));
const User = React.lazy(() => import("../features/User"));
const Buyer = React.lazy(() => import("../features/Buyer"));
const Seller = React.lazy(() => import("../features/Seller"));
const Admin = React.lazy(() => import("../features/Admin"));
const Shop = React.lazy(() => import("../features/Shop"));
const Contact = React.lazy(() => import("../features/Contact"));
const About = React.lazy(() => import("../features/About/index"));
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<PageLoading/>}>
        <BrowserRouter>
          <Switch>
            <Route component={Shop} path="/shop" />
            <Route component={About} path="/about" />
            <Route component={Buyer} path="/buyer" />
            <Route component={Admin} path="/admin" />
            <Route component={Seller} path="/seller" />
            <Route component={Contact} path="/contact" />
            <Route component={User} path="/user" />
            <Route component={Home} path="/" exact />
            <Route component={NotFound} path="*" exact />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
