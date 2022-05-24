import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllCountries } from "../redux/actions.js";

export default function Nav() {
  const dispatch = useDispatch();

  return (
    <nav>
      <ul>
        <li>
          <Link to="/home" onClick={() => dispatch(getAllCountries())}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/activity">Create Activity</Link>
        </li>
      </ul>
    </nav>
  );
}
