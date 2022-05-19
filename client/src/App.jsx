import React from "react";
import { Route } from "react-router-dom";
import CountryDetail from "./components/country/CountryDetail.jsx";
import CreateActivity from "./components/activity/CreateActivity";
import Home from "./components/Home.jsx";
import Nav from "./components/Nav.jsx";

function App() {
  return (
    <React.Fragment>
      <Nav />
      <Route exact path={"/"} component={Home} />
      <Route path={"/country/:id"} component={CountryDetail} />
      <Route path={"/activity"} component={CreateActivity} />
    </React.Fragment>
  );
}

export default App;
