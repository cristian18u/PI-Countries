import React from "react";
// import img from "../../countriesPage.jpg"
import "./LandingPage.css";
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { getAllCountries } from "../../redux/actions.js";

export default function LandingPage() {
  // const dispatch = useDispatch();

  return (
    <div className="landingPage">
      <div className="landingPageTitle">
        <h3>Welcome to:</h3>
        {/*<h3>Countries</h3>*/}
      </div>
      <Link
        to="/home"
        // onClick={() => dispatch(getAllCountries())}
      >
        Countries
      </Link>
    </div>
  );
}
