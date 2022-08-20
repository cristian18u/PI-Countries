import React from "react";
import { Route } from "react-router-dom";
import CreateActivity from "./components/Activity/CreateActivity.jsx";
import CountryDetail from "./components/Country/CountryDetail.jsx";
import Home from "./components/Home/Home.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Navbar from "./components/Navbar/NavBar.jsx";

function App() {
  return (
    <React.Fragment>
      <Route exact path={"/"} component={LandingPage} />
      <Route path={"/home"} component={Navbar} />
      <Route path={"/activity"} component={Navbar} />
      <Route exact path={"/home"} component={Home} />
      <Route path={"/country/:id"} component={CountryDetail} />
      <Route path={"/activity"} component={CreateActivity} />
    </React.Fragment>
  );
}

export default App;
