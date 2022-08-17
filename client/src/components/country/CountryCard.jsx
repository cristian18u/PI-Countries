import React from "react";
import { Link } from "react-router-dom";
import c from "./CountryCard.module.css";

export default function CountryCard({ name, flag, continent, id }) {
  return (
    <div className={c.container}>
      <div className={c.information}>
        <h3>{name}</h3>
        <img className={c.image} src={flag} alt="bandera" />
        <p>{continent}</p>
      </div>
      <Link to={`/country/${id}`}>
        <p className={c.detail}>Detail</p>
      </Link>
    </div>
  );
}
