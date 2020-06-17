import React from "react";
import "materialize-css/dist/css/materialize.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AboutPage from "./pages/AboutPage/AboutPage";
import Navbar from "./components/Navbar/Navbar";
import MainPage from "./pages/MainPage/MainPage";
import Alerts from "./components/Alerts/Alerts";
import Basket from "./components/Basket/Basket";
import ProductPage from "./pages/ProductPage/ProductPage";
import Register from "./components/Register/Register";
import setAuthToken from "./utils/setAuthToken";
import Login from "./components/Login/Login";
import SalesPage from "./pages/SalesPage/SalesPage";

if (localStorage.tokenAuth) {
  setAuthToken(localStorage.tokenAuth);
}

const App = () => {
  return (
    <>
      <Router>
        <div className="row">
          <div
            className="col col-lg-9 col-md-12 col-sm-12 col-12 w100%"
            style={{ padding: "0" }}
          >
            <Navbar />
            <Alerts />
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/sales" component={SalesPage} />
              <Route exact path="/about" component={AboutPage} />
              <Route exact path="/registration" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/product/:id" component={ProductPage} />
            </Switch>
          </div>
          <div
            className="col col-lg-3 col-md-0 col-sm-0 col-0"
            style={{ padding: "0" }}
          >
            <Basket />
          </div>
        </div>
      </Router>
    </>
  );
};

export default App;
