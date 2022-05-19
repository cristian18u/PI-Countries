import React from "react";
import { Link } from "react-router-dom";

export default function CountryCard({ name, flag, continent, ID }) {
  return (
    <div>
      <Link to={`/country/${ID}`}>
        <h2>{name}</h2>
      </Link>
      <img width={300} src={flag} alt="bandera" />
      <h3>continent: {continent}</h3>
    </div>
  );
}