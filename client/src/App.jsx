import React from "react";
import { Route } from "react-router-dom";
import CreateActivity from "./components/Activity/CreateActivity.jsx";
import CountryDetail from "./components/CountryDetail/CountryDetail.jsx";
import Home from "./components/Home/Home.jsx";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Navbar from "./components/Navbar/NavBar.jsx";

import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

function App() {
  return (
    <React.Fragment>
      <Route path={"/"} component={Navbar} />
      <Route exact path={"/"} component={LandingPage} />
      <Route path={"/home"} component={Home} />
      <Route path={"/country/:id"} component={CountryDetail} />
      <Route path={"/activity"} component={CreateActivity} />
    </React.Fragment>
  );
}

export default App;
