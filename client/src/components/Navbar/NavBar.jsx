import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  setActivityFilter,
  setAlphabetOrder,
  setContinentFilter,
  setName,
  setPage,
} from "../../redux/actions";
import { resetSelect } from "../../functions/functions";
import c from "./NavBar.module.css";

export default function Navbar() {
  const dispatch = useDispatch();

  function reset() {
    resetSelect();
    dispatch(setName(""));
    dispatch(setAlphabetOrder(""));
    dispatch(setActivityFilter(""));
    dispatch(setContinentFilter(""));
    dispatch(setPage(1));
  }
  return (
    <nav className={c.container}>
      <Link to="/activity">
        <p className={c.activity}>Create Activity</p>
      </Link>
      <Link to="/home" onClick={reset}>
        <h1 className={c.title}>CountriesApp</h1>
      </Link>
      <div className={c.profile}>
        <a
          href="https://github.com/cristian18u"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className={c.image}
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt=""
          />
        </a>
        <a
          href="https://www.linkedin.com/in/cristian-vanegas"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className={c.image}
            src="https://cdn-icons-png.flaticon.com/512/61/61109.png"
            alt=""
          />
        </a>
      </div>
    </nav>
  );
}
